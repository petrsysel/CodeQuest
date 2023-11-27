class GameMessageManager{
	private _messages: string[]

	constructor(){
		this._messages = []
	}

	addMessage(message: string){
		this._messages.push(message)
	}
	clear(){
		this._messages = []
	}
	contain(message: string){
		return this._messages.includes(message)
	}
}