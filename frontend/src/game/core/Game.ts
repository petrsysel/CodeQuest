import { IBoardUI } from "../../editor/ports/UI/IBoardUI"
import { ICodeEditorUI } from "../../editor/ports/UI/ICodeEditorUI"
import { IControlPanelUI } from "../../editor/ports/UI/IControlPanelUI"
import { IObjectPanelUI } from "../../editor/ports/UI/IObjectPanelUI"
import { IClientIdManager } from "../../platform/core/IClientIdManager"
import { IServerAPI } from "../../platform/core/IServerAPI"
import { User } from "../../platform/core/User"
import { INotificationUI } from "../../shared/notification/ports/INotificationUI"
import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObjectId } from "../../shared/puzzle-lib/core/PuzzleTypes"
import { IGameLauncher } from "../ports/IGameLauncher"
import { IVisualizationPlayer } from "../ports/IVisualizationPlayer"
import { IVisualizerControlPanel } from "../ports/IVisualizerControlPanelUI"

export class Game{
	private _puzzle: Puzzle

	private _selectedObjectId: string | undefined
	private originalPuzzle: Puzzle
	private loggedUser: User | undefined

	constructor(
		codeUI: ICodeEditorUI,
		boardUI: IBoardUI,
		controlPanelUI: IControlPanelUI&IVisualizerControlPanel,
		objectList: IObjectPanelUI,
		gameLauncher: IGameLauncher,
		notificationUI: INotificationUI,
		visualizationPlayer: IVisualizationPlayer,
		serverApi: IServerAPI,
		clientIdManager: IClientIdManager
		){
		
		
		window.onresize = () => {
			boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
			objectList.render(this._puzzle.getObjectList())
			controlPanelUI.render(this._puzzle.getSettings())
		}
		
		this._puzzle = new Puzzle()
		const puzzleFromStorage = localStorage.getItem("cq-puzzle")
		
		const clientid = clientIdManager.get()

        serverApi.isLogged(clientid).then(user => {
            this.loggedUser = user
            const logged = user != undefined
        })

		codeUI.setupToolbox(this._puzzle.getBlocks())
		
		this.originalPuzzle = this._puzzle.clone()

		this._selectedObjectId = this._puzzle.getFirstPlayerObject()

		objectList.render(this._puzzle.getObjectList())

		const filterHidden = (key: any, value: any) => {
			if(value['type'] == "rule_check"){
				return undefined
			}
			else return value
		}

		if(this._selectedObjectId){
			controlPanelUI.render(this._puzzle.getSettings())
			boardUI.setSelected(this._selectedObjectId)
			let object = this._puzzle.getObject(this._selectedObjectId)
			
			if(object){
				// let filtered = JSON.parse(object.settings.code)
				// filtered.blocks.blocks = filtered.blocks.blocks.filter((block:any) => block.type != "rule_check")
				// codeUI.loadWorkspace(JSON.stringify(filtered))
				codeUI.loadWorkspace(object.settings.code, {
					loadRuleChecks: false
				})
				
			}
		}

		const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const id = urlParams.get('puzzleid')
        if(id){
            serverApi.getContent(clientid, id).then(response => {
                if(!response.error){
                    this._puzzle.loadFromString(response.response!)
					const playerObject = this._puzzle.getObjectList().find(o => o.settings.playerEdit)?.id
					if(playerObject){
						this._selectedObjectId = playerObject
						objectList.setSelected(playerObject)
						objectList.render(this._puzzle.getObjectList())
						boardUI.setSelected(playerObject)
						boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())

						let object = this._puzzle.getObject(this._selectedObjectId)
						codeUI.clearWorkspace()
						if(object)codeUI.loadWorkspace(object.settings.code, {
							loadRuleChecks: false
						})

						codeUI.setupToolbox(this._puzzle.getBlocks())
		
						this.originalPuzzle = this._puzzle.clone()
					}
					
                }
                else console.error(response.error)
            })
        }

		controlPanelUI.on('speed-change', data => {
			const speed = data!.speed!
			visualizationPlayer.changeSpeed(1-speed/100)
		})

		controlPanelUI.on('play-puzzle', () => {
			let code = codeUI.getCode()
			
			gameLauncher.play(this._puzzle, this.originalPuzzle)
			controlPanelUI.setState("loading")
		})

		controlPanelUI.on('stop-puzzle', () => {
			visualizationPlayer.stop()
			controlPanelUI.setState("loading")
		})
		visualizationPlayer.on("stoped", () => {
			controlPanelUI.setState("stoped")
			setTimeout(() => {
				boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
			}, 20);
		})

		gameLauncher.on("done", async data => {
			controlPanelUI.setState('playing')
			let workPuzzle = this._puzzle.clone()
			visualizationPlayer.play(data.resolvedGame, workPuzzle)
			// visualizationPlayer.stop()
		})
		gameLauncher.on('fail', data => {
			setTimeout(() => {
				controlPanelUI.setState('stoped')
				notificationUI.notify(data.error!, {
					
				})
			}, 20)
		})
		

		objectList.on('object-selected', data => {
			onSelected(data ? data.id : "")
		})

		boardUI.on('object-selected', data => {
			onSelected(data.objectId)
		})
		
		codeUI.on('code-change', data => {

			if(this._selectedObjectId) this._puzzle.changeObjectCode(this._selectedObjectId, data)
		})

		boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
		objectList.setSelected(this._selectedObjectId? this._selectedObjectId : "")
		objectList.render(this._puzzle.getObjectList())

		const onSelected = (selectedId: PuzzleObjectId) => {
			this._selectedObjectId = selectedId
			boardUI.setSelected(selectedId)
			boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
			objectList.setSelected(this._selectedObjectId? this._selectedObjectId : "")
			objectList.render(this._puzzle.getObjectList())
			let object = this._puzzle.getObject(this._selectedObjectId)
			codeUI.clearWorkspace()
			if(object)codeUI.loadWorkspace(object.settings.code, {
				loadRuleChecks: false
			})
		}

		
	}


}