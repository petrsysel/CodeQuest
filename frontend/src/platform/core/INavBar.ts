import { User } from "./User"

export type NavBarEvent = 'log-in-request' | 'register-request' | 'log-out-request'
export type NavBarOptions = {
    loggedUser: boolean,
    user?: User
}
export interface INavBar {
    on(event: NavBarEvent, callback: () => void): void
    render(options: NavBarOptions): void
}