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
	boardSideSize: number,
	startX: number,
	startY: number
}

class KonvaBoardUI implements IBoardUI{
	_eventBehaviour: EventBehaviour<BoardUIEvents, BoardUIData>

	private _konvaContainer: HTMLElement
	private _konvaData: KonvaData
	private _selectedObject: string

	private _loadedCostumes: {path: string, image:any}[]

	private _destination: string

	constructor(destination: string){
		this._eventBehaviour = new EventBehaviour()

		this._destination = destination

		this._loadedCostumes = []
		console.log(destination)
		this._konvaContainer = document.getElementById(destination) as HTMLElement

		this._konvaData = this._initKonva(this._konvaContainer.offsetWidth,this._konvaContainer.offsetHeight, 5)
		this._selectedObject = ""
		this._drawBackground()
	}

	on(event: BoardUIEvents, callback: (data: BoardUIData) => void): void {
		this._eventBehaviour.on(event, callback)
	}

	private _emit(event: BoardUIEvents, data: BoardUIData){
		this._eventBehaviour.emit(event, data)
	}

	setSelected(objectId: string): void {
		this._selectedObject = objectId
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

		let startX = leftOffset + fieldSize/2
		let startY = topOffset + fieldSize/2

		let stage = new Konva.Stage({
			container: this._destination,
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
			boardSideSize: sideWidth,
			startX: startX,
			startY: startY
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
		layer.removeChildren()

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

			let path = object.settings.costume.path

			if(!this._loadedCostumes.some(c => c.path == path)){
				Konva.Image.fromURL(path, function (image:any) {
					that._loadedCostumes.push({path:path,image: image})
					createInstance()
				})
			}
			else{
				createInstance()
			}
			

			function createInstance(){
				let image = that._loadedCostumes.find(c => c.path == path)?.image
				let newobject = image.clone()
				setImage(newobject)
				newobject.on('mouseup touchend dragend', function () {
					let offsetX = that._konvaData.startX
					let offsetY = that._konvaData.startY
					let squareW = that._konvaData.squareWidth
					let spaceW = that._konvaData.spaceWidth
					let x = Math.round((newobject.x() - offsetX)/(squareW+spaceW))
					let y = Math.round((newobject.y() - offsetY)/(squareW+spaceW))
					
					that._emit("object-moved", {objectId:object.id,x:x, y:y})
				})
			}

			function setImage(image: any){
				image.setAttrs({
					x: startX + (object.settings.X * (squareWidth + space)),
					y: startY + (object.settings.Y * (squareWidth + space)),
					width: squareWidth,
					height: squareWidth,
					offset:{
						x:squareWidth/2,
						y:squareWidth/2
					},
					draggable:true,
					rotation:angle,
				//   cornerRadius: 20,
				  	shadowColor: 'blue',
					shadowBlur: 10,
					shadowOffset: { x: 0, y: 0 },
					shadowOpacity: object.id == that._selectedObject?1:0,
				})
				layer.add(image);

				
			}
		})
	}
}