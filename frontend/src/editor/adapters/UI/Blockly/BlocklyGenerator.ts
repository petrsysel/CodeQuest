class BlocklyGenerator{
	private static _workspace: HTMLElement

	static getCodeFor(object: PuzzleObject): string{
		if(!this._workspace) this._init()
		let jsonCode = JSON.parse(object.settings.code)
		Blockly.serialization.workspaces.load(jsonCode, this._workspace)
		let code = Blockly.JavaScript.workspaceToCode(this._workspace);
		return code
	}

	private static _init(){
		let body = document.getElementsByTagName('body')[0]
		let workspaceDestination = document.createElement('div')
		workspaceDestination.style.display='none'
		workspaceDestination.id = 'generator-workspace'
		body.appendChild(workspaceDestination)
		let workspaceGenerator = new BlocklyWorkspaceGenerator('generator-workspace')
		this._workspace = workspaceGenerator.createWorkspace({})
	}
}