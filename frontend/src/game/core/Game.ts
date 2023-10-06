class Game{
	private _puzzle: Puzzle

	constructor(
		codeUI: ICodeEditorUI,
		boardUI: IBoardUI,
		controlPanelUI: IControlPanelUI,
		objectList: IObjectPanelUI
		){
		
		this._puzzle = new Puzzle()
		this._puzzle.loadFromString(getPuzzleMock())

		objectList.render(this._puzzle.getObjectList())

		boardUI.render(this._puzzle.getSettings(), this._puzzle.getObjectList())
	}


}