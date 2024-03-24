import { DomHelper } from "easybox";
import { DialogueWindow } from "../../../shared/dialogue/adapters/DialogueWiindow";
import { insertCodeFormTmpl } from "./insertCodeForm.tmpl";

export class InsetCodeDialogue extends DialogueWindow<string>{
    private codeInputElement: HTMLInputElement
    constructor(){
        super()
        this.bodyElement.appendChild(insertCodeFormTmpl)
        this.labelElement.innerHTML = "Vložit kód úlohy"
        this.okBtnElement.innerHTML = "Zobrazit úlohu"

        this.codeInputElement = DomHelper.get('platform-insert-code') as HTMLInputElement
    }

    show(errorMsg?: string | undefined, preFill?: string | undefined): Promise<string | undefined> {
        this.showUp()
        if(errorMsg) this.showError(errorMsg)
        else this.hideError()

        if(preFill){
            this.codeInputElement.value = preFill
        }
        else{
            this.codeInputElement.value = ''
        }

        return new Promise((resolve, reject) => {
            this.closeBtnElement.onclick = () => {
                this.hide()
                resolve(undefined)
            }
            this.okBtnElement.onclick = () => {
                resolve(this.codeInputElement.value)
                this.hide()
            }
        })
    }
}