import { BlocklyEditor } from "../editor/adapters/UI/Blockly/BlocklyEditor";
import { KonvaBoardUI } from "../editor/adapters/UI/Board/KonvaBoardUI";
import { NotificationUI } from "../shared/notification/adapters/NotificationUI";
import { GameLauncher } from "./adapters/GameLaucher";
import { GameControlPanel } from "./adapters/UI/GameControlPanel/GameControlPanel";
import { GameObjectList } from "./adapters/UI/GameObjectList/GameObjectList";
import { VisualizationPlayer } from "./adapters/VisualizationPlayer";
import { Game } from "./core/Game";

function main(){
	const game = new BlocklyEditor('game-blockly-placeholder')
	const board = new KonvaBoardUI('game-board-container', {
		draggable: false,
		selectable: "player"
	})
	const gameLauncher = new GameLauncher(200)
	const objectList = new GameObjectList('game-object-list')
	const controlPanel = new GameControlPanel('game-control-panel')
	const notificationUI = new NotificationUI()
	const visualizationPlayer = new VisualizationPlayer(board, notificationUI)

	new Game(
		game,
		board,
		controlPanel,
		objectList,
		gameLauncher,
		notificationUI,
		visualizationPlayer
	)
}

window.onload = main