type SynchroAction = {
	actor: GameActor,
	action: () => void,
	onFinished: (result: any) => void
}

class ObjectSynchronizer implements IObjectSynchronizer{
	private _actors: GameActor[]
	private _registeredActions: SynchroAction[]
	private _registrationTimeout: number
	private _timeoutHandle: number
	private _eventBehaviour: EventBehaviour<'round-end', null>

	constructor(actors: GameActor[]){
		this._actors = actors
		this._registeredActions = []
		this._registrationTimeout = 50 // To je moc!
		this._timeoutHandle = -1
		this._eventBehaviour = new EventBehaviour()
	}

	registerAction(actor: GameActor, action: () => void, onFinished: (resutl: any) => void): void {
		clearTimeout(this._timeoutHandle)
		this._timeoutHandle = setTimeout(this._onTimeout.bind(this), this._registrationTimeout)
		this._registeredActions.push({
			actor: actor,
			action: action,
			onFinished: onFinished
		})
		this._checkActions()
	}
	on(event: 'round-end', callback: () => void){
		this._eventBehaviour.on(event, callback)
	}

	private _emit(event:'round-end'){
		this._eventBehaviour.emit(event, null)
	}

	private _onTimeout(){
		let noActionActors = this._actors.filter(a => !this._registeredActions.some(ra => ra.actor.getObject().id == a.getObject().id))
		noActionActors.forEach(a => {
			a.putToSleep()
			console.log('putting to sleep: ' + a.getObject().settings.name)
		})
		this._checkActions()
	}

	private _checkActions(){
		let awakeActors = this._actors.filter(a => !a.isSleeping())
		let allRegistered = awakeActors.every(a => this._registeredActions.some(ra => ra.actor.getObject().id == a.getObject().id))

		if(allRegistered){
			this._doActions()
		}
	}

	private _doActions(){
		console.log("KONEC KOLA")
		this._registeredActions.forEach(a => {
			a.action()
		})
		this._registeredActions.forEach(a => a.onFinished("done"))

		clearTimeout(this._timeoutHandle)
		this._registeredActions = []
		this._emit('round-end')
	}
}