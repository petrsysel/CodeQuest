import { Signal } from "easybox"
import { GameInstruction, Instruction } from "../GameInstructions/GameInstructions"
import { ObjectController, ObjectResponse } from "./ObjectController"
import { SingleSignal } from "./SingleSignal"

export type SynchronizerEvent = 'resolved'
export type SynchronizerData = {
	gameEnd: "win" | "gameover" | "cycled" | "syntaxerror" | "notfinnished",
	message: string,
	resolvedGame: GameInstruction[][]
}
export class Synchronizer{
	private controllers: ObjectController[]
	private responses: ObjectResponse[]
	private rounds: GameInstruction[][]
	private signal: Signal<SynchronizerEvent, SynchronizerData>
	private internalSignal: SingleSignal<"end-request", null>
	private running: boolean = true

	constructor(...controllers: ObjectController[]){
		this.controllers = controllers
		this.responses = []
		this.rounds = []
		this.signal = new Signal()
		this.internalSignal = new SingleSignal()
	}
	next(callings?: string[]){
		if(this.rounds.length > 100){
			this.signal.emit('resolved', {
				gameEnd: "cycled",
				message: "Nejspíš došlo k zacyklení. Chceš úlohu přesto spustit?",
				resolvedGame: this.getRounds()
			})
			
			console.log("Cycled!")
			return
		}
		if(!this.running){
			return
		}
		this.internalSignal.on('end-request', () => {
			this.running = false
		})
		this.controllers.forEach(async c => {
			
			let response: ObjectResponse
			try{
				response = await c.next(callings)
			}
			catch(e){
				response = {
					eventCalls:[],
					instructions:[],
					state: "hybernation",
				}

				this.internalSignal.emit('end-request', null)
				this.signal.emit('resolved', {
					gameEnd: "syntaxerror",
					message: "V kódu je asi nějaká chyba.",
					resolvedGame: this.getRounds()
				})
			}
			
			this.responses.push(response)
			
			const isHybernating = this.responses.filter(r => r.state === 'hybernation')
			// Co to...? controlers -> this.controlers
			if(this.responses.length === this.controllers.length){
				const callingAcumulator = this.responses.reduce(
					((p, c) => [...p, ...c.eventCalls]),new Array<string>()
				)
				const responsesBackup = [...this.responses]
				this.responses = []
				// Toto musí být podmíněné i tím, zda jsou volány nějaké eventy
				if(isHybernating.length != responsesBackup.length || callingAcumulator.length !== 0){
					const round = responsesBackup.map(r => r.instructions).reduce((p, a) => {
						return [...p, ...a]
					},[])
					this.rounds.push([...round])
					console.log("STARTING NEW ROUND")
					this.checkEndGame(responsesBackup)
					this.next(callingAcumulator)
				}
				else if(isHybernating.length == responsesBackup.length && callingAcumulator.length === 0){
					const round = responsesBackup.map(r => r.instructions).reduce((p, a) => {
						return [...p, ...a]
					},[])
					this.rounds.push([...round])
					if(!this.checkEndGame(responsesBackup)){
						this.rounds.push([Instruction.gameOver(c.mainThread.object.id,"Úlohu se nepodařilo vyřešit. To ale nevadí! Zkus to znovu!")])
						this.signal.emit('resolved', {
							gameEnd: "notfinnished",
							message: "Úlohu se nepodařilo vyřešit. To ale nevadí! Zkus to znovu!",
							resolvedGame: this.getRounds()
						})
					}
				}
			}
		})
	}
	private checkEndGame(responses: ObjectResponse[]){
		const winInstruction = responses.find(r => r.instructions.find(i => i.name === "win"))
		const gameOverInstruction = responses.find(r => r.instructions.find(i => i.name === "gameover"))
			
		let endgame = true
		if(winInstruction){
			this.internalSignal.emit('end-request', null)
			this.signal.emit('resolved', {
				gameEnd: "win",
				message: "Vítěztví!",
				resolvedGame: this.getRounds()
			})
		}
		else if(gameOverInstruction){
			this.internalSignal.emit('end-request', null)
			this.signal.emit('resolved', {
				gameEnd: "gameover",
				message: "To nevadí. Zkus to znova!",
				resolvedGame: this.getRounds()
			})
		}
		else{
			endgame = false
		}
		return endgame
	}
	getRounds(){
		const rounds = [...this.rounds]
		return rounds
	}
	on(event: SynchronizerEvent, callback: (data: SynchronizerData) => void){
		this.signal.on(event, callback)
	}
}