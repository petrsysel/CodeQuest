import { Templater } from "../../templater/Templater"
import { DialogueResponse } from "../core/DialogueResponse"
import { INotificationUI } from "../ports/INotificationUI"

export const messageTemplate = /*html*/`
	<div class="notif-bg">
		<div class="notif-window">
			<div class="notif-header">
				<a hfref="javascript:void(0)"  id="notif-close-button"><img src="/images/icons/cq-close.png"></a>
			</div>
			<div class="notif-color"></div>
			<div class="notif-message-container">
				<p id="notif-placeholder"><p>
			</div>
			<div class="notif-color"></div>
			<div class="notif-button-container">
				<button class="notif-button" id="notif-button-ok">OK</button>
				<button class="notif-button" id="notif-button-yes">Ano</button>
				<button class="notif-button" id="notif-button-no">Ne</button>
				<button class="notif-button" id="notif-button-cancel">Zrušit</button>
			</div>
		</div>
	</div>
`
export class NotificationUI implements INotificationUI{
	private _windowElement: HTMLElement
	private _messagePlaceholder: HTMLElement
	private _buttonYes: HTMLButtonElement
	private _buttonNo: HTMLButtonElement
	private _buttonCancel: HTMLButtonElement
	private _buttonOk: HTMLButtonElement
	private _buttonClose: HTMLAnchorElement

	constructor(){
		const bodyElement = document.getElementsByTagName("body")[0]
		this._windowElement = document.createElement('div')
		bodyElement.appendChild(this._windowElement)

		this._hide()

		Templater.inject(this._windowElement, messageTemplate)

		this._messagePlaceholder = document.getElementById("notif-placeholder") as HTMLElement
		this._buttonYes = document.getElementById("notif-button-yes") as HTMLButtonElement
		this._buttonNo = document.getElementById("notif-button-no") as HTMLButtonElement
		this._buttonCancel = document.getElementById("notif-button-cancel") as HTMLButtonElement
		this._buttonOk = document.getElementById("notif-button-ok") as HTMLButtonElement
		this._buttonClose = document.getElementById("notif-close-button") as HTMLAnchorElement
	}

	notify(message: string, options?: NotificationOptions): Promise<void> {
		return new Promise((resolve, reject) => {
			this._show()
			this._displayMessage(message)
			this._showOkButton(() => {
				this._hide()
				resolve()
			})
		})
	}
	dialogue(message: string, options?: NotificationOptions): Promise<DialogueResponse> {
		return new Promise((resolve, reject) => {
			
		})
	}

	private _show(){
		this._windowElement.style.display = "block"
	}
	private _hide(){
		this._windowElement.style.display = "none"
	}

	private _showOkButton(callback: () => void){
		this._buttonYes.style.display="none"
		this._buttonNo.style.display="none"
		this._buttonCancel.style.display="none"
		this._buttonOk.style.display="block"

		this._buttonOk.addEventListener("click", callback)
		this._buttonClose.addEventListener("click", callback)
	}
	private _showYesNoButton(){
		this._buttonYes.style.display="block"
		this._buttonNo.style.display="block"
		this._buttonCancel.style.display="none"
		this._buttonOk.style.display="none"
	}
	private _displayMessage(message: string){
		this._messagePlaceholder.innerHTML = message
	}
}