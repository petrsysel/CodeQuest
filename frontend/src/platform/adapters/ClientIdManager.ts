import { ClientID } from "../core/ClientID";
import { IClientIdManager } from "../core/IClientIdManager";
import { v4 as uuidv4 } from 'uuid';

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
			localStorage.setItem(this.key, uuidv4())
			this.init()
		}
	}

	get(){
		return this.id!
	}
}