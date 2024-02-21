import { Signal } from "easybox";
import { IPuzzleListUI, PuzzleListData, PuzzleListEvent } from "../../core/IPuzzleListUI";
import { StoredPuzzleInfo } from "../../core/IServerAPI";

export class PuzzleListUI implements IPuzzleListUI{
	private signal: Signal<PuzzleListEvent, PuzzleListData>

	constructor(){
		this.signal = new Signal()
	}
	
	on(event: PuzzleListEvent, callback: (data: PuzzleListData) => void): void {
		this.signal.on(event, callback)
	}
	render(puzzleList: StoredPuzzleInfo[]): void {
		
	}
}