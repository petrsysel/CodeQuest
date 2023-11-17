class GameLauncher{
	private _timeout: number
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
		
		worker.onmessage = message => {
			console.log(message.data)
		}

		setTimeout(() => {
			worker.postMessage({
				command: 'get'
			})
			setTimeout(() => {
				worker.terminate()
				console.log("Worker has been terminated")
			}, 100)
			
		}, this._timeout)
	}
}