class Editor{
    private _mockupPuzzle: Puzzle
    private _mockupCostumes = [
        "/frontend/costumes/Keř 1.png",
        "/frontend/costumes/Keř 2.png",
        "/frontend/costumes/Kouzelník s klíčem.png",
        "/frontend/costumes/Kouzelník s plamenem.png",
        "/frontend/costumes/Kouzelník.png",
        "/frontend/costumes/Modrý klíč.png",
    ]

    private _selectedObjectId: PuzzleObjectId | undefined

    constructor(
        boardUI: IBoardUI,
        codeUI: ICodeEditorUI,
        controlPanelUI: IControlPanelUI,
        objectPanelUI: IObjectPanelUI,
        objectSettingsUI: IObjectSettingsUI,
        costumePickerUI: ICostumePickerUI
        ){
        
        this._mockupPuzzle = new Puzzle()

        codeUI.on('code-change', (data) => {
            console.log("Let's save code!")
        })

        objectPanelUI.on('object-added', (data) => {
            let id = this._mockupPuzzle.addObject()
            this._selectedObjectId = id
            objectPanelUI.render(this._mockupPuzzle.getObjectList())
            if(this._selectedObjectId)objectPanelUI.setSelected(this._selectedObjectId)

            
            costumePickerUI.render(this._mockupCostumes)
        })
        objectPanelUI.on('object-removed', (data) => {
            if(this._selectedObjectId)this._mockupPuzzle.removeObject(this._selectedObjectId)
            objectPanelUI.render(this._mockupPuzzle.getObjectList())
        })
        objectPanelUI.on('object-selected', (data) => {
            let id = (data as OPDSelection).id
            this._selectedObjectId = id

            if(this._selectedObjectId)objectPanelUI.setSelected(this._selectedObjectId)

            let object = this._mockupPuzzle.getObject(id)
            objectSettingsUI.render(object)
        })

        objectSettingsUI.on('settings-changed', data => {
            if(!this._selectedObjectId) return
            let actualObject = this._mockupPuzzle.getObject(this._selectedObjectId)
            if(!actualObject) return
            let validatedSettings = ObjectSettingsValidator.validate(this._mockupPuzzle.getSettings(),data as PuzzleObjectSettings, actualObject.settings)
            this._mockupPuzzle.changeObjectSettings(this._selectedObjectId, validatedSettings)
            
            objectPanelUI.render(this._mockupPuzzle.getObjectList())
            objectPanelUI.setSelected(this._selectedObjectId)
            
            objectSettingsUI.render(actualObject)
        })
        objectSettingsUI.on('change-costume-request', () => {
            costumePickerUI.render(this._mockupCostumes)
        })
    }
}