const gameControlPanelTemplate = /*html*/`
<div class="control-panel-puzzle-name-container">
	<div id="game-control-panel-puzzle-name">Název úlohy</div>
	</div>
<div class="control-panel-controls">
	<a href="javascript:void(0)" id="play-puzzle-button-element"><img src="/frontend/images/icons/cq-play.png"></a>
<div>
`

class GameControlPanel implements IControlPanelUI{
	private _panelElement: HTMLElement
	private _nameElement: HTMLElement
	private _playButton: HTMLAnchorElement

	private _eventBehaviour: EventBehaviour<ControlPanelUIEvents, ControlPanelUIData>

	constructor(destination: string){
		this._panelElement = document.getElementById(destination) as HTMLElement
		this._eventBehaviour = new EventBehaviour()

		Templater.inject(this._panelElement, gameControlPanelTemplate)

		this._nameElement = document.getElementById('game-control-panel-puzzle-name') as HTMLElement
		this._playButton = document.getElementById('play-puzzle-button-element') as HTMLAnchorElement

		this._playButton.addEventListener('click', () => {
			this._emit('play-puzzle', null)
		})
	}

	on(event: ControlPanelUIEvents, callback: (data: unknown) => void): void {
		this._eventBehaviour.on(event, callback)
	}
	render(settins: PuzzleSettings): void {
		this._nameElement.innerHTML = settins.name
	}

	private _emit(event: ControlPanelUIEvents, data: ControlPanelUIData){
		this._eventBehaviour.emit(event, data)
	}
}