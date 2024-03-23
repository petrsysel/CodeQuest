import { DomHelper, Signal } from "easybox"
import { IObjectPanelUI, ObjectPanelUIData, ObjectPanelUIEvents } from "../../../../editor/ports/UI/IObjectPanelUI"
import { PuzzleObject, PuzzleObjectId } from "../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Templater } from "../../../../shared/templater/Templater"

export const gameObjectListTemplate = /*html*/`
	<div class="game-object-list-wrapper">	
		<div class="game-object-list-container" id="game-object-list-container">
		</div>
	</div>
`

export class GameObjectList implements IObjectPanelUI{
	private _listElement: HTMLElement
	private _listContainerElement: HTMLElement
	private gameObjectListElement: HTMLElement
	private signal: Signal<ObjectPanelUIEvents, ObjectPanelUIData>

	private selectedId: PuzzleObjectId | undefined

	constructor(destination: string){
		this.signal = new Signal()
		this._listElement = document.getElementById(destination) as HTMLElement
		Templater.inject(this._listElement, gameObjectListTemplate)

		this._listContainerElement = document.getElementById('game-object-list-container') as HTMLElement
		this.gameObjectListElement = document.getElementById('game-object-list') as HTMLElement
	}

	setSelected(objectId: string): void {
		this.selectedId = objectId
	}

	render(objects: PuzzleObject[]): void {
		// if(objects.length < 2) this.gameObjectListElement.style.height = "0px"
		// else this.gameObjectListElement.style.display = "block"
		this._listContainerElement.innerHTML = ""
		let gameObjects = objects.filter(o => o.settings.playerEdit)
		const selectedClass = "game-selected-object"
		
		gameObjects.forEach(object => {
			
			const imgElement = DomHelper.make('img') as HTMLImageElement
			imgElement.src = object.settings.costume.path
			if(object.id === this.selectedId) imgElement.classList.add(selectedClass)
			imgElement.addEventListener('click', () => {
				this.signal.emit('object-selected', {
					id: object.id
				})
			})
			this._listContainerElement.appendChild(imgElement)
		})
	}
	
	on(event: ObjectPanelUIEvents, callback: (data: ObjectPanelUIData) => void): void {
		this.signal.on(event, callback)
	}
}