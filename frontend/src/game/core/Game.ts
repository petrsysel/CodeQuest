class Game{
	private _puzzle: Puzzle

	private _selectedObjectId: string | undefined

	constructor(
		codeUI: ICodeEditorUI,
		boardUI: IBoardUI,
		controlPanelUI: IControlPanelUI&IVisualizerControlPanel,
		objectList: IObjectPanelUI,
		gameLauncher: IGameLauncher,
		notificationUI: INotificationUI,
		visualizationPlayer: IVisualizationPlayer
		){
		
		this._puzzle = new Puzzle()
		const puzzleFromStorage = localStorage.getItem("cq-puzzle")
		if(puzzleFromStorage){
			this._puzzle.loadFromString(puzzleFromStorage)
		}
		else this._puzzle.loadFromString(puzzleMock.threeWizards())
		
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
				codeUI.loadWorkspace(object.settings.code)
			}
		}

		controlPanelUI.on('play-puzzle', () => {
			let code = codeUI.getCode()
			
			gameLauncher.play(this._puzzle)
			controlPanelUI.setState("loading")
		})

		controlPanelUI.on('stop-puzzle', () => {
			visualizationPlayer.stop()
			controlPanelUI.setState("loading")
		})
		visualizationPlayer.on("stoped", () => {
			controlPanelUI.setState("stoped")
			boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
		})

		gameLauncher.on("done", async data => {
			controlPanelUI.setState("playing")
			let workPuzzle = this._puzzle.clone()
			visualizationPlayer.play(data, workPuzzle)
			//visualizationPlayer.stop()
		})
		

		boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())

		boardUI.on('object-selected', data => {
			this._selectedObjectId = data.objectId
			console.log(`Object ${data.objectId} was selected`)
			boardUI.setSelected(data.objectId)
			boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
			let object = this._puzzle.getObject(this._selectedObjectId)
			codeUI.clearWorkspace()
			if(object)codeUI.loadWorkspace(object.settings.code)
		})
		
		codeUI.on('code-change', data => {

			if(this._selectedObjectId) this._puzzle.changeObjectCode(this._selectedObjectId, data)
		})
	}


}