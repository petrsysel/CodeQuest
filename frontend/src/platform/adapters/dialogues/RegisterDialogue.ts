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
        this.labelElement.innerHTML = "Registrace"
        this.okBtnElement.innerHTML = "Registrovat se"

        this.usernameElement = DomHelper.get('platform-register-username') as HTMLInputElement
        this.fullnameElement = DomHelper.get('platform-register-fullname') as HTMLInputElement
        this.emailElement = DomHelper.get('platform-register-email') as HTMLInputElement
        this.passwordElement = DomHelper.get('platform-register-password') as HTMLInputElement
        this.passwordAgainElement = DomHelper.get('platform-register-password-again') as HTMLInputElement
    }

    show(errorMsg?: string | undefined, preFill?: RegisterData | undefined): Promise<RegisterData | undefined> {
        this.showUp()
        this.hideError()
        if(errorMsg) this.showError(errorMsg)

        if(preFill){
            this.usernameElement.value = preFill.username
            this.fullnameElement.value = preFill.fullname
            this.emailElement.value = preFill.email
            this.passwordElement.value = preFill.password
            this.passwordAgainElement.value = preFill.passwordAgain
        }
        else{
            this.usernameElement.value = ""
            this.fullnameElement.value = ""
            this.emailElement.value = ""
            this.passwordElement.value = ""
            this.passwordAgainElement.value = ""
        }

        return new Promise((resolve, reject) => {
            this.closeBtnElement.onclick = () => {
                this.hide()
                resolve(undefined)
            }
            this.okBtnElement.onclick = () => {
                resolve({
                    username: this.usernameElement.value,
                    fullname: this.fullnameElement.value,
                    email:  this.emailElement.value,
                    password: this.passwordElement.value,
                    passwordAgain: this.passwordAgainElement.value
                })
                this.hide()
            }
        })
    }

    validate(data: RegisterData): { isValid: boolean; error?: string | undefined; } {
        function containsUppercase(s: string){
            return s.split('').some(ch => ch == ch.toUpperCase())
        }
        function containsNumbers(s: string) {
            return /[0-9]/.test(s);
        }
        if(!data.email || !data.username || !data.password || !data.passwordAgain){
            return{
                isValid: false,
                error: "Nejsou vyplněna všechna povinná pole"
            }
        }
        if(data.username.length < 4)return {
            isValid: false,
            error: "Uživatelské jméno musí obsahovat alespoň 4 znaky"
        }
        if(data.email.split('@').length != 2) return {
            isValid: false,
            error: "Neplatný email"
        }
        if(data.password.length < 8)return {
            isValid: false,
            error: "Heslo musí obsahovat alespoň 8 znaků"
        }
        if(!containsUppercase(data.password))return {
            isValid: false,
            error: "Heslo musí obsahovat alespoň jedno velké písmeno"
        }
        if(!containsNumbers(data.password))return {
            isValid: false,
            error: "Heslo musí obsahovat alespoň jedno číslo"
        }
        if(data.password !== data.passwordAgain) return {
            isValid: false,
            error: "Hesla se musí shodovat"
        }
        else return {
            isValid: true
        }
    }
}