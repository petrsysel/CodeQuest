export type SidebarOptions = {
    loggedUser: boolean
}
export type SidebarEvent = 'public-puzzles-request' | 'private-puzzles-request'
export interface ISidebar{
    render(options: SidebarOptions): void
    on(event: SidebarEvent, callback: () => void): void
}