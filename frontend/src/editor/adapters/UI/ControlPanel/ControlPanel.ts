const controlPanelTemplate = /*html*/`
	<div class="control-panel-puzzle-name-container">
	<div id="control-panel-puzzle-name">Název úlohy</div>
	</div>
	<div class="control-panel-controls">
	<a href="javascript:void(0)" id="puzzle-settings-button-element"><img src="/frontend/images/icons/cq-settings.png"></a>
	<a href="javascript:void(0)" id="try-puzzle-button-element"><img src="/frontend/images/icons/cq-play.png"></a>
	<a href="javascript:void(0)" id="save-puzzle-button-element"><img src="/frontend/images/icons/cq-save.png"></a>
	<div>
`

class ControlPanelUI implements IControlPanelUI{
	private _eventBehaviour: EventBehaviour<ControlPanelUIEvents, ControlPanelUIData>

	private _panelElement: HTMLElement

	private _settingsButton: HTMLElement

	private _puzzleNameElement: HTMLElement

	constructor(destination: string){
		this._eventBehaviour = new EventBehaviour()

		this._panelElement = document.getElementById(destination) as HTMLElement
		Templater.inject(this._panelElement, controlPanelTemplate)

		this._settingsButton = document.getElementById('puzzle-settings-button-element') as HTMLElement
		this._puzzleNameElement = document.getElementById('control-panel-puzzle-name') as HTMLElement

		this._settingsButton.addEventListener('click', () => {
			this._emit('puzzle-settings-request', null)
		})
	}

	private _emit(event: ControlPanelUIEvents, data: ControlPanelUIData){
		this._eventBehaviour.emit(event, data)
	}

	on(event: ControlPanelUIEvents, callback: (data: unknown) => void): void {
		this._eventBehaviour.on(event, callback)
	}

	render(settins: PuzzleSettings): void {
		this._puzzleNameElement.innerHTML = settins.name
	}
}