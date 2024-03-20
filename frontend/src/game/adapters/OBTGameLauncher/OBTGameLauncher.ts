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
import { JumpAction } from "./Actions/movement/JumpActions";
import { TurnAction } from "./Actions/movement/TurnAction";
import { SetDirectionAction } from "./Actions/movement/SetDirectionAction";
import { DirectionPickAction } from "./Actions/movement/DirectionPickAction";
import { JumpToAction } from "./Actions/movement/JumpToAction";
import { GetXAction } from "./Actions/movement/GetXAction";
import { GetYAction } from "./Actions/movement/GetYAction";
import { GetDirectionAction } from "./Actions/movement/GetDirectionAction";
import { ChangeCostumeAction } from "./Actions/looks/ChangeCostumeAction";
import { ShowAction } from "./Actions/looks/ShowAction";
import { HideAction } from "./Actions/looks/HideAction";
import { SetLayerAction } from "./Actions/looks/SetLayerAction";
import { BooleanAction } from "./Actions/logic/BooleanAction";
import { IfAction } from "./Actions/logic/IfAction";
import { LogicCompareAction } from "./Actions/logic/LogicCompareAction";
import { LogicOperationAction } from "./Actions/logic/LogicOperationAction";
import { LogicNegateAction } from "./Actions/logic/LogicNegateAction";
import { MathArithmeticAction } from "./Actions/math/MathArithmeticAction";
import { MathPropertyAction } from "./Actions/math/MathPropertyAction";
import { MathRoundAction } from "./Actions/math/MathRoundAction";
import { MathModuloAction } from "./Actions/math/MathModuloAction";
import { MathConstrainAction } from "./Actions/math/MathConstrainAction";
import { MathRandomIntAction } from "./Actions/math/MathRandomIntAction";
import { TextJoinAction } from "./Actions/text/TextJoinAction";
import { TextLengthAction } from "./Actions/text/TextLengthAction";
import { TextIsEmptyAction } from "./Actions/text/TextIsEmptyAction";
import { DistanceToAction } from "./Actions/sensing/DistanceToAction";
import { IsTouchingAction } from "./Actions/sensing/IsTouchingAction";
import { IsInFrontOfMeAction } from "./Actions/sensing/IsInFrontOfMeAction";
import { WinAction } from "./Actions/events/WinAction";
import { GameOverAction } from "./Actions/events/GameOverAction";

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
		console.log("start play")
		// Pro sestavení stromu musejí být importovány
		const enabledActions = [
			GoAction,
			JumpAction,
			TurnAction,
			SetDirectionAction,
			DirectionPickAction,
			JumpToAction,
			GetXAction,
			GetYAction,
			GetDirectionAction,
			ChangeCostumeAction,
			ShowAction,
			HideAction,
			SetLayerAction,
			ForAction,
			BooleanAction,
			LogicCompareAction,
			LogicOperationAction,
			LogicNegateAction,
			MathArithmeticAction,
			MathPropertyAction,
			MathRoundAction,
			MathModuloAction,
			MathConstrainAction,
			MathRandomIntAction,
			IfAction,
			NumberAction,
			TextAction,
			TextJoinAction,
			TextLengthAction,
			TextIsEmptyAction,
			EmitAction,
			OnEventAction,
			WinAction,
			GameOverAction,
			WaitAction,
			DistanceToAction,
			IsTouchingAction,
			IsInFrontOfMeAction
		]

		const operatingPuzzle = puzzle.clone()

		const controllers = puzzle.getObjectList().map(o => {
			let save = {}
			try{
				save = JSON.parse(o.settings.code)
			}
			catch(e){
				
			}
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

			return new ObjectController(o, main, eventHandlers, operatingPuzzle)
		})
		const synchronizer = new Synchronizer(...controllers)

		synchronizer.on('resolved', resolvedGame => {
			console.log(operatingPuzzle)
			this.signal.emit('done', resolvedGame.resolvedGame)
		})

		synchronizer.next()
	}
}