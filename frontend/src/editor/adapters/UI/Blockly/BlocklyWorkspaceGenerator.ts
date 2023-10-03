class BlocklyWorkspaceGenerator{
	private _workspace: any

	constructor(){
		
	}

	private _getWorkspaceOptions(toolbox: HTMLElement, theme: any){
		let options = {
			toolbox: toolbox,
			theme: theme,
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
			  colour: '#000',
			  snap: false
			}
		}
		return options
	}

	private _getTheme(){

		let light = `#d4d9e3`
		let medium = `#bdcae1`
		let dark = `#002e82`

		let font = {
			'family': 'mainFont, serif',
			'weight': 'bold',
			'size': 12
		 }
		
		// for toolbox font, change blockly.min.js font on line 1558
		return Blockly.Theme.defineTheme('code-quest', {
			'base': Blockly.Themes.Classic,
			'componentStyles': {
			  'workspaceBackgroundColour': light,
			  'toolboxBackgroundColour': dark,
			  'toolboxForegroundColour': light,
			  'flyoutBackgroundColour': medium,
			  'flyoutForegroundColour': light,
			  'flyoutOpacity': 0.8,
			  'scrollbarColour': '#797979',
			  'insertionMarkerColour': '#aaa',
			  'insertionMarkerOpacity': 0.3,
			  'scrollbarOpacity': 0.4,
			  'cursorColour': '#d0d0d0',
			  'blackBackground': '#333'
			},
			'fontStyle': font
		})
	}

	createWorkspace(blockOptions: any){
		BlocklyBlockDefinitionContainer.init()
		let toolbox = BlocklyToolboxContainer.getToolbox()
		let theme = this._getTheme()
		let options = this._getWorkspaceOptions(toolbox, theme)
		this._workspace = Blockly.inject('blocklyDiv', options);

		

		return this._workspace
	}

	
}