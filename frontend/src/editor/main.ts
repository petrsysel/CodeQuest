import { ServerApi } from "../platform/ServerApi";
import { ClientIdManager } from "../platform/adapters/ClientIdManager";
import { NotificationUI } from "../shared/notification/adapters/NotificationUI";
import { BlocklyEditor } from "./adapters/UI/Blockly/BlocklyEditor";
import { KonvaBoardUI } from "./adapters/UI/Board/KonvaBoardUI";
import { ControlPanelUI } from "./adapters/UI/ControlPanel/ControlPanel";
import { CostumePickerUI } from "./adapters/UI/CostumePicker/CostumePickerUI";
import { ObjectPanelUI } from "./adapters/UI/ObjectPanel/ObjectPanelUI";
import { ObjectSettingsUI } from "./adapters/UI/ObjectSettings/ObjectSettingsUI";
import { PuzzleSettingsUI } from "./adapters/UI/PuzzleSettings/PuzzleSettingsUI";
import { Editor } from "./core/Editor";

function main(){
	const boardUI = new KonvaBoardUI('board-container', {
		draggable: true,
		selectable: "all"
	})
	const codeUI = new BlocklyEditor('blockly-placeholder')
	const controlPanelUI = new ControlPanelUI('control-panel')
	const objectPanel = new ObjectPanelUI('object-panel')
	const objectSettings = new ObjectSettingsUI('object-settings')
	const costumePicker = new CostumePickerUI('cp-place-holder')
	const puzzleSettings = new PuzzleSettingsUI('puzzle-settings-place-holder')
	const notificationUI = new NotificationUI()
	const serverApi = new ServerApi()
	const clientIdManager = new ClientIdManager()
	
	new Editor(
		boardUI,
		codeUI,
		controlPanelUI,
		objectPanel,
		objectSettings,
		costumePicker,
		puzzleSettings,
		notificationUI,
		serverApi,
		clientIdManager
	)
}

window.onload = main