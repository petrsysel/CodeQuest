class BlocklyEditor implements ICodeEditorUI {
  private _workspace: any
  private _eventBehaviour: EventBehaviour<CodeEditorUIEvents, CodeEditorUIData>
  private _workspaceGenerator: BlocklyWorkspaceGenerator
  constructor() {
    this._eventBehaviour = new EventBehaviour()
    this._workspaceGenerator = new BlocklyWorkspaceGenerator()
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
    let blocks = this._workspace.getAllBlocks()
    console.log(blocks)
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
}