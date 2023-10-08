type CodeEditorUIEvents = "code-change"
type CodeEditorUIData = CodeEditorWorkspace

interface ICodeEditorUI{
    loadWorkspace(workspace:CodeEditorWorkspace):boolean
    getWorkspace():CodeEditorWorkspace
    on(event: CodeEditorUIEvents, callback: (data: CodeEditorUIData) => void): void
    clearWorkspace():void
    getBlocks(): Block[]
    getCode(): string
}

type CodeEditorWorkspace = string