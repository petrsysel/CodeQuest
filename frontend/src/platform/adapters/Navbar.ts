import { Ajax, DomHelper, Signal } from "easybox";
import { INavBar, NavBarEvent, NavBarOptions } from "../core/INavBar";
import { navbar } from "../templates/navbar.tmpl";
import { User } from "../core/User";

export class Navbar implements INavBar {
    private navbarElement: HTMLElement
    private signal: Signal<NavBarEvent, null>

    private userBar: HTMLElement
    private guestBar: HTMLElement
    private usernameLabel: HTMLElement

    private loginButton: HTMLElement
    private logoutButton: HTMLElement
    private registerButton: HTMLElement
    
    constructor(location: string){
        this.signal = new Signal()

        this.navbarElement = DomHelper.get(location)!
        this.navbarElement.appendChild(navbar)
        
        this.userBar = DomHelper.get('platform-user-bar')!
        this.guestBar = DomHelper.get('platform-guest-bar')!
        this.usernameLabel = DomHelper.get('platform-user-name')!

        this.loginButton = DomHelper.get('platform-log-in-btn')!
        this.logoutButton = DomHelper.get('platform-log-out-btn')!
        this.registerButton = DomHelper.get('platform-register-btn')!

        this.loginButton.addEventListener('click', () => {
            this.signal.emit('log-in-request', null)
        })

        this.logoutButton.addEventListener('click', () => {
            this.signal.emit('log-out-request', null)
        })

        this.registerButton.addEventListener('click', () => {
            this.signal.emit('register-request', null)
        })
    }

    on(event: NavBarEvent, callback: () => void): void {
        this.signal.on(event, callback)
    }

    render(options: NavBarOptions): void {
        if(options.user) this.showUserBar(options.user)
        else this.showGuestBar()
    }

    private showUserBar(user: User){
        this.userBar.style.display = 'flex'
        this.guestBar.style.display = 'none'
        this.usernameLabel.innerHTML = user.fullname
    }
    private showGuestBar(){
        this.userBar.style.display = 'none'
        this.guestBar.style.display = 'flex'
    }
}