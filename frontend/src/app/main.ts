function main(){
    let blocklyEditor = new BlocklyEditor()
    let objectPanel = new ObjectPanelUI()
    let objectSettings = new ObjectSettingsUI()
    let costumePicker = new CostumePickerUI()
    let board = new KonvaBoardUI()
    let editor = new Editor(board, blocklyEditor, <IControlPanelUI>{}, objectPanel, objectSettings, costumePicker)
}