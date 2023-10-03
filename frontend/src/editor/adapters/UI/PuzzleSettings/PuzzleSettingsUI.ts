const puzzleSettingsTemplate = /*html*/`
<div id="puzzle-settings-window-element" class="costume-picker-window">
    <div class="costume-picker-panel">
        <div class="costume-picker-control-bar">
            <div class="costume-picker-control-bar-item costume-picker-label">
                <span>
                    Nastavení úlohy
                </span>
            </div>
            
            <div class="costume-picker-control-bar-item costume-picker-close">
                <a hfref="javascript:void(0)"  id="puzzle-settings-close-button"><img src="/frontend/images/icons/cq-close.png"></a>
            </div>
        </div>
        <div class="puzzle-settings-container" id="puzzle-settings-container">
			<div class="puzzle-settings-fields">
				<table>
					<tr>
						<td>Název úlohy: </td>
						<td><input type="text" id="puzzle-settings-puzzle-name"></td>
					</tr>
					<tr>
						<td>Velikost hracího pole: </td>
						<td><input type="number" id="puzzle-settings-board-size"></td>
					</tr>
				</table>
			</div>
				
			<div class="puzzle-settings-blocks">
				<span>Bloky povolené v úloze</span>
				<table></table>
			</div>
        </div>
    </div>
</div>
`

class PuzzleSettingsUI implements IPuzzleSettingsUI {
    private _windowElement: HTMLElement
    private _closeButton: HTMLAnchorElement

    private _eventBehaviour: EventBehaviour<PuzzleSettingsEvent, PuzzleSettingsData>

	private _puzzleNameElement: HTMLInputElement
	private _boardSizeElement: HTMLInputElement

    constructor(){
        this._eventBehaviour = new EventBehaviour()

        let body = document.getElementsByTagName('body')[0]
        let placeHolder = document.createElement('div')
        placeHolder.id = "puzzle-settings-place-holder"
        body.appendChild(placeHolder)

        Templater.inject( "puzzle-settings-place-holder", puzzleSettingsTemplate)

        this._windowElement = document.getElementById("puzzle-settings-window-element") as HTMLElement
        this._closeButton = document.getElementById("puzzle-settings-close-button") as HTMLAnchorElement

        this._closeButton.addEventListener('click', this._close.bind(this))

		this._puzzleNameElement = document.getElementById('puzzle-settings-puzzle-name') as HTMLInputElement
		this._boardSizeElement = document.getElementById('puzzle-settings-board-size') as HTMLInputElement

		this._puzzleNameElement.addEventListener('change', this._onSettingsChange.bind(this))
		this._boardSizeElement.addEventListener('change', this._onSettingsChange.bind(this))

		this._puzzleNameElement.addEventListener('keyup', (() => {
			let limit = 50
			if(this._puzzleNameElement.value.length){
				this._puzzleNameElement.value = this._puzzleNameElement.value.substring(0, limit)
			}
		}).bind(this))

        this._close()
    }
    render(puzzle: PuzzleSettings, blocks: Block[]): void {
		this._open()
        this._puzzleNameElement.value = puzzle.name
		this._boardSizeElement.value = puzzle.sideWidth.toString()
	}

    private _selectionHandler(costume: CostumeData){
        this._close()
        // this._emit('costume-pick', costume)
    }

	private _onSettingsChange(){
		let settings: PuzzleSettings = {
			name: this._puzzleNameElement.value,
			sideWidth: +this._boardSizeElement.value,
			blocks: []
		}
		this._emit('settings-changed', settings)
	}

    private _close(){
        this._windowElement.style.display = "none"
    }
    private _open(){
        this._windowElement.style.display = "block"
    }

    private _emit(event: PuzzleSettingsEvent, data: PuzzleSettingsData){
        this._eventBehaviour.emit(event, data)
    }

    on(event: PuzzleSettingsEvent, callback: (data: PuzzleSettingsData) => void): void {
		this._eventBehaviour.on(event, callback)
	}
}

