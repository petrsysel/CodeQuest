type KonvaData = {
	stage: any,
	backgroundLayer: any,
	objectLayer: any,
	objects: {
		konvaObject: any,
		puzzleObject: PuzzleObject
	}[]
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

	private _options: BoardOptions

	constructor(destination: string, options: BoardOptions){
		this._eventBehaviour = new EventBehaviour()

		this._destination = destination
		this._options = options

		this._loadedCostumes = []
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
			startY: startY,
			objects: []
		}
		konvaData.stage.add(konvaData.backgroundLayer)
		konvaData.stage.add(konvaData.objectLayer)
		return konvaData
	}

	private _drawBackground(){
		let space = this._konvaData.spaceWidth
		let fieldSize = this._konvaData.squareWidth
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

	render(puzzleSettings: PuzzleSettings, objects: PuzzleObject[]) {
		if(puzzleSettings.sideWidth != this._konvaData.boardSideSize){

			this._konvaData = this._initKonva(this._konvaData.width, this._konvaData.height, puzzleSettings.sideWidth)
			this._drawBackground()
		}
		
		this._clearLayer()

		let sortedObjects = objects.sort((a, b) => {
			return a.settings.layer - b.settings.layer
		})
		
		sortedObjects.forEach(async object => {
			const objInst = await this._createInstance(object)
			this._addObjectToLayer(objInst, object)
			this._setDragBehaviour(objInst, object)
		})
	}

	private _clearLayer(){
		this._konvaData.objectLayer.removeChildren()
		this._konvaData.objects = []
	}
	private _addObjectToLayer(konvaObject:any, puzzleObject: PuzzleObject){
		const contain = this._konvaData.objects.some(o => o.puzzleObject.id == puzzleObject.id)
		if(!contain){
			this._konvaData.objectLayer.add(this._setImage(konvaObject, puzzleObject))
			this._konvaData.objects = [...this._konvaData.objects, {
				puzzleObject: puzzleObject,
				konvaObject: konvaObject
			}]
		}
	}

	private _setImage(image: any, object: PuzzleObject){
		console.log("setting image")
		const startX = this._konvaData.startX
		const startY = this._konvaData.startY
		const squareWidth = this._konvaData.squareWidth
		const space = this._konvaData.spaceWidth
		image.setAttrs({
			x: startX + (object.settings.X * (squareWidth + space)),
			y: startY + (object.settings.Y * (squareWidth + space)),
			width: squareWidth,
			height: squareWidth,
			offset:{
				x:squareWidth/2,
				y:squareWidth/2
			},
			draggable:this._options.draggable,
			rotation: this._getAngle(object),
			shadowColor: 'blue',
			shadowBlur: 10,
			shadowOffset: { x: 0, y: 0 },
			shadowOpacity: object.id == this._selectedObject?1:0,
			visible: object.settings.visible
		})
		return image
	}

	private _getAngle(object: PuzzleObject){
		let angle = 0
		if(object.settings.direction == "up") angle = 180
		else if(object.settings.direction == "right") angle = -90
		else if(object.settings.direction == "down") angle = 0
		else angle = 90
		return angle
	}

	private _createInstance(object: PuzzleObject){
		const path = object.settings.costume.path
		return new Promise<any>((resolve, reject) => {
			if(!this._loadedCostumes.some(c => c.path == path)){
				Konva.Image.fromURL(path, (image:any) => {
					const newImg = {path:path,image: image}
					this._loadedCostumes.push(newImg)
					resolve(newImg.image)
				})
			}
			else{
				let image = this._loadedCostumes.find(c => c.path == path)?.image
				resolve(image.clone())
			}
		})
	}

	private _setDragBehaviour(konvaObject: any, puzzleObject: PuzzleObject){
		konvaObject.on('mouseup touchend dragend', () => {
			const offsetX = this._konvaData.startX
			const offsetY = this._konvaData.startY
			const squareW = this._konvaData.squareWidth
			const spaceW = this._konvaData.spaceWidth
			const x = Math.round((konvaObject.x() - offsetX)/(squareW+spaceW))
			const y = Math.round((konvaObject.y() - offsetY)/(squareW+spaceW))
			
			if(this._options.draggable) this._emit("object-moved", {objectId:puzzleObject.id,x:x, y:y})

			if(this._options.selectable == 'player'){
				if(puzzleObject.settings.playerEdit) this._emit('object-selected', {
					x: x,
					y: y,
					objectId: puzzleObject.id
				})
			}
		})
	}
}