class Editor{
    private _mockupPuzzle: Puzzle
    private _mockupCostumes = getMockCostumes()

    private _selectedObjectId: PuzzleObjectId | undefined

    private boardUI: IBoardUI
    private codeUI: ICodeEditorUI
    private controlPanelUI: IControlPanelUI
    private objectPanelUI: IObjectPanelUI
    private objectSettingsUI: IObjectSettingsUI
    private costumePickerUI: ICostumePickerUI
    private puzzleSettingsUI: IPuzzleSettingsUI

    constructor(
        boardUI: IBoardUI,
        codeUI: ICodeEditorUI,
        controlPanelUI: IControlPanelUI,
        objectPanelUI: IObjectPanelUI,
        objectSettingsUI: IObjectSettingsUI,
        costumePickerUI: ICostumePickerUI,
        puzzleSettingsUI: IPuzzleSettingsUI
        ){
        
        this._mockupPuzzle = new Puzzle()

        this.boardUI = boardUI
        this.codeUI = codeUI
        this.controlPanelUI = controlPanelUI
        this.objectPanelUI = objectPanelUI
        this.objectSettingsUI = objectSettingsUI
        this.costumePickerUI = costumePickerUI
        this.puzzleSettingsUI = puzzleSettingsUI

        codeUI.on('code-change', (data) => {
            this._mockupPuzzle.changeObjectCode(this._selectedObjectId, data)
            this._renderObjectPanel()
        })

        objectPanelUI.on('object-added', (data) => {
            let id = this._mockupPuzzle.addObject()
            this._selectedObjectId = id
            codeUI.clearWorkspace()
            this._renderAll()
            costumePickerUI.render(this._mockupCostumes)
        })
        objectPanelUI.on('object-removed', (data) => {
            if(this._selectedObjectId)this._mockupPuzzle.removeObject(this._selectedObjectId)
            codeUI.clearWorkspace()
            this._renderAll()
        })
        objectPanelUI.on('object-selected', (data) => {
            let id = (data as OPDSelection).id
            this._selectedObjectId = id

            this._renderAll()
        })

        objectSettingsUI.on('settings-changed', data => {
            if(!this._selectedObjectId) return
            let actualObject = this._mockupPuzzle.getObject(this._selectedObjectId)
            if(!actualObject) return
            let validatedSettings = ObjectSettingsValidator.validate(this._mockupPuzzle.getSettings(),data as PuzzleObjectSettings, actualObject.settings)
            this._mockupPuzzle.changeObjectSettings(this._selectedObjectId, validatedSettings)
            
            this._renderAll()
        })
        objectSettingsUI.on('change-costume-request', () => {
            costumePickerUI.render(this._mockupCostumes)
        })
        costumePickerUI.on('costume-pick', (costume) => {
            if(!this._selectedObjectId) return
            this._mockupPuzzle.changeObjectCostume(this._selectedObjectId, costume)
            this._renderAll()
        })

        boardUI.on('object-moved', (data) => {
            this._mockupPuzzle.setObjectPosition(data.objectId, data.x, data.y)
            this._selectedObjectId = data.objectId
            this._renderAll()
        })

        controlPanelUI.on('puzzle-settings-request', data => {
            puzzleSettingsUI.render(this._mockupPuzzle.getSettings(), [])
        })

        puzzleSettingsUI.on('settings-changed', data => {
            let validatedSettings = PuzzleSettingsValidator.validate(data, this._mockupPuzzle.getSettings())
            this._mockupPuzzle.changeSettings(validatedSettings)
            this._mockupPuzzle.revalidateObjects()
            this._renderAll()
            this.puzzleSettingsUI.render(this._mockupPuzzle.getSettings(), [])
        })
        
        this._renderAll()
    }

    private _renderAll(){
        this._renderObjectPanel()

        let actualObject = this._mockupPuzzle.getObject(this._selectedObjectId)
        this.objectSettingsUI.render(actualObject)

        this.boardUI.render(this._mockupPuzzle.getSettings(), this._mockupPuzzle.getObjectList())
        
        this.codeUI.clearWorkspace()
        let code = this._mockupPuzzle.getObjectCode(this._selectedObjectId)
        if(code){
            this.codeUI.loadWorkspace(code)
        }
        this.controlPanelUI.render(this._mockupPuzzle.getSettings())
    }

    private _renderObjectPanel(){
        this.objectPanelUI.render(this._mockupPuzzle.getObjectList())
        if(!this._selectedObjectId) return
        this.objectPanelUI.setSelected(this._selectedObjectId)
    }
}