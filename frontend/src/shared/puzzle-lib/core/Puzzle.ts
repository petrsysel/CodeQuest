import { ObjectSettingsValidator } from "./ObjectSettingsValidator"
import { CostumeData, PuzzleObject, PuzzleObjectId, PuzzleObjectSettings, PuzzlePrimitive, PuzzleSettings } from "./PuzzleTypes"
import { PuzzleUtils } from "./PuzzleUtils"

export class Puzzle implements IPuzzle{
    private _primitive: PuzzlePrimitive
    
    private _objectCounter = 1

    constructor(primitive: PuzzlePrimitive | null = null){
        if(primitive) this._primitive = primitive
        else this._primitive = PuzzleUtils.createPuzzle()
    }

    addObject(): PuzzleObjectId {
        let newObject = PuzzleUtils.createObject(this._objectCounter)
        this._primitive.objects.push(
            newObject
        )
        this._objectCounter++
        // console.log(JSON.stringify(this._primitive, undefined, 4))
        return newObject.id
    }
    duplicateObject(originalId: string): PuzzleObjectId {
        let originalObject = this.getObject(originalId) as PuzzleObject

        let newObject = PuzzleUtils.duplicateObject(originalObject)
        this._primitive.objects.push(
            newObject
        )
        this._objectCounter++
        // console.log(JSON.stringify(this._primitive, undefined, 4))
        return newObject.id
    }
    removeObject(id: string): boolean {
        this._primitive.objects = this._primitive.objects.filter(_ => _.id != id)
        return false
    }
    changeObjectSettings(id: string, settings: PuzzleObjectSettings): boolean {
        this._primitive.objects.forEach(object => {
            if(object.id == id) object.settings = settings
        })
        return true
    }
    changeSettings(settings: PuzzleSettings): boolean {
        this._primitive.settings = settings
        return true
    }
    getObjectSettings(id: PuzzleObjectId): PuzzleObjectSettings | undefined{
        let objSettings = undefined
        this._primitive.objects.forEach(object => {
            if(id == object.id) objSettings = object.settings
        })
        return objSettings
    }
    getSettings(): PuzzleSettings {
        return this._primitive.settings
    }
    getObjectList(): PuzzleObject[] {
        return this._primitive.objects
    }
    getObject(id: PuzzleObjectId | undefined): PuzzleObject | undefined{
        let obj = undefined
        this._primitive.objects.forEach(object => {
            if(id == object.id) obj = object
        })
        return obj
    }

    changeObjectCostume(id: string, costume: CostumeData): boolean {
        let obj = this.getObject(id)
        if(obj) obj.settings.costume = costume
        else return false
        return true
    }
    changeObjectCode(id: string|undefined, data: string): boolean {
        let obj = this.getObject(id)
        if(obj) obj.settings.code = data
        else return false
        return true
    }
    getObjectCode(id: string|undefined): string | undefined{
        let obj = this.getObject(id)
        if(obj) return obj.settings.code
    }
    setObjectPosition(id: string | undefined, x: number, y: number): boolean {
        let obj = this.getObject(id)
        let validated = this._validatePosition(x,y)
        if(obj){
            obj.settings.X = validated.validateX
            obj.settings.Y = validated.validateY
        }
        else return false
        return true
    }

    private _validatePosition(x:number, y:number){
        let validateX = x
        let validateY = y
        if(x < 0) validateX = 0
        else if(x > this._primitive.settings.sideWidth - 1) validateX = this._primitive.settings.sideWidth - 1
        if(y < 0) validateY = 0
        if(y > this._primitive.settings.sideWidth - 1) validateY = this._primitive.settings.sideWidth - 1
        return {
            validateX,
            validateY
        }
    }
    revalidateObjects(){
        this._primitive.objects.forEach(object => {
            object.settings = ObjectSettingsValidator.validate(this._primitive.settings, object.settings, object.settings)
        })
    }

    getFirstPlayerObject(){
        return this._primitive.objects.find(o => o.settings.playerEdit)?.id
    }

    stringify(){
        let jsonObj = JSON.stringify(this._primitive,)
        let encoded = encodeURIComponent(jsonObj)
        
        return encoded
    }
    
    loadFromString(puzzleString: string){
        let decoded = decodeURIComponent(puzzleString)
        this._primitive = JSON.parse(decoded)
    }

    private _commandGoForward(objectId: PuzzleObjectId){
        this._commandGoForwardBy(objectId, 1)
    }
    private _commandJump(objectId: PuzzleObjectId){
        this._commandGoForwardBy(objectId, 2)
    }
    private _commandGoForwardBy(objectId: PuzzleObjectId, distance: number){
        let object = this.getObject(objectId)
        if(!object) return
        if(object.settings.direction == 'up'){
            object.settings.Y -= distance
        }
        else if(object.settings.direction == 'right'){
            object.settings.X += distance
        }
        else if(object.settings.direction == 'down'){
            object.settings.Y += distance
        }
        else{
            object.settings.X -= distance
        }
    }
    private _commandTurn(objectId: PuzzleObjectId, direction: string){
        let object = this.getObject(objectId)
        if(!object) return
        if(direction != 'right' && direction != 'left') return

        let objectDirection = object.settings.direction
        if(objectDirection == 'up'){
            if(direction == 'right') objectDirection = 'right'
            else objectDirection = 'left'
        }
        else if(objectDirection == 'right'){
            if(direction == 'right') objectDirection = 'down'
            else objectDirection = 'up'
        }
        else if(objectDirection == 'down'){
            if(direction == 'right') objectDirection = 'left'
            else objectDirection = 'right'
        }
        else {
            if(direction == 'right') objectDirection = 'up'
            else objectDirection = 'down'
        }
        object.settings.direction = objectDirection
    }
    private _commandSetDirection(objectId: PuzzleObjectId, direction: string){
        let object = this.getObject(objectId)
        if(!object) return
        if(direction != 'right' && direction != 'left' && direction != 'up' && direction != 'down') return

        object.settings.direction = direction
    }
    private _commandJumpTo(objectId: PuzzleObjectId, x: number, y: number){
        console.log(`Jumping to ${x} ${y}`)
        let object = this.getObject(objectId)
        if(!object) return
        object.settings.X = x
        object.settings.Y = y
    }
    private _commandGetX(objectId: PuzzleObjectId){
        let object = this.getObject(objectId)
        if(!object) return 0
        return object.settings.X
    }
    private _commandGetY(objectId: PuzzleObjectId){
        let object = this.getObject(objectId)
        if(!object) return 0
        return object.settings.Y
    }
    private _commandGetDirection(objectId: PuzzleObjectId){
        let object = this.getObject(objectId)
        if(!object) return 'down'
        return object.settings.direction
    }
    private _commandShow(objectId: PuzzleObjectId){
        let object = this.getObject(objectId)
        if(!object) return
        object.settings.visible = true
    }
    private _commandHide(objectId: PuzzleObjectId){
        let object = this.getObject(objectId)
        if(!object) return
        object.settings.visible = false
    }
    private _commandIsTouch(objectId: PuzzleObjectId, objectName: string){
        let object = this.getObject(objectId)
        if(!object) return false
        let targetObjects = this._primitive.objects.filter(o => o.settings.name == objectName)
        targetObjects = targetObjects.filter(o => o.settings.visible)
        return targetObjects.some(o => o.settings.X == object?.settings.X && o.settings.Y == object.settings.Y)
    }
    private _commandIsInFrontOfMe(objectId: PuzzleObjectId, objectName: string){
        let object = this.getObject(objectId)
        if(!object) return false
        let x = object.settings.X
        let y = object.settings.Y
        let direction = object.settings.direction

        if(direction == 'up') y--
        else if(direction == 'right') x++
        else if(direction == 'down') y++
        else x--

        return this._primitive.objects.some(o => o.settings.X == x && o.settings.Y == y && o.settings.name == objectName)
    }
    private _commandDistanceTo(objectId: PuzzleObjectId, objectName: string){
        let object = this.getObject(objectId)
        if(!object) return -1

        let distances = this._primitive.objects.filter(o => o.settings.name == objectName).map(o => {

            let x = (object as PuzzleObject).settings.X - o.settings.X
            let y = (object as PuzzleObject).settings.Y - o.settings.Y
            return Math.sqrt((x * x) + (y * y))
        })
        if(distances.length == 0) return -1
        return Math.min(...distances)
    }
    private _commandSetLayer(objectId: PuzzleObjectId, layer: number){
        let object = this.getObject(objectId)
        if(!object) return 

        object.settings.layer = layer
    }

    commands = {
        goForward: this._commandGoForward.bind(this),
        jump: this._commandJump.bind(this),
        turn: this._commandTurn.bind(this),
        setDirection: this._commandSetDirection.bind(this),
        jumpTo: this._commandJumpTo.bind(this),
        getX: this._commandGetX.bind(this),
        getY: this._commandGetY.bind(this),
        getDirection: this._commandGetDirection.bind(this),
        show: this._commandShow.bind(this),
        hide: this._commandHide.bind(this),
        isTouch: this._commandIsTouch.bind(this),
        isInFrontOfMe: this._commandIsInFrontOfMe.bind(this),
        distanceTo: this._commandDistanceTo.bind(this),
        setLayer: this._commandSetLayer.bind(this)
    }

    clone(){
        // return new Puzzle({...this._primitive})
        return new Puzzle(JSON.parse(JSON.stringify(this._primitive)))
    }
}