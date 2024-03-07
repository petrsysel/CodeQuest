import { EventBehaviour } from "../../shared/EventBehaviour"
import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { PuzzleUtils } from "../../shared/puzzle-lib/core/PuzzleUtils"
import { IGameLauncher, LaucherData, LauncherEvent } from "../ports/IGameLauncher"

export class GameLauncher implements IGameLauncher{
	private _timeout: number
	private _eventBehaviour = new EventBehaviour<LauncherEvent, LaucherData>()

	constructor(timeout: number){
		this._timeout = timeout
	}

	play(puzzle: Puzzle){
		let worker = new Worker('worker.js')
		let stringifyActors = PuzzleUtils.stringifyActors(
			PuzzleUtils.createActors(puzzle)
		)
		let destr = PuzzleUtils.destringifyActors(stringifyActors)
		console.log(destr)
		worker.postMessage({
			command: 'start',
			content: puzzle.stringify(),
			actors: stringifyActors
		})

		let lastState: GameInstruction[][] = []
		
		worker.onmessage = message => {
			const data = message.data.data as GameInstruction[][]
			
			lastState = data
		}

		setTimeout(() => {
			this._emit("done", lastState)
			worker.terminate()
			console.log("Worker has been terminated")
			
		}, this._timeout)
	}

	_emit(event: LauncherEvent, data: LaucherData){
		this._eventBehaviour.emit(event, data)
	}

	on(event: LauncherEvent, callback: (data: LaucherData) => void){
		this._eventBehaviour.on(event, callback)
	}
}