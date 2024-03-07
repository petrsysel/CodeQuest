import { ControlPanelUIData, ControlPanelUIEvents, IControlPanelUI } from "../../../../editor/ports/UI/IControlPanelUI"
import { EventBehaviour } from "../../../../shared/EventBehaviour"
import { PuzzleSettings } from "../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Templater } from "../../../../shared/templater/Templater"
import { IVisualizerControlPanel } from "../../../ports/IVisualizerControlPanelUI"

export const gameControlPanelTemplate = /*html*/`
<div class="control-panel-puzzle-name-container">
	<div id="game-control-panel-puzzle-name">Název úlohy</div>
	</div>
<div class="control-panel-controls">
	<a href="javascript:void(0)" id="play-puzzle-button-element"><img src="./images/icons/cq-play.png"></a>
	<a href="javascript:void(0)" id="stop-puzzle-button-element"><img src="./images/icons/cq-stop.png"></a>
	<img id="loading-puzzle-element" src="./images/icons/cq-loading.png">
<div>
`

export class GameControlPanel implements IControlPanelUI, IVisualizerControlPanel{
	private _panelElement: HTMLElement
	private _nameElement: HTMLElement
	private _playButton: HTMLAnchorElement
	private _stopButton: HTMLAnchorElement
	private _loadingImage: HTMLAnchorElement

	private _state: "stoped" | "playing" | "loading"

	private _eventBehaviour: EventBehaviour<ControlPanelUIEvents, ControlPanelUIData>

	constructor(destination: string){
		this._state = "stoped"
		

		this._panelElement = document.getElementById(destination) as HTMLElement
		this._eventBehaviour = new EventBehaviour()

		Templater.inject(this._panelElement, gameControlPanelTemplate)

		this._nameElement = document.getElementById('game-control-panel-puzzle-name') as HTMLElement
		this._playButton = document.getElementById('play-puzzle-button-element') as HTMLAnchorElement
		this._stopButton = document.getElementById('stop-puzzle-button-element') as HTMLAnchorElement
		this._loadingImage = document.getElementById('loading-puzzle-element') as HTMLAnchorElement

		this._playButton.addEventListener('click', () => {
			this._emit('play-puzzle', null)
		})
		this._stopButton.addEventListener('click', () => {
			this._emit('stop-puzzle', null)
		})
		this.setState("stoped")
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

	setState(state: "playing" | "stoped" | "loading"): void {
		this._state = state
		switch(state){
			case "playing":
				this._playButton.style.display="none"
				this._loadingImage.style.display="none"
				this._stopButton.style.display="block"
				break
			case "stoped":
				this._playButton.style.display="block"
				this._loadingImage.style.display="none"
				this._stopButton.style.display="none"
				break
			case "loading":
				this._playButton.style.display="none"
				this._loadingImage.style.display="block"
				this._stopButton.style.display="none"
				break
		}
	}
}