import { javascriptGenerator } from "blockly/javascript";
import { BlocklyWorkspaceGenerator } from "../../../editor/adapters/UI/Blockly/BlocklyWorkspaceGenerator";
import { Puzzle } from "../../../shared/puzzle-lib/core/Puzzle";
import { IGameLauncher, LaucherData, LauncherEvent } from "../../ports/IGameLauncher";

import Blockly from 'blockly'
import * as esprima from 'esprima'
import greenlet from "greenlet";
import * as Comlink from 'comlink'
import { BlocklyEditor } from "../../../editor/adapters/UI/Blockly/BlocklyEditor";
import { DomHelper, Signal } from "easybox";
import { PuzzleObject } from "../../../shared/puzzle-lib/core/PuzzleTypes";
import { object } from "blockly/core/utils";
import { GameInstruction, Instruction } from "../GameInstructions/GameInstructions";
import { Action } from "./Actions/Action";
import { ActionContainer } from "./Actions/ActionContainer";
import { OnEventAction } from "./Actions/events/OnEventAction";
import { ObjectController } from "./ObjectController";
import { Synchronizer } from "./Synchronizer";
import { GoAction } from "./Actions/movement/GoActions";
import { ForAction } from "./Actions/loops/ForLoopAction";
import { NumberAction } from "./Actions/math/NumberAction";
import { TextAction } from "./Actions/text/TextAction";
import { EmitAction } from "./Actions/events/EmitAction";
import { WaitAction } from "./Actions/events/WaitAction";

export class OBTGameLauncher implements IGameLauncher{
	private signal: Signal<LauncherEvent, LaucherData>
	private workspaceGenerator: BlocklyWorkspaceGenerator
	private workspace: any

	constructor(workspaceGenerator: BlocklyWorkspaceGenerator){
		this.signal = new Signal()
		this.workspaceGenerator = workspaceGenerator
		this.workspace = workspaceGenerator.createWorkspace(null)
	}
	
	on(event: LauncherEvent, callback: (data: LaucherData) => void): void {
		this.signal.on(event, callback)
	}
	async play(puzzle: Puzzle) {
		
		// Pro sestavení stromu musejí být importovány
		const enabledActions = [
			GoAction,
			ForAction,
			NumberAction,
			TextAction,
			EmitAction,
			OnEventAction,
			WaitAction
		]

		const controllers = puzzle.getObjectList().map(o => {
			let save = JSON.parse(o.settings.code)
      		Blockly.serialization.workspaces.load(save, this.workspace)
			let tree: Action<any>[] = []
			const code: string = javascriptGenerator.workspaceToCode(this.workspace)
			const finalCode = `tree = [${code.replace(new RegExp(',$'), '')}]`
			eval(finalCode)

			const eventHandlers = tree.filter(a => a instanceof OnEventAction) as OnEventAction[]
			const mainActions = tree.filter(a => !(a instanceof OnEventAction))
			const main = new ActionContainer(
				...mainActions
			)

			return new ObjectController(o, main, eventHandlers)
		})
		const synchronizer = new Synchronizer(...controllers)

		synchronizer.on('resolved', resolvedGame => {
			this.signal.emit('done', resolvedGame.resolvedGame)
		})

		synchronizer.next()
	}
}