importScripts('../dist/code-quest.bundle.js')
let rslv = null
onmessage = e => {
	let data = e.data
	if(data.command == 'start'){
		let p = new Puzzle()
		p.loadFromString(data.content)

		let actors = PuzzleUtils.destringifyActors(data.actors)
		
		let resolver = new GameResolver(p, actors)
		rslv = resolver
	}

	if(data.command == 'get'){
		console.log(rslv.getRounds())
		postMessage({
			status: 'result',
			data: rslv.getRounds()
		})
	}
}