export type PuzzleListMode = "public" | "custom"
export type SidebarOptions = {
    loggedUser: boolean,
    renderMode: PuzzleListMode
}
export type SidebarEvent = 'public-puzzles-request' | 'custom-puzzles-request' | 'insert-code-request'
export interface ISidebar{
    render(options: SidebarOptions): void
    on(event: SidebarEvent, callback: () => void): void
}