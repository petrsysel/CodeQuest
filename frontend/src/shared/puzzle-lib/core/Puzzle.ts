
class Puzzle implements IPuzzle{
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

    stringify(){
        let jsonObj = JSON.stringify(this._primitive,)
        let encoded = encodeURIComponent(jsonObj)
        
        return encoded
    }
    
    loadFromString(puzzleString: string){
        let decoded = decodeURIComponent(puzzleString)
        this._primitive = JSON.parse(decoded)
    }
}