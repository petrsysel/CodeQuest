class BlocklyWorkspaceGenerator{
	private _workspace: any

	constructor(){
		
	}

	private _getWorkspaceOptions(toolbox: HTMLElement){
		let options = {
			toolbox: toolbox,
			collapse: true,
			comments: true,
			disable: true,
			maxBlocks: Infinity,
			trashcan: true,
			horizontalLayout: false,
			toolboxPosition: 'start',
			css: true,
			media: 'https://blockly-demo.appspot.com/static/media/',
			rtl: false,
			scrollbars: true,
			sounds: true,
			oneBasedIndex: true,
			grid: {
			  spacing: 20,
			  length: 1,
			  colour: '#888',
			  snap: false
			}
		}
		return options
	}

	createWorkspace(blockOptions: any){
		BlocklyBlockDefinitionContainer.init()
		let toolbox = BlocklyToolboxContainer.getToolbox()
		let options = this._getWorkspaceOptions(toolbox)
		this._workspace = Blockly.inject('blocklyDiv', options);
		return this._workspace
	}

	
}