import { ClientID } from "../core/ClientID";
import { IClientIdManager } from "../core/IClientIdManager";

export class ClientIdManager implements IClientIdManager{
	private key: string
	private id: string | null
	constructor(){
		this.id = null
		this.key = "cq-client-id"
		this.init()
	}

	private init(){
		this.id = localStorage.getItem(this.key)
		if(!this.id) {
			localStorage.setItem(this.key, crypto.randomUUID())
			this.init()
		}
	}

	get(){
		return this.id!
	}
}