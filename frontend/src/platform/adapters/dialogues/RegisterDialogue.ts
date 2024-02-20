import { DomHelper } from "easybox";
import { DialogueWindow } from "../../../shared/dialogue/adapters/DialogueWiindow";
import { RegisterData } from "../../core/IServerAPI";
import { registerFormTmpl } from "./registerForm.tmpl";

export class RegisterDialogue extends DialogueWindow<RegisterData>{
    private usernameElement: HTMLInputElement
    private fullnameElement: HTMLInputElement
    private emailElement: HTMLInputElement
    private passwordElement: HTMLInputElement
    private passwordAgainElement: HTMLInputElement

    constructor(){
        super()
        this.bodyElement.appendChild(registerFormTmpl)
        this.labelElement.innerHTML = "Reggistrace"
        this.okBtnElement.innerHTML = "Registrovat se"

        this.usernameElement = DomHelper.get('platform-register-username') as HTMLInputElement
        this.fullnameElement = DomHelper.get('platform-register-fullname') as HTMLInputElement
        this.emailElement = DomHelper.get('platform-register-email') as HTMLInputElement
        this.passwordElement = DomHelper.get('platform-register-password') as HTMLInputElement
        this.passwordAgainElement = DomHelper.get('platform-register-password-again') as HTMLInputElement
    }

    show(errorMsg?: string | undefined): Promise<RegisterData | undefined> {
        this.showUp()
        this.hideError()
        if(errorMsg) this.showError(errorMsg)

        this.usernameElement.value = ""
        this.fullnameElement.value = ""
        this.emailElement.value = ""
        this.passwordElement.value = ""
        this.passwordAgainElement.value = ""

        return new Promise((resolve, reject) => {
            this.closeBtnElement.onclick = () => {
                this.hide()
                resolve(undefined)
            }
            this.okBtnElement.onclick = () => {
                resolve({
                    username: this.usernameElement.value,
                    fullname: this.fullnameElement.value,
                    email:  this.fullnameElement.value,
                    password: this.passwordElement.value,
                    passwordAgain: this.passwordAgainElement.value
                })
                this.hide()
            }
        })
    }
}