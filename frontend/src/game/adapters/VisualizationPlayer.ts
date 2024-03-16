import { IBoardUI } from "../../editor/ports/UI/IBoardUI"
import { EventBehaviour } from "../../shared/EventBehaviour"
import { INotificationUI } from "../../shared/notification/ports/INotificationUI"
import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { IVisualizationPlayer, VisualizerData, VisualizerEvent } from "../ports/IVisualizationPlayer"
import { GameInstruction, Instruction } from "./GameInstructions/GameInstructions"

export class VisualizationPlayer implements IVisualizationPlayer{
	private _boardUI: IBoardUI
	private _isPlaying: boolean
	private _notificationUI: INotificationUI
	private _eventBehaviour: EventBehaviour<VisualizerEvent, VisualizerData>

	constructor(boardUI: IBoardUI, notificationUI: INotificationUI){
		this._boardUI = boardUI
		this._notificationUI = notificationUI
		this._isPlaying = false
		this._eventBehaviour = new EventBehaviour()
	}

	async play(resolvedGame: GameInstruction[][], puzzle: Puzzle){
		this._isPlaying = true
		for(const round of resolvedGame){
			//Provést okamžité akce
			if(!this._isPlaying) {
				this._emit("stoped", null)
				break
			}
			Instruction.instant(round).forEach(i =>{
				Instruction.performOnPuzzle(i, puzzle)
			})
			await Instruction.withNotification(round, this._notificationUI)
			await this._boardUI.animate(puzzle.getSettings(),puzzle.getObjectList(),round)
			// Provést akce které potřebují čas
			Instruction.takeTime(round).forEach(i =>{
				Instruction.performOnPuzzle(i, puzzle)
			})
		}
	}

	stop(): void {
		this._isPlaying = false
	}

	isPlaying(): boolean {
		return this._isPlaying
	}

	on(event: VisualizerEvent, callback: (data: VisualizerData) => void): void {
		this._eventBehaviour.on(event, callback)
	}

	private _emit(event: VisualizerEvent, data: VisualizerData){
		this._eventBehaviour.emit(event, data)
	}
}