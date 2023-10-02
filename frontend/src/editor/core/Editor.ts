class Editor{
    private _mockupPuzzle: Puzzle
    private _mockupCostumes = getMockCostumes()

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
            this._mockupPuzzle.changeObjectCode(this._selectedObjectId, data)
            objectPanelUI.render(this._mockupPuzzle.getObjectList())
        })

        objectPanelUI.on('object-added', (data) => {
            let id = this._mockupPuzzle.addObject()
            this._selectedObjectId = id
            codeUI.clearWorkspace()
            objectPanelUI.render(this._mockupPuzzle.getObjectList())
            if(this._selectedObjectId)objectPanelUI.setSelected(this._selectedObjectId)

            let object = this._mockupPuzzle.getObject(id)
            objectSettingsUI.render(object)
            
            costumePickerUI.render(this._mockupCostumes)
        })
        objectPanelUI.on('object-removed', (data) => {
            if(this._selectedObjectId)this._mockupPuzzle.removeObject(this._selectedObjectId)
            codeUI.clearWorkspace()
            objectPanelUI.render(this._mockupPuzzle.getObjectList())
            objectSettingsUI.render(this._mockupPuzzle.getObject(this._selectedObjectId))
        })
        objectPanelUI.on('object-selected', (data) => {
            let id = (data as OPDSelection).id
            this._selectedObjectId = id

            if(this._selectedObjectId)objectPanelUI.setSelected(this._selectedObjectId)

            let object = this._mockupPuzzle.getObject(id)
            codeUI.clearWorkspace()
            let code = this._mockupPuzzle.getObjectCode(id)
            if(code){
                codeUI.loadWorkspace(code)
            }
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

            boardUI.render(this._mockupPuzzle.getObjectList())
        })
        objectSettingsUI.on('change-costume-request', () => {
            costumePickerUI.render(this._mockupCostumes)
        })
        costumePickerUI.on('costume-pick', (costume) => {
            if(!this._selectedObjectId) return
            this._mockupPuzzle.changeObjectCostume(this._selectedObjectId, costume)
            let actualObject = this._mockupPuzzle.getObject(this._selectedObjectId)
            objectSettingsUI.render(actualObject)

            boardUI.render(this._mockupPuzzle.getObjectList())
        })

        boardUI.on('object-moved', (data) => {
            this._mockupPuzzle.setObjectPosition(data.objectId, data.x, data.y)
            this._selectedObjectId = data.objectId
            boardUI.render(this._mockupPuzzle.getObjectList())
            objectSettingsUI.render(this._mockupPuzzle.getObject(this._selectedObjectId))
        })
        
        objectSettingsUI.render(this._mockupPuzzle.getObject(this._selectedObjectId))
    }
}