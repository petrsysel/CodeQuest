type KonvaData = {
	stage: any,
	backgroundLayer: any,
	objectLayer: any,
	width: number,
	height: number,
	shorterSide: number,
	squareWidth: number,
	spaceWidth: number,
	innerBoardWidth:number,
	leftOffset: number,
	topOffset: number,
	boardSideSize: number
}

class KonvaBoardUI implements IBoardUI{
	_eventBehaviour: EventBehaviour<BoardUIEvents, BoardUIData>

	private _konvaContainer: HTMLElement
	private _konvaData: KonvaData

	constructor(){
		this._eventBehaviour = new EventBehaviour()

		this._konvaContainer = document.getElementById('board-container') as HTMLElement

		this._konvaData = this._initKonva(this._konvaContainer.offsetWidth,this._konvaContainer.offsetHeight, 5)
		this._drawBackground()
	}

	on(event: BoardUIEvents, callback: (data: BoardUIData) => void): void {
		this._eventBehaviour.on(event, callback)
	}

	private _emit(event: BoardUIEvents, data: BoardUIData){
		this._eventBehaviour.emit(event, data)
	}

	setSelected(objectId: string): void {
		
	}

	private _initKonva(w:number, h:number, size:number){
		let width = w
      	let height = h

		// Vypadá to, že bude potřeba přijímat celý puzzle
		let sideWidth = size
		let shorterSide = width - height < 0 ? width : height
		let space = shorterSide/(size*8)
		let spacesWidth = space*sideWidth
		let fieldSize = (shorterSide - spacesWidth)/sideWidth
		let fieldsWidth = (fieldSize*sideWidth) + spacesWidth - space

		let leftOffset = (width-fieldsWidth)/2
		let topOffset = (height-fieldsWidth)/2

		let stage = new Konva.Stage({
			container: 'board-container',
			width: width,
			height: height,
		})

		let konvaData: KonvaData = {
			stage: stage,
			backgroundLayer: new Konva.Layer(),
			objectLayer: new Konva.Layer(),
			width: width,
			height: height,
			innerBoardWidth:fieldsWidth,
			shorterSide: shorterSide,
			spaceWidth:space,
			squareWidth: fieldSize,
			leftOffset:leftOffset,
			topOffset:topOffset,
			boardSideSize: sideWidth
		}
		konvaData.stage.add(konvaData.backgroundLayer)
		konvaData.stage.add(konvaData.objectLayer)
		return konvaData
	}

	private _drawBackground(){
		let width = this._konvaData.width
		let height = this._konvaData.height

		let shorterSide = this._konvaData.shorterSide
		let space = this._konvaData.spaceWidth
		let fieldSize = this._konvaData.squareWidth
		let fieldsWidth = this._konvaData.innerBoardWidth

		let leftOffset = this._konvaData.leftOffset
		let topOffset = this._konvaData.topOffset
		let sideWidth = this._konvaData.boardSideSize

		for(let i = 0; i < sideWidth; i++){
			for(let j = 0; j < sideWidth; j++){
				var box = new Konva.Rect({
					x: i * (fieldSize+space) + leftOffset,
					y: j * (fieldSize+space) + topOffset,
					width: fieldSize,
					height: fieldSize,
					fill: '#FFFFFF66',
					cornerRadius: 25,
					stroke: null,
				});
				
				// let b = box
				// box.on('mouseover', function () {
				// 	b.fill('#000000')
				// 	console.log("overrr")
				// 	document.body.style.cursor = "pointer"
				// });
				// box.on('mouseout', function () {
				// 	document.body.style.cursor = 'default';
				// });
				this._konvaData.backgroundLayer.add(box);
			}
		}
	}

	render(puzzleSettings: PuzzleSettings, objects: PuzzleObject[]): void {
		if(puzzleSettings.sideWidth != this._konvaData.boardSideSize){

			this._konvaData = this._initKonva(this._konvaData.width, this._konvaData.height, puzzleSettings.sideWidth)
			this._drawBackground()
		}

		let squareWidth = this._konvaData.squareWidth
		let space = this._konvaData.spaceWidth

		let startX = this._konvaData.leftOffset + squareWidth/2
		let startY = this._konvaData.topOffset + squareWidth/2

		let layer = this._konvaData.objectLayer
		layer.destroyChildren()

		let sortedObjects = objects.sort((a, b) => {
			return a.settings.layer - b.settings.layer
		})
		
		let that = this
		sortedObjects.forEach(object => {
			let angle = 0
			if(object.settings.direction == "up") angle = 180
			else if(object.settings.direction == "right") angle = -90
			else if(object.settings.direction == "down") angle = 0
			else angle = 90

			Konva.Image.fromURL(object.settings.costume.path, function (darthNode:any) {
				darthNode.setAttrs({
					x: startX + (object.settings.X * (squareWidth + space)),
					y: startY + (object.settings.Y * (squareWidth + space)),
					width: squareWidth,
					height: squareWidth,
					offset:{
						x:squareWidth/2,
						y:squareWidth/2
					},
					draggable:true,
					rotation:angle
				//   cornerRadius: 20,
				//   	shadowColor: 'red',
				// 	shadowBlur: 10,
				// 	shadowOffset: { x: 0, y: 0 },
				// 	shadowOpacity: 0.5,
				})
				layer.add(darthNode);

				darthNode.on('mouseup touchend dragend', function () {
					let x = Math.round((darthNode.x() - startX)/(squareWidth+space))
					let y = Math.round((darthNode.y() - startY)/(squareWidth+space))
					
					that._emit("object-moved", {objectId:object.id,x:x, y:y})
				})
			})
		})
	}
}