function main(){
    let blocklyEditor = new BlocklyEditor('blockly-placeholder')
    let objectPanel = new ObjectPanelUI('object-panel')
    let objectSettings = new ObjectSettingsUI('object-settings')
    let costumePicker = new CostumePickerUI('cp-place-holder')
    let board = new KonvaBoardUI('board-container')
    let controlPanel = new ControlPanelUI('control-panel')
    let puzzleSettings = new PuzzleSettingsUI('puzzle-settings-place-holder')

    let editor = new Editor(board, blocklyEditor, controlPanel, objectPanel, objectSettings, costumePicker, puzzleSettings)
    
    let gameBlockly = new BlocklyEditor('game-blockly-placeholder')
    let gameBoard = new KonvaBoardUI('game-board-container')
    let gameControlPanel = new GameControlPanel('game-control-panel')
    let gameObjectList = new GameObjectList('game-object-list')

    let game = new Game(gameBlockly, gameBoard, gameControlPanel, gameObjectList)
    
}