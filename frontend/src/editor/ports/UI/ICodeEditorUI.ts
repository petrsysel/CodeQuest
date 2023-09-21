type CodeEditorUIEvents = "code-change"
type CodeEditorUIData = unknown

interface ICodeEditorUI{
    loadWorkspace(workspace:CodeEditorWorkspace):boolean
    getWorkspace():CodeEditorWorkspace
    on(event: CodeEditorUIEvents, callback: (data: CodeEditorUIData) => void): void
}

type CodeEditorWorkspace = string