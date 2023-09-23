
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
        return false
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
    getObject(id: PuzzleObjectId): PuzzleObject | undefined{
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
}