import { Block } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type CodeEditorUIEvents = "code-change"
export type CodeEditorUIData = CodeEditorWorkspace

export interface ICodeEditorUI{
    loadWorkspace(workspace:CodeEditorWorkspace, options: {
        loadRuleChecks: boolean
    }):boolean
    getWorkspace():CodeEditorWorkspace
    on(event: CodeEditorUIEvents, callback: (data: CodeEditorUIData) => void): void
    clearWorkspace():void
    getBlocks(): Block[]
    getCode(): string
    setupToolbox(enabledBlocks: Block[]): void
}

export type CodeEditorWorkspace = string