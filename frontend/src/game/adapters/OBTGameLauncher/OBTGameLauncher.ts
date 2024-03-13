import { javascriptGenerator } from "blockly/javascript";
import { BlocklyWorkspaceGenerator } from "../../../editor/adapters/UI/Blockly/BlocklyWorkspaceGenerator";
import { Puzzle } from "../../../shared/puzzle-lib/core/Puzzle";
import { IGameLauncher, LaucherData, LauncherEvent } from "../../ports/IGameLauncher";

import Blockly from 'blockly'
import * as esprima from 'esprima'
import greenlet from "greenlet";
import * as Comlink from 'comlink'
import { BlocklyEditor } from "../../../editor/adapters/UI/Blockly/BlocklyEditor";
import { DomHelper, Signal } from "easybox";
import { PuzzleObject } from "../../../shared/puzzle-lib/core/PuzzleTypes";
import { object } from "blockly/core/utils";

export class OBTGameLauncher implements IGameLauncher{
	private signal: Signal<LauncherEvent, LaucherData>
	private workspaceGenerator: BlocklyWorkspaceGenerator
	private workspace: any

	constructor(workspaceGenerator: BlocklyWorkspaceGenerator){
		this.signal = new Signal()
		this.workspaceGenerator = workspaceGenerator
		this.workspace = workspaceGenerator.createWorkspace(null)
	}
	
	on(event: LauncherEvent, callback: (data: LaucherData) => void): void {
		this.signal.on(event, callback)
	}
	async play(puzzle: Puzzle) {
		
		class SingleSignal<E, P>{
			signals: Map<E, (data: P) => void>

			constructor(){
				this.signals = new Map()
			}

			emit(event: E, data: P){
				const clb = this.signals.get(event)
				if(clb) clb(data)
			}

			on(event: E, callback: (data: P) => void){
				this.signals.set(event, callback)
			}
		}

		type ActionType = "instant" | "delayed"
		type ActionEvent = 'hybernation' | 'ready' | 'event-call'

		abstract class Action<T>{
			private hybernation: boolean = false
			private signal: Signal<ActionEvent, null>

			constructor(){
				this.signal = new Signal()
			}

			protected exitHybernation(){
				this.hybernation = false
			}

			protected hybernate(){
				this.hybernation = true
				this.emit('hybernation')
			}
			isHybernating(){
				return this.hybernation
			}
			execute(stepper: Stepper, object: PuzzleObject): Promise<T>{
				return new Promise((resolve, reject) => {
					reject("Action not yet implemented.")
				})
			}
			on(event: ActionEvent, callback: () => void){
				this.signal.on(event, callback)
			}
			emit(event: ActionEvent){
				this.signal.emit(event, null)
			}
			wakeup(){
				throw new Error('Wakeup method not implemented.')
			}
			// TOHLE VŠECHNO JE ŠPATNĚ
			// metoda next() (nebo klidně ta execute) která bude vracet zda byla akce dokončena, nebo se stále provádí (respektive některý z jejich potomků ještě nebyl dokončen)
			// next(): Promise<ActionResult<T>>
			// metoda prepare() ketrá nebude měnit žádný stav, jen akce vyhodnotí a vrátí pole ve kterém bude pořadí akcí, které byly vykonány a budou vykonány při spuštění funce next() (nebo execute()). To znamená že na základě zmapovaného předpokládaného průchodu bude možné spustit v jiných objektech například funkce reagující na volání události
			
		}
		type ActionList<T> = Action<T>[]

		class Stepper{
			// private signal: Signal<'step' | 'setted', null>
			private listeners: Map<string, (eventName?: string) => void>
			constructor(){
				// this.signal = new Signal()
				this.listeners = new Map()
			}
			on(event: 'step' | 'setted' | 'event-call', callback: (eventName?: string) => void){
				this.listeners.set(event, callback)
			}
			emit(eventName: string){
				const callback = this.listeners.get('event-call')
				if(callback) callback(eventName)
			}
			next(){
				const callback = this.listeners.get('step')
				if(callback) callback()
			}
			set(){
				const callback = this.listeners.get('setted')
				if(callback) callback()
			}
		}

		class GoAction extends Action<void>{
			constructor(){
				super()

			}
			execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
				return new Promise((resolve, reject) => {
					stepper.on('step', () => {
						console.log(`${object.settings.name} is going!`)
						resolve()
						this.hybernate()
					})
					stepper.set()
				})
			}
			wakeup(): void {
				this.exitHybernation()
			}
		}
		class ForAction extends Action<void>{
			private predicate: Action<boolean | number>
			private body: ActionList<any>

			constructor(predicate: Action<boolean|number>, body: ActionList<any>){
				super()
				this.predicate = predicate
				this.body = body
			}
			async execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
				let predicateValue = await this.predicate.execute(stepper, object)
				if(typeof predicateValue === 'boolean'){
					while(predicateValue = await this.predicate.execute(stepper, object)){
						// await Promise.all(this.body.map(a => a.execute()))
						await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object)), Promise.resolve())
						this.hybernate()
					}
					
				}
				else{
					for (let i = 0; i < predicateValue; i++) {
						// await Promise.all(this.body.map(a => a.execute()))
						await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object)), Promise.resolve())
						this.hybernate()
					}
				}
			}
			wakeup(): void {
				this.body.forEach(a => a.wakeup())
				this.exitHybernation()
			}
		}

		class NumberAction extends Action<number>{
			private num: number
			constructor(num: number){
				super()
				this.num = num
			}
			execute(stepper: Stepper, object: PuzzleObject): Promise<number> {
				return new Promise((resolve, reject) => {
					resolve(this.num)
					this.hybernate()
				})
			}
			wakeup(): void {
				this.exitHybernation()
			}
		}
		class WaitAction extends Action<void>{
			type: "instant" | "delayed";
			private delay: Action<number>
			private countdown: number | undefined

			constructor(delay: Action<number>){
				super()
				this.type = 'delayed'
				this.delay = delay
			}
			execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
				return new Promise((resolve, reject) => {
					stepper.on('step', () => {
						setTimeout(() => {
							resolve()
							this.hybernate()
						}, 200)
					})
					stepper.set()
				})
			}

			wakeup(): void {
				this.delay.wakeup()
				this.exitHybernation()
			}
		}
		class ActionContainer extends Action<void>{
			type: "instant" | "delayed";
			private body: Action<any>[]
			constructor(...body:Action<any>[]){
				super()
				this.type = 'instant'
				this.body = body
			}

			async execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
				await this.body.reduce((p, a) => 
					p.then(() => {
						return a.execute(stepper, object)
					}
				), Promise.resolve())
				this.hybernate()
			}

			wakeup(): void {
				this.body.forEach(a => a.wakeup())
				this.exitHybernation()
			}
		}

		class TextAction extends Action<string>{
			private text: string
			constructor(text: string){
				super()
				this.text = text
			}
			execute(stepper: Stepper, object: PuzzleObject): Promise<string> {
				return new Promise((resolve, reject) => {
					resolve(this.text)
					this.hybernate()
				})
			}
			wakeup(): void {
				this.exitHybernation()
			}
		}

		class EmitAction extends Action<void>{
			text: Action<string>

			constructor(text: Action<string>){
				super()
				this.text = text
			}

			async execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
				const eventName = await this.text.execute(stepper, object)
				return new Promise((resolve, reject) => {
					console.log("Event " + eventName + " were been emitted!")
					stepper.emit(eventName)
					resolve()
				})
			}
			wakeup(): void {
				this.text.wakeup()
				this.exitHybernation()
			}
		}

		class OnEventAction extends Action<void>{
			eventName: Action<string>
			body: ActionContainer

			public get actionBody(){
				return this.body
			}

			constructor(text: Action<string>, ...body: Action<any>[]){
				super()
				this.eventName = text
				this.body = new ActionContainer(...body)
			}

			async execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
				const eventName = await this.eventName.execute(stepper, object)
				return new Promise(async (resolve, reject) => {
					await this.body.execute(stepper, object)
					resolve()
					this.hybernate()
				})
			}
			wakeup(): void {
				this.eventName.wakeup()
				this.body.wakeup()
				this.exitHybernation()
			}
		}

		class Synchronizer{
			private total: number
			private hybernating: ObjectController[] = []
			private responseCounter = 0
			private controllers: ObjectController[]

			constructor(...controllers: ObjectController[]){
				this.total = controllers.length
				this.controllers = controllers

				controllers.forEach(c => {
					c.on('hybernation', () => {
						this.hybernating.push(c)
						
						this.checkAndNext()
					})

					c.on('ready', () => {
						this.responseCounter ++
						
						this.checkAndNext()
					})
					c.on('event-call', async  data => {
						for (let i = 0; i < controllers.length; i++) {
							const controller = controllers[i]
							const result = await controller.call(data?.eventName!)
							if(result){
								this.hybernating.splice(this.hybernating.indexOf(controller), 1)
								this.checkAndNext()
							}
						}
					})
				})

				
			}
			private checkAndNext(){
				if(this.responseCounter >= this.total - this.hybernating.length){
					this.next()
					this.responseCounter = 0
				}
				else{
				}
			}

			run(){
				this.controllers.forEach(c => c.run())
			}

			next(){
				this.controllers.forEach(c => c.next())
			}
		}

		type ThreadStackEvent = 'empty' | 'added'
		class ThreadStack{
			private threads: ThreadController[]
			private signal: Signal<ThreadStackEvent, null>

			constructor(){
				this.threads = []
				this.signal = new Signal()
			}

			on(event: ThreadStackEvent, callback: () => void){
				this.signal.on(event, callback)
			}

			add(thread: ThreadController){
				this.threads.push(thread)
				this.signal.emit('added', null)
			}
			read(): ThreadController | undefined{
				return this.threads[this.threads.length - 1]
			}
			pop(){
				this.threads.splice(this.threads.length - 1, 1)[0]
				if(this.threads.length === 0) this.signal.emit('empty', null)
			}

			clearEvents(){
				this.threads.forEach(t => {
					if(t.type === 'event') this.threads.splice(this.threads.indexOf(t),1)
				})
			}
		}

		type ThreadType = 'main' | 'event' | 'function'
		class ThreadController{
			private stepper: Stepper
			name: string|Action<string>
			body: ActionContainer
			object: PuzzleObject
			type: ThreadType

			signal: Signal<ActionEvent, null | {eventName: string}>

			constructor(type: ThreadType, name: string|Action<string>, object: PuzzleObject, body: ActionContainer){
				this.signal = new Signal()
				this.stepper = new Stepper()
				this.name = name
				this.body = body
				this.object = object
				this.type = type

				body.on('hybernation', () => {
					this.signal.emit('hybernation', null)
				})

				this.stepper.on('setted', () => {
					this.signal.emit('ready', null)
				})
				this.stepper.on('event-call', eventName => {
					this.signal.emit('event-call', {eventName: eventName!})
				})
			}

			on(event: ActionEvent, callback: (data: null | {eventName: string}) => void){
				this.signal.on(event, callback)
			}

			run(){
				if(this.type === 'main') console.log("Running main thread")
				this.body.execute(this.stepper, this.object)
			}
			next(){
				this.stepper.next()
			}
		}
		type ObjectControllerEvent = 'hybernation' | 'ready' | 'event-call'
		class ObjectController{
			mainThread: ThreadController
			eventThreads: ThreadController[]

			threadStack: ThreadStack
			private signal: Signal<ObjectControllerEvent, null | {eventName: string}>
			private object: PuzzleObject

			constructor(object: PuzzleObject, main: ActionContainer, eventHandlers: OnEventAction[]){
				this.signal = new Signal()
				this.object = object
				this.mainThread = new ThreadController('main', 'main', object, main)
				this.eventThreads = eventHandlers.map(eh => new ThreadController('event', eh.eventName, object, eh.actionBody))
				this.threadStack = new ThreadStack()

				this.threadStack.on('empty', () => {
					this.signal.emit('hybernation', null)
				})
				this.threadStack.on('added', () => {
					this.threadStack.read()?.on('hybernation', () => {
						this.threadStack.pop()
					})
					this.threadStack.read()?.on('event-call', data => {
						this.signal.emit('event-call', data)
					})
					this.threadStack.read()?.on('ready', () => {
						this.signal.emit('ready', null)
					})
				})

			}

			on(event: ObjectControllerEvent, callback: (eventName: null | {eventName: string}) => void){
				this.signal.on(event, callback)
			}

			run(){
				this.threadStack.add(this.mainThread)
				this.mainThread.run()
				console.log("Running main thread of an object " + this.object.settings.name)
			}
			async call(eventName: string): Promise<boolean>{
				return new Promise(async (resolve, reject) => {
					const thread = await this.eventThreads.find(async t => {
						if(typeof(t.name) === 'string'){
							return t.name === eventName
						}
						else{
							const stepper = new Stepper()
							return (await t.name.execute(stepper, t.object)) === eventName
						}
					})
					if(!thread) return resolve(false)
					// this.threadStack.clearEvents()
					this.threadStack.add(thread)
					resolve(true)
					thread.run()
				})
			}
			next(){
				this.threadStack.read()?.next()
			}
		}

		this.signal.emit('done', [])
		
		const controllers = puzzle.getObjectList().map(o => {
			let save = JSON.parse(o.settings.code)
      		Blockly.serialization.workspaces.load(save, this.workspace)
			let tree: Action<any>[] = []
			const code: string = javascriptGenerator.workspaceToCode(this.workspace)
			const finalCode = `tree = [${code.replace(new RegExp(',$'), '')}]`
			eval(finalCode)

			const eventHandlers = tree.filter(a => a instanceof OnEventAction) as OnEventAction[]
			const mainActions = tree.filter(a => !(a instanceof OnEventAction))
			const main = new ActionContainer(
				...mainActions
			)

			return new ObjectController(o, main, eventHandlers)
		})
		const synchronizer = new Synchronizer(...controllers)

		synchronizer.run()
	}
}