class BlocklyEditor implements ICodeEditorUI {
  private _workspace: any
  private _eventBehaviour: EventBehaviour<CodeEditorUIEvents, CodeEditorUIData>
  constructor() {
    this._eventBehaviour = new EventBehaviour()
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
    const toolbox = {
      "kind": "flyoutToolbox",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "block",
          "type": "controls_repeat_ext"
        },
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "math_number"
        },
        {
          "kind": "block",
          "type": "math_arithmetic"
        },
        {
          "kind": "block",
          "type": "text"
        },
        {
          "kind": "block",
          "type": "text_print"
        },
      ]
    }

    let options = {
      toolbox: toolbox,
      collapse: true,
      comments: true,
      disable: true,
      maxBlocks: Infinity,
      trashcan: true,
      horizontalLayout: false,
      toolboxPosition: 'start',
      css: true,
      media: 'https://blockly-demo.appspot.com/static/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      oneBasedIndex: true,
      grid: {
        spacing: 20,
        length: 1,
        colour: '#888',
        snap: false
      }
    }

    this._workspace = Blockly.inject('blocklyDiv', options);
    this._workspace.addChangeListener((event: any) => {
      if (event.type == 'move' || event.type == 'change') this._emit('code-change', this.getWorkspace())
      // console.log(event.type)
    })
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