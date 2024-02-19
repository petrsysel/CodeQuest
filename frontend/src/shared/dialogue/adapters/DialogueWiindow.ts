import { DomHelper } from "easybox";
import { IDialogue } from "../core/IDialogue";
import { dialogueWindowTmpl } from "./dialogueWindow.tmpl";

export abstract class DialogueWindow<T> implements IDialogue<T>{
    protected windowElement: HTMLElement
    protected bodyElement: HTMLElement
    protected okBtnElement: HTMLElement
    protected closeBtnElement: HTMLElement
    protected labelElement: HTMLElement
    protected errorElement: HTMLElement

    constructor(){
        this.windowElement = DomHelper.makeDiv()
        this.windowElement.appendChild(dialogueWindowTmpl)
        DomHelper.appentToBody(this.windowElement)

        this.bodyElement = this.windowElement.getElementsByClassName('dialogue-body').item(0)! as HTMLElement
        this.okBtnElement = this.windowElement.getElementsByClassName('dialogue-ok-btn').item(0)! as HTMLElement
        this.closeBtnElement = this.windowElement.getElementsByClassName('dialogue-close-btn').item(0)! as HTMLElement
        this.labelElement = this.windowElement.getElementsByClassName('window-label').item(0)! as HTMLElement
        this.errorElement = this.windowElement.getElementsByClassName('error-baner').item(0)! as HTMLElement

        this.hideError()
        this.hide()
    }

    show(errorMsg?: string): Promise<T | undefined> {
        this.showUp()
        return new Promise((resolve, reject) => {
            reject('Not implemented yet...')
        })
    }

    protected showUp(){
        this.windowElement.style.display = 'block'
    }

    protected hide(){
        this.windowElement.style.display = 'none'
    }

    protected showError(error: string){
        this.errorElement.style.display = 'block'
        this.errorElement.innerHTML = error
    }
    protected hideError(){
        this.errorElement.style.display = 'none'
        this.errorElement.innerHTML = ''
    }
}