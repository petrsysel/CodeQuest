export type SidebarOptions = {
    loggedUser: boolean
}
export type SidebarEvent = 'public-puzzles-request' | 'custom-puzzles-request' | 'insert-code-request'
export interface ISidebar{
    render(options: SidebarOptions): void
    on(event: SidebarEvent, callback: () => void): void
}