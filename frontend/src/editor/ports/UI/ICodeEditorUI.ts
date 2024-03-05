import { Block } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type CodeEditorUIEvents = "code-change"
export type CodeEditorUIData = CodeEditorWorkspace

export interface ICodeEditorUI{
    loadWorkspace(workspace:CodeEditorWorkspace):boolean
    getWorkspace():CodeEditorWorkspace
    on(event: CodeEditorUIEvents, callback: (data: CodeEditorUIData) => void): void
    clearWorkspace():void
    getBlocks(): Block[]
    getCode(): string
}

export type CodeEditorWorkspace = string