importScripts('../libraries/code-quest.bundle.js')
let rslv = null
onmessage = e => {
	let data = e.data
	if(data.command == 'start'){
		let p = new Puzzle()
		p.loadFromString(data.content)

		let actors = PuzzleUtils.destringifyActors(data.actors)
		
		let resolver = new GameResolver(p, actors, () => {
			postMessage({
				status: 'inprogress',
				data: rslv.getRounds()
			})
		})
		rslv = resolver
	}

	if(data.command == 'get'){
		postMessage({
			status: 'result',
			data: rslv.getRounds()
		})
	}
}