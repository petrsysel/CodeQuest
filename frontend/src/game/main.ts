import { BlocklyEditor } from "../editor/adapters/UI/Blockly/BlocklyEditor";
import { BlocklyWorkspaceGenerator } from "../editor/adapters/UI/Blockly/BlocklyWorkspaceGenerator";
import { KonvaBoardUI } from "../editor/adapters/UI/Board/KonvaBoardUI";
import { ServerApi } from "../platform/ServerApi";
import { ClientIdManager } from "../platform/adapters/ClientIdManager";
import { NotificationUI } from "../shared/notification/adapters/NotificationUI";
import { Instruction } from "./adapters/GameInstructions/GameInstructions";
import { GameLauncher } from "./adapters/GameLaucher";
import { OBTGameLauncher } from "./adapters/OBTGameLauncher/OBTGameLauncher";
import { GameControlPanel } from "./adapters/UI/GameControlPanel/GameControlPanel";
import { GameObjectList } from "./adapters/UI/GameObjectList/GameObjectList";
import { VisualizationPlayer } from "./adapters/VisualizationPlayer";
import { Game } from "./core/Game";

async function main(){
	
	

	const game = new BlocklyEditor('game-blockly-placeholder')
	const board = new KonvaBoardUI('game-board-container', {
		draggable: false,
		selectable: "player"
	})
	const workspaceGenerator = new BlocklyWorkspaceGenerator('generator-workspace')
	const gameLauncher = new OBTGameLauncher(workspaceGenerator)
	const objectList = new GameObjectList('game-object-list')
	const controlPanel = new GameControlPanel('game-control-panel')
	const notificationUI = new NotificationUI()
	const visualizationPlayer = new VisualizationPlayer(board, notificationUI)
	const serverApi = new ServerApi()
	const clientIdManager = new ClientIdManager()
	const costumes = await serverApi.getCostumes()
	Instruction.initCostumeData(costumes)

	new Game(
		game,
		board,
		controlPanel,
		objectList,
		gameLauncher,
		notificationUI,
		visualizationPlayer,
		serverApi,
		clientIdManager
	)
}

window.onload = main