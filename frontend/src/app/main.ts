function main(){
    const blocklyEditor = new BlocklyEditor('blockly-placeholder')
    const objectPanel = new ObjectPanelUI('object-panel')
    const objectSettings = new ObjectSettingsUI('object-settings')
    const costumePicker = new CostumePickerUI('cp-place-holder')
    const board = new KonvaBoardUI('board-container', {
        draggable: true,
        selectable: 'all'
    })
    const controlPanel = new ControlPanelUI('control-panel')
    const puzzleSettings = new PuzzleSettingsUI('puzzle-settings-place-holder')

    const editorNotificationUI = new NotificationUI()

    const editor = new Editor(board, blocklyEditor, controlPanel, objectPanel, objectSettings, costumePicker, puzzleSettings, editorNotificationUI)
    
    const gameBlockly = new BlocklyEditor('game-blockly-placeholder')
    const gameBoard = new KonvaBoardUI('game-board-container', {
        draggable: false,
        selectable: 'player'
    })
    const gameControlPanel = new GameControlPanel('game-control-panel')
    const gameObjectList = new GameObjectList('game-object-list')

    const gameLauncher = new GameLauncher(1000)

    const notificationUI = new NotificationUI()
    const visualizationPlayer = new VisualizationPlayer(gameBoard, notificationUI)

    const game = new Game(gameBlockly, gameBoard, gameControlPanel, gameObjectList, gameLauncher, notificationUI, visualizationPlayer)
    
}