import Blockly, { BlocklyOptions, WorkspaceSvg } from 'blockly'
import { BlocklyBlockDefinitionContainer } from './BlocklyBlockDefinitionContainer'
import { BlocklyBehaviourDefinitionContainer } from './BlocklyBehaviourDefinitionContainer'
import { BlocklyToolboxContainer } from './BlocklyToolboxContainer'
import { BlocklyExtendedBehaviourDefinitionContainer } from './BlocklyExtendedBehaviourDefinitionContainer'

import Cs from 'blockly/msg/cs'
import { Block } from '../../../../shared/puzzle-lib/core/PuzzleTypes'

export class BlocklyWorkspaceGenerator{
	private _workspace: WorkspaceSvg | undefined
	private _destination: string

	constructor(destination: string){
		this._destination = destination
	}

	private _getWorkspaceOptions(toolbox: HTMLElement, theme: any){
		let options: BlocklyOptions = {
			toolbox: toolbox,
			theme: theme,
			collapse: false,
			//@ts-ignore
			autoClose: false,
			comments: true,
			disable: true,
			maxBlocks: Infinity,
			trashcan: true,
			zoom: {
				controls: true,
				maxScale: 3,
				minScale:0.3,
				scaleSpeed: 1.2,
				startScale: 1,
				wheel: true
			},
			
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
			},
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
			  'toolboxForegroundColour': '#fff',
			  'flyoutBackgroundColour': medium,
			  'flyoutForegroundColour': light,
			  'flyoutOpacity': 0.8,
			  'scrollbarColour': '#797979',
			  'insertionMarkerColour': '#aaa',
			  'insertionMarkerOpacity': 0.3,
			  'scrollbarOpacity': 0.4,
			  'cursorColour': '#d0d0d0'
			},
			'fontStyle': font,
			'name': "cq-theme",
			
		})
	}

	createWorkspace(enabledBlocks: Block[]){
		BlocklyBlockDefinitionContainer.init()
		BlocklyExtendedBehaviourDefinitionContainer.init()
		let toolbox = BlocklyToolboxContainer.getToolbox(enabledBlocks)
		let theme = this._getTheme()
		let options = this._getWorkspaceOptions(toolbox, theme)
		
		this._workspace = Blockly.inject(this._destination, options);

		Blockly.setLocale(Cs)
		this._workspace.getToolbox()!.getFlyout()!.autoClose = false
		return this._workspace
	}

	
}