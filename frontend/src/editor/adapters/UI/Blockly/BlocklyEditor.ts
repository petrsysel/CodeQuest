import { EventBehaviour } from "../../../../shared/EventBehaviour"
import { CodeEditorUIData, CodeEditorUIEvents, CodeEditorWorkspace, ICodeEditorUI } from "../../../ports/UI/ICodeEditorUI"
import Blockly, { Generator, JavaScript, Workspace, WorkspaceSvg } from 'blockly'
import { BlocklyWorkspaceGenerator } from "./BlocklyWorkspaceGenerator"
import { BlockNameContainer } from "./BlockNameContainer"
import { Block } from "../../../../shared/puzzle-lib/core/PuzzleTypes"
import javascript from 'blockly/javascript'

const javascriptGenerator = javascript.javascriptGenerator

export class BlocklyEditor implements ICodeEditorUI {
  private _workspace: any
  private _eventBehaviour: EventBehaviour<CodeEditorUIEvents, CodeEditorUIData>
  private _workspaceGenerator: BlocklyWorkspaceGenerator
  private destination: string
  constructor(destination: string) {
    this.destination = destination
    this._eventBehaviour = new EventBehaviour()
    this._workspaceGenerator = new BlocklyWorkspaceGenerator(destination)
    this._setupBlockly([])
  }
  getWorkspace(): CodeEditorWorkspace {
    // Saves only the variables information for the workspace.
    const save = Blockly.serialization.workspaces.save(this._workspace)
    let jsonString = JSON.stringify(save)
    return jsonString
  }
  loadWorkspace(workspace: CodeEditorWorkspace, options: {
    loadRuleChecks: boolean
  }): boolean {
    try {
      let save = JSON.parse(workspace)
      Blockly.serialization.workspaces.load(save, this._workspace);

      // ZDE ODFILTROVAT RULE_CHECK BLOKY
      if(!options.loadRuleChecks)(this._workspace as WorkspaceSvg).getBlocksByType("rule_check").forEach(b => {
        b.dispose(true)
      })
      return true
    }
    catch (e) {
      // console.error(`Error while loading workspace: ${e}`)
      return false
    }
  }

  private _setupBlockly(enabledBlocks: Block[]) {
    
    this._workspace = this._workspaceGenerator.createWorkspace(enabledBlocks)
    this._workspace.addChangeListener((event: any) => {
      if (event.type == 'move' || event.type == 'change' || event.type == 'block_field_intermediate_change') this._emit('code-change', this.getWorkspace())
    })
  }

  getBlocks(): Block[] {
    let blocks: Block[] = [];
    (this._workspace as any).getToolbox()!.getToolboxItems().forEach((category: any) => {
      const blocksOfCat = category.getContents()
      if(blocksOfCat.constructor === Array) blocksOfCat.forEach((block: any) => {
        blocks.push({
          category:category.getName(),
          name: BlockNameContainer.getName(block.type),
          type: block.type
        })
      })
      else{
        if(blocksOfCat == "VARIABLE"){
          blocks.push({
            category: "Proměnné",
            name: "Bloky pro práci s proměnnými",
             type: "variables"
          })
        }
        if(blocksOfCat == "PROCEDURE"){
          blocks.push({
            category: "Funkce",
            name: "Bloky pro práci s funkcemi",
             type: "functions"
          })
        }
      }
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
    this.loadWorkspace("{}", {
      loadRuleChecks: true
    })
  }

  getCode(): string {
    let code = javascriptGenerator.workspaceToCode(this._workspace);
    return code
  }

  setupToolbox(enabledBlocks: Block[]){
    if(enabledBlocks.length == 0) return
    
    (this._workspace as any).getToolbox().getToolboxItems().forEach((cat: any) => {
      if(!enabledBlocks.some(b => b.category == cat.getName())) cat.hide()
      else{
        let toKeep: any[] = []
        
        if(typeof(cat.getContents()) != "string"){
          cat.getContents()?.forEach((b: any) => {
            if(enabledBlocks.some(eb => eb.type == b.type)) toKeep.push(b)
          })
          cat?.updateFlyoutContents(toKeep)
        }
        
      }
    })
  }
}