import { DialogueResponse } from "../core/DialogueResponse"

export interface INotificationUI {
	notify(message: string, options?: NotificationOptions): Promise<void>
	dialogue(message: string, options?: NotificationOptions):Promise<DialogueResponse>
}