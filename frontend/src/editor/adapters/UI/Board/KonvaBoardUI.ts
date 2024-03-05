import Konva from "konva"
import { EventBehaviour } from "../../../../shared/EventBehaviour"
import { BoardUIData, BoardUIEvents, IBoardUI } from "../../../ports/UI/IBoardUI"
import { PuzzleObject, PuzzleSettings } from "../../../../shared/puzzle-lib/core/PuzzleTypes"

export type KonvaData = {
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

export class KonvaBoardUI implements IBoardUI{
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
					stroke: undefined,
				});
				this._konvaData.backgroundLayer.add(box);
			}
		}
	}

	async render(puzzleSettings: PuzzleSettings, objects: PuzzleObject[]) {
		if(puzzleSettings.sideWidth != this._konvaData.boardSideSize){

			this._konvaData = this._initKonva(this._konvaData.width, this._konvaData.height, puzzleSettings.sideWidth)
			this._drawBackground()
		}
		
		this._clearLayer()

		let sortedObjects = objects.sort((a, b) => {
			return a.settings.layer - b.settings.layer
		})
		
		await sortedObjects.forEach(async object => {
			const objInst = await this._createInstance(object)
			this._addObjectToLayer(objInst, object)
			this._setDragBehaviour(objInst, object)
		})
	}

	async animate(puzzleSettings: PuzzleSettings, objects: PuzzleObject[], instructions: GameInstruction[]){
		await this.render(puzzleSettings, objects)
		return new Promise<unknown>((resolve, reject) => {
			let finnished = 0
			
			const animations = instructions.map(i => {
				return this._prepareAnimation(i, () => {
					finnished++
					test()
				})
			})
			const valid = animations.filter(a => a != null)
			valid.forEach(t => t?.play())

			const test = () => {
				if(finnished == valid.length) resolve("konec")
			}
		})
	}

	private _prepareAnimation(instruction: GameInstruction, onFinish: () => void){
		const obj = this._konvaData.objects.find(o => o.puzzleObject.id == instruction.objectId)
		if(!obj) return null
		if(instruction.name == "goforward"){
			return this._createMoveAnimation(obj, onFinish, 1)
		}
		else if(instruction.name == "jump"){
			return this._createMoveAnimation(obj, onFinish, 2)
		}
		else if(instruction.name == "turn"){
			const side = (instruction as {side:"right"|"left"}).side
			const rotation = obj.konvaObject.rotation()
			const reversed = side == "left"? -1:1
			const tween = new Konva.Tween({
				node: obj.konvaObject,
				duration: 1,
				easing: Konva.Easings.EaseInOut,
				rotation: rotation + 90 *reversed,
				onFinish: onFinish
			})
			return tween
		}
		else if(instruction.name == "wait"){
			const roundAmount = instruction.roundAmount as number
			
			const tweenMock = {
				play: () => {
					setTimeout(() => {
						onFinish()
					}, 1000) // Timeout nahradit rychlostí přehrávání
				}
			}
			return tweenMock
		}
		
	}

	private _createMoveAnimation(object: {konvaObject: any, puzzleObject: PuzzleObject}, onFinish: () => void, squareAmount: number){
		const direction = object.puzzleObject.settings.direction
		const yaxis = direction == "up" || direction == "down"?1:0
		const xaxis = 1 - yaxis
		const sx = object.konvaObject.x()
		const sy = object.konvaObject.y()
		const reversed = direction == "left" || direction == "up"? -1:1
		const distance = (this._konvaData.squareWidth + this._konvaData.spaceWidth) * squareAmount
		const tween = new Konva.Tween({
			node: object.konvaObject,
			duration: 1,
			easing: Konva.Easings.EaseInOut,
			x: sx + distance * xaxis * reversed,
			y: sy + distance * yaxis * reversed,
			onFinish: onFinish
		})
		return tween
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