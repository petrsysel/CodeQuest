export type NavBarEvent = 'log-in-request' | 'register-request' | 'log-out-request'
export type NavBarOptions = {
    loggedUser: boolean
}
export interface INavBar {
    on(event: NavBarEvent, callback: () => void): void
    render(options: NavBarEvent): void
}