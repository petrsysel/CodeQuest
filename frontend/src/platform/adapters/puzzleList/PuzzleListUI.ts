import { DomHelper, Signal } from "easybox";
import { IPuzzleListUI, PuzzleListData, PuzzleListEvent, PuzzleListOptions } from "../../core/IPuzzleListUI";
import { StoredPuzzleInfo } from "../../core/IServerAPI";
import { puzzleListTmpl } from "./puzzleList.tmpl";

export class PuzzleListUI implements IPuzzleListUI{
	private signal: Signal<PuzzleListEvent, PuzzleListData>
	private listElement: HTMLElement

	private createNewButton: HTMLElement
	private theresNothing: HTMLElement
	private itemTemplate: HTMLElement
	private loadMoreButton: HTMLElement
	private puzzleListContainer: HTMLElement
	private searchButton: HTMLElement
	private searchBar: HTMLInputElement

	constructor(location: string){
		this.signal = new Signal()

		this.listElement = DomHelper.get(location)!
		this.listElement.appendChild(puzzleListTmpl)

		this.createNewButton = this.listElement.getElementsByClassName('puzzle-list-create-btn')[0] as HTMLElement
		this.theresNothing = this.listElement.getElementsByClassName('puzzle-list-empty-label')[0] as HTMLElement
		this.itemTemplate = this.listElement.getElementsByClassName('puzzle-list-item')[0] as HTMLElement
		this.puzzleListContainer = this.listElement.getElementsByClassName('puzzle-list-list-container')[0] as HTMLElement
		this.loadMoreButton = this.listElement.getElementsByClassName('puzzle-list-load-more-btn')[0] as HTMLElement

		this.searchBar = this.listElement.getElementsByClassName('puzzle-list-search')[0] as HTMLInputElement
		this.searchButton = this.listElement.getElementsByClassName('puzzle-list-search-btn')[0] as HTMLElement
		

		this.itemTemplate.style.display = "none"

		this.createNewButton.addEventListener('click', () => {
			this.signal.emit('create-puzzle-request', {})
		})

		
	}
	
	on(event: PuzzleListEvent, callback: (data: PuzzleListData) => void): void {
		this.signal.on(event, callback)
	}
	render(puzzleList: StoredPuzzleInfo[], options: PuzzleListOptions): void {
		this.loadMoreButton.onclick = () => {
			this.signal.emit('load-more', {
				mode: options.mode
			})
		}
		this.searchButton.onclick = () => {
			this.signal.emit('search-request', {
				mode: options.mode,
				query: this.searchBar.value
			})
		}
		if(options.mode === "public"){
			this.createNewButton.style.display = "none"
		}
		else{
			this.createNewButton.style.display = "block"
		}

		if(puzzleList.length == 0){
			this.theresNothing.style.display = "block"
			this.loadMoreButton.style.display = "none"
		}
		else{
			this.theresNothing.style.display = "none"
			this.loadMoreButton.style.display = "block"
		}

		if(options.limit > puzzleList.length) this.loadMoreButton.style.display = "none"

		if(!options.append) this.puzzleListContainer.innerHTML = ""
		puzzleList.forEach(puzzle => {
			const newPuzzleElement = this.itemTemplate.cloneNode(true) as HTMLElement
			newPuzzleElement.style.display = "flex"
			
			const name = newPuzzleElement.getElementsByClassName('puzzle-list-item-name')[0] as HTMLElement
			name.innerHTML = puzzle.name

			const author = newPuzzleElement.getElementsByClassName('puzzle-list-item-author')[0] as HTMLElement
			author.innerHTML = `Autor: ${puzzle.author}`

			const code = newPuzzleElement.getElementsByClassName('puzzle-list-item-code')[0] as HTMLElement
			code.innerHTML = puzzle.code ? `Kód: ${puzzle.code}`: ''

			const edit = newPuzzleElement.getElementsByClassName('puzzle-list-item-edit')[0] as HTMLElement
			edit.addEventListener('click', () => {
				this.signal.emit('edit-request', {
					puzzleId: puzzle.id,
				})
			})

			const play = newPuzzleElement.getElementsByClassName('puzzle-list-item-play')[0] as HTMLElement
			play.addEventListener('click', () => {
				this.signal.emit('play-puzzle', {
					puzzleId: puzzle.id,
				})
			})

			const duplicate = newPuzzleElement.getElementsByClassName('puzzle-list-item-duplicate')[0] as HTMLElement
			duplicate.addEventListener('click', () => {
				this.signal.emit('duplicate-puzzle', {
					puzzleId: puzzle.id,
				})
			})
			const publish = newPuzzleElement.getElementsByClassName('puzzle-list-item-publish')[0] as HTMLElement
			publish.addEventListener('click', () => {
				this.signal.emit('publish-request', {
					puzzleId: puzzle.id,
				})
			})
			const unpublish = newPuzzleElement.getElementsByClassName('puzzle-list-item-unpublish')[0] as HTMLElement
			unpublish.addEventListener('click', () => {
				this.signal.emit('unpublish-request', {
					puzzleId: puzzle.id,
				})
			})
			const remove = newPuzzleElement.getElementsByClassName('puzzle-list-item-delete')[0] as HTMLElement
			remove.addEventListener('click', () => {
				this.signal.emit('remove-puzzle', {
					puzzleId: puzzle.id,
				})
			})
			const previewImage = newPuzzleElement.getElementsByClassName('puzzle-list-preview-img')
			[0].getElementsByTagName("img")[0] as HTMLImageElement
			previewImage.src = puzzle.img

			

			if(puzzle.code){
				unpublish.style.display = "block"
				publish.style.display = "none"
			}
			else {
				publish.style.display = "block"
				unpublish.style.display = "none"
			}

			if(options.mode === "public"){
				remove.style.display = "none"
				edit.style.display = "none"
				publish.style.display = "none"
				unpublish.style.display = "none"

				if(!options.loggedUser){
					duplicate.style.display = "none"
				}
			}

			this.puzzleListContainer.appendChild(newPuzzleElement)
		})
	}
}