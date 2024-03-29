import { ClientIdManager } from "../../platform/adapters/ClientIdManager"
import { IServerAPI } from "../../platform/core/IServerAPI"
import { User } from "../../platform/core/User"
import { INotificationUI } from "../../shared/notification/ports/INotificationUI"
import { ObjectSettingsValidator } from "../../shared/puzzle-lib/core/ObjectSettingsValidator"
import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { PuzzleSettingsValidator } from "../../shared/puzzle-lib/core/PuzzleSettingsValidator"
import { CostumeData, PuzzleObjectId, PuzzleObjectSettings } from "../../shared/puzzle-lib/core/PuzzleTypes"
import { IBoardUI } from "../ports/UI/IBoardUI"
import { ICodeEditorUI } from "../ports/UI/ICodeEditorUI"
import { IControlPanelUI } from "../ports/UI/IControlPanelUI"
import { ICostumePickerUI } from "../ports/UI/ICostumePickerUI"
import { IObjectPanelUI, OPDSelection } from "../ports/UI/IObjectPanelUI"
import { IObjectSettingsUI } from "../ports/UI/IObjectSettingsUI"
import { IPuzzleSettingsUI } from "../ports/UI/IPuzzleSettingsUI"

export class Editor{
    private _mockupPuzzle: Puzzle
    private _mockupCostumes: CostumeData[]

    private _selectedObjectId: PuzzleObjectId | undefined

    private boardUI: IBoardUI
    private codeUI: ICodeEditorUI
    private controlPanelUI: IControlPanelUI
    private objectPanelUI: IObjectPanelUI
    private objectSettingsUI: IObjectSettingsUI
    private costumePickerUI: ICostumePickerUI
    private puzzleSettingsUI: IPuzzleSettingsUI
    private notificationUI: INotificationUI

    private loggedUser: User | undefined

    constructor(
        boardUI: IBoardUI,
        codeUI: ICodeEditorUI,
        controlPanelUI: IControlPanelUI,
        objectPanelUI: IObjectPanelUI,
        objectSettingsUI: IObjectSettingsUI,
        costumePickerUI: ICostumePickerUI,
        puzzleSettingsUI: IPuzzleSettingsUI,
        notificationUI: INotificationUI,
        serverApi: IServerAPI,
        clientIdManager: ClientIdManager,
        costumeData: CostumeData[]
        ){
        const clientid = clientIdManager.get()
        this._mockupCostumes = costumeData
        serverApi.isLogged(clientid).then(user => {
            this.loggedUser = user
            const logged = user != undefined
        })

        this.codeUI = codeUI

        this._mockupPuzzle = new Puzzle()
        // will be fixed
        this._mockupPuzzle.changeSettings({
            name: this._mockupPuzzle.getSettings().name,
            sideWidth: this._mockupPuzzle.getSettings().sideWidth,
            blocks: codeUI.getBlocks()
        })

        // this._mockupPuzzle.loadFromString(puzzleMock.twoKeys())

        this.boardUI = boardUI
        
        this.controlPanelUI = controlPanelUI
        this.objectPanelUI = objectPanelUI
        this.objectSettingsUI = objectSettingsUI
        this.costumePickerUI = costumePickerUI
        this.puzzleSettingsUI = puzzleSettingsUI
        this.notificationUI = notificationUI

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
        objectPanelUI.on('object-duplicated', data => {
            if(!this._selectedObjectId) return
            let id = this._mockupPuzzle.duplicateObject(this._selectedObjectId)
            this._selectedObjectId = id
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
        objectSettingsUI.on('change-costume-request', async () => {
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
            let blocks = codeUI.getBlocks()
            puzzleSettingsUI.render(this._mockupPuzzle.getSettings(), blocks)
        })

        puzzleSettingsUI.on('settings-changed', data => {
            let validatedSettings = PuzzleSettingsValidator.validate(data, this._mockupPuzzle.getSettings())
            this._mockupPuzzle.changeSettings(validatedSettings)
            this._mockupPuzzle.revalidateObjects()
            this._renderAll()
            let blocks = codeUI.getBlocks()
            this.puzzleSettingsUI.render(this._mockupPuzzle.getSettings(), blocks)
        })
        const save = () => {
            if(!this.loggedUser) return
            const previewImage = boardUI.getPreviewImage()
            return serverApi.savePuzzle(clientid, this._mockupPuzzle, this.loggedUser, previewImage, null)
        }
        const openGame = (puzzleId: string) => {
            window.open(`game.html?puzzleid=${puzzleId}`)
        }
        controlPanelUI.on('play-puzzle', async () => {
            save()?.then(response => {
                openGame(this._mockupPuzzle.getId())
            })
            .catch(async () => {
                await notificationUI.notify("Úlohu se nepodařilo uložit.")
            })
        })
        controlPanelUI.on('save-game', () => {
            save()?.then(async response => {
                await notificationUI.notify("Úloha byla uložena!")
            })
            .catch(async () => {
                await notificationUI.notify("Úlohu se nepodařilo uložit.")
            })
        })

        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const id = urlParams.get('puzzleid')
        if(id){
            serverApi.getContent(clientid, id).then(response => {
                if(!response.error){
                    this._mockupPuzzle.loadFromString(response.response!)
                    this._renderAll()
                }
                else console.error(response.error)
            })
        }
        
        this._renderAll()
    }

    private _renderAll(){
        this._renderObjectPanel()

        let actualObject = this._mockupPuzzle.getObject(this._selectedObjectId)
        this.objectSettingsUI.render(actualObject)

        if(this._selectedObjectId) this.boardUI.setSelected(this._selectedObjectId)
        this.boardUI.render(this._mockupPuzzle.getSettings(), this._mockupPuzzle.getObjectList())
        
        this.codeUI.clearWorkspace()
        let code = this._mockupPuzzle.getObjectCode(this._selectedObjectId)
        if(code){
            this.codeUI.loadWorkspace(code, {
                loadRuleChecks: true
            })
        }
        this.controlPanelUI.render(this._mockupPuzzle.getSettings())
    }

    private _renderObjectPanel(){
        this.objectPanelUI.render(this._mockupPuzzle.getObjectList())
        if(!this._selectedObjectId) return
        this.objectPanelUI.setSelected(this._selectedObjectId)
    }
}