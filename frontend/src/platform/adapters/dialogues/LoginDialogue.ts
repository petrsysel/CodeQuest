import { DomHelper } from "easybox";
import { IDialogue } from "../../../shared/dialogue/core/IDialogue";
import { DialogueWindow } from "../../../shared/dialogue/adapters/DialogueWiindow";
import { LoginData } from "../../core/IServerAPI";
import { loginFormTmpl } from "./loginForm.tmpl";

export class LoginDialogue extends DialogueWindow<LoginData>{
    usernameElement: HTMLInputElement
    passwordElement: HTMLInputElement

    constructor(){
        super()
        this.bodyElement.appendChild(loginFormTmpl)
        this.labelElement.innerHTML = "Přihlášení"
        this.okBtnElement.innerHTML = "Přihlásit se"

        this.usernameElement = DomHelper.get('platform-login-username') as HTMLInputElement
        this.passwordElement = DomHelper.get('platform-login-password') as HTMLInputElement
    }

    show(errorMsg?: string): Promise<LoginData | undefined> {
        this.hideError()
        if(errorMsg) this.showError(errorMsg)
        this.showUp()
        this.usernameElement.value = ''
        this.passwordElement.value = ''
        return new Promise((resolve, reject) => {
            this.closeBtnElement.onclick = () => {
                this.hide()
                resolve(undefined)
            }
            this.okBtnElement.onclick = () => {
                resolve({
                    username: this.usernameElement.value,
                    password: this.passwordElement.value
                })
            }
        })
    }
}