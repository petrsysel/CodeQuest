function main(){
    let blocklyEditor = new BlocklyEditor()
    let objectPanel = new ObjectPanelUI()
    let objectSettings = new ObjectSettingsUI()
    let costumePicker = new CostumePickerUI()
    let editor = new Editor(<IBoardUI>{}, blocklyEditor, <IControlPanelUI>{}, objectPanel, objectSettings, costumePicker)
}