const gameObjectListTemplate = /*html*/`
	<div class="game-object-list-wrapper">	
		<div class="game-object-list-container" id="game-object-list-container">
		</div>
	</div>
`

class GameObjectList implements IObjectPanelUI{
	private _listElement: HTMLElement
	private _listContainerElement: HTMLElement

	constructor(destination: string){
		this._listElement = document.getElementById(destination) as HTMLElement
		Templater.inject(this._listElement, gameObjectListTemplate)

		this._listContainerElement = document.getElementById('game-object-list-container') as HTMLElement
	}

	setSelected(objectId: string): void {
		
	}

	render(objects: PuzzleObject[]): void {
		let gameObjects = objects.filter(o => o.settings.playerEdit)
		gameObjects.forEach(object => {
			this._listContainerElement.innerHTML += `<img src="${object.settings.costume.path}">`
		})
	}
	
	on(event: ObjectPanelUIEvents, callback: (data: ObjectPanelUIData) => void): void {
		
	}
}