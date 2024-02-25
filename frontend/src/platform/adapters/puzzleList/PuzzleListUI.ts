import { DomHelper, Signal } from "easybox";
import { IPuzzleListUI, PuzzleListData, PuzzleListEvent } from "../../core/IPuzzleListUI";
import { StoredPuzzleInfo } from "../../core/IServerAPI";
import { puzzleListTmpl } from "./puzzleList.tmpl";

export class PuzzleListUI implements IPuzzleListUI{
	private signal: Signal<PuzzleListEvent, PuzzleListData>
	private listElement: HTMLElement

	constructor(location: string){
		this.signal = new Signal()

		this.listElement = DomHelper.get(location)!
		this.listElement.appendChild(puzzleListTmpl)
	}
	
	on(event: PuzzleListEvent, callback: (data: PuzzleListData) => void): void {
		this.signal.on(event, callback)
	}
	render(puzzleList: StoredPuzzleInfo[]): void {
		
	}
}