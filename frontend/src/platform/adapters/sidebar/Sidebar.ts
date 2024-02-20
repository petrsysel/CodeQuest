import { DomHelper, Signal } from "easybox";
import { ISidebar, SidebarEvent, SidebarOptions } from "../../core/ISidebar";
import { sidebar } from "./sidebar.tmpl";

export class Sidebar implements ISidebar{
    private signal: Signal<SidebarEvent, null>

    private sidebarElement: HTMLElement
    private insertCodeElement: HTMLElement
    private publicPuzzlesElement: HTMLElement
    private customPuzzlesElement: HTMLElement
    

    constructor(location: string){
        this.signal = new Signal()

        this.sidebarElement = DomHelper.get(location)!
        this.sidebarElement.appendChild(sidebar)

        this.insertCodeElement = DomHelper.get('platform-sidebar-insert-code')!
        this.publicPuzzlesElement = DomHelper.get('platform-sidebar-public-puzzles')!
        this.customPuzzlesElement = DomHelper.get('platform-sidebar-custom-puzzles')!

        this.insertCodeElement.addEventListener('click', () => {
            this.signal.emit('insert-code-request', null)
        })
        this.publicPuzzlesElement.addEventListener('click', () => {
            this.signal.emit('public-puzzles-request', null)
        })
        this.customPuzzlesElement.addEventListener('click', () => {
            this.signal.emit('custom-puzzles-request', null)
        })
    }

    on(event: SidebarEvent, callback: () => void): void {
        this.signal.on(event, callback)
    }
    render(options: SidebarOptions): void {
        if(options.loggedUser) this.renderUser()
        else this.renderGuest()
    }

    private renderGuest(){
        this.customPuzzlesElement.style.display = 'none'
    }
    private renderUser(){
        this.customPuzzlesElement.style.display = 'block'
    }
}