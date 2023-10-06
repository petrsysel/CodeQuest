class GameObjectList implements IObjectPanelUI{
	private _listElement: HTMLElement

	constructor(destination: string){
		this._listElement = document.getElementById(destination) as HTMLElement
	}

	setSelected(objectId: string): void {
		
	}

	render(objects: PuzzleObject[]): void {
		
	}
	
	on(event: ObjectPanelUIEvents, callback: (data: ObjectPanelUIData) => void): void {
		
	}
}