const controlPanelTemplate = /*html*/`
	<div>
	<span id="control-panel-puzzle-name">Název úlohy</span>
	</div>
	<div class="control-panel-controls">
	<a href="javascript:void(0)" id="puzzle-settings-button-element"><img src="/frontend/images/icons/cq-settings.png"></a>
	<a href="javascript:void(0)" id="try-puzzle-button-element"><img src="/frontend/images/icons/cq-play.png"></a>
	<a href="javascript:void(0)" id="save-puzzle-button-element"><img src="/frontend/images/icons/cq-save.png"></a>
	<div>
`

class ControlPanel implements IControlPanelUI{
	private _eventBehaviour: EventBehaviour<ControlPanelUIEvents, ControlPanelUIData>

	private _panelElement: HTMLElement

	constructor(){
		this._eventBehaviour = new EventBehaviour()

		this._panelElement = document.getElementById('control-panel') as HTMLElement
		Templater.inject(this._panelElement, controlPanelTemplate)
	}

	private _emit(event: ControlPanelUIEvents, data: ControlPanelUIData){
		this._eventBehaviour.emit(event, data)
	}

	on(event: ControlPanelUIEvents, callback: (data: unknown) => void): void {
		this._eventBehaviour.on(event, callback)
	}

	render(settins: PuzzleSettings): void {
		
	}
}