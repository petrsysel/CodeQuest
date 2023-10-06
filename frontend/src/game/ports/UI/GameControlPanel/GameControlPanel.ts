const gameControlPanelTemplate = /*html*/`
<div class="control-panel-puzzle-name-container">
	<div id="control-panel-puzzle-name">Název úlohy</div>
	</div>
<div class="control-panel-controls">
	<a href="javascript:void(0)" id="try-puzzle-button-element"><img src="/frontend/images/icons/cq-play.png"></a>
<div>
`

class GameControlPanel implements IControlPanelUI{
	private _panelElement: HTMLElement

	constructor(destination: string){
		this._panelElement = document.getElementById(destination) as HTMLElement

		Templater.inject(this._panelElement, gameControlPanelTemplate)
	}

	on(event: ControlPanelUIEvents, callback: (data: unknown) => void): void {
		
	}
	render(settins: PuzzleSettings): void {
		
	}
}