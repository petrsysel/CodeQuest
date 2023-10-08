class BlocklyEditor implements ICodeEditorUI {
  private _workspace: any
  private _eventBehaviour: EventBehaviour<CodeEditorUIEvents, CodeEditorUIData>
  private _workspaceGenerator: BlocklyWorkspaceGenerator
  constructor(destination: string) {
    this._eventBehaviour = new EventBehaviour()
    this._workspaceGenerator = new BlocklyWorkspaceGenerator(destination)
    this._setupBlockly()
  }
  getWorkspace(): CodeEditorWorkspace {
    // Saves only the variables information for the workspace.
    const save = Blockly.serialization.workspaces.save(this._workspace)
    let jsonString = JSON.stringify(save)
    return jsonString
  }
  loadWorkspace(workspace: CodeEditorWorkspace): boolean {
    try {
      let save = JSON.parse(workspace)
      Blockly.serialization.workspaces.load(save, this._workspace)
      return true
    }
    catch (e) {
      console.error(e)
      return false
    }

  }

  private _setupBlockly() {
    
    this._workspace = this._workspaceGenerator.createWorkspace(null)
    this._workspace.addChangeListener((event: any) => {
      if (event.type == 'move' || event.type == 'change') this._emit('code-change', this.getWorkspace())
    })
  }

  getBlocks(): Block[] {
    let blocks: Block[] = []
    let list = ""
    this._workspace.toolbox_.contents_.forEach((category: any) => {
      let catName = category.name_
      if(!category.toolboxItemDef_.contents) return
      category.toolboxItemDef_.contents.forEach((block: any) => {
        let type = block.type
        list += type+"\n"
        blocks.push({
          name: BlockNameContainer.getName(type),
          type: type,
          category: catName
        })
      })
    })
    return blocks
  }

  private _emit(event: CodeEditorUIEvents, data: CodeEditorUIData){
    this._eventBehaviour.emit(event, data)
  }

  on(event: CodeEditorUIEvents, callback: (data: CodeEditorUIData) => void){
    this._eventBehaviour.on(event, callback)
  }
  clearWorkspace(): void {
    this.loadWorkspace("{}")
  }

  getCode(): string {
    var code = Blockly.JavaScript.workspaceToCode(this._workspace);
    return code
  }
}