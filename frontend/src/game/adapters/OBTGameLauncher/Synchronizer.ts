import { Signal } from "easybox"
import { GameInstruction } from "../GameInstructions/GameInstructions"
import { ObjectController, ObjectResponse } from "./ObjectController"

export type SynchronizerEvent = 'resolved'
export type SynchronizerData = {
	resolvedGame: GameInstruction[][]
}
export class Synchronizer{
	private controllers: ObjectController[]
	private responses: ObjectResponse[]
	private rounds: GameInstruction[][]
	private signal: Signal<SynchronizerEvent, SynchronizerData>

	constructor(...controllers: ObjectController[]){
		this.controllers = controllers
		this.responses = []
		this.rounds = []
		this.signal = new Signal()
	}
	next(callings?: string[]){
		if(this.rounds.length > 100){
			this.signal.emit('resolved', {
				resolvedGame: this.getRounds()
			})
			console.log("Cycled!")
			return
		}
		this.controllers.forEach(async c => {
			const response = await c.next(callings)
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
					this.next(callingAcumulator)
				}
				else if(isHybernating.length == responsesBackup.length && callingAcumulator.length === 0){
					const round = responsesBackup.map(r => r.instructions).reduce((p, a) => {
						return [...p, ...a]
					},[])
					this.rounds.push([...round])

					this.signal.emit('resolved', {
						resolvedGame: this.getRounds()
					})
				}
			}
		})
	}
	getRounds(){
		return this.rounds
	}
	on(event: SynchronizerEvent, callback: (data: SynchronizerData) => void){
		this.signal.on(event, callback)
	}
}