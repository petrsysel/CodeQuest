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
				<div id="puzzle-settings-blocklist"></div>
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
    private _blockList: HTMLElement

    private _enabledBlocks: Block[]

    constructor(){
        this._eventBehaviour = new EventBehaviour()
        this._enabledBlocks = []

        let body = document.getElementsByTagName('body')[0]
        let placeHolder = document.createElement('div')
        placeHolder.id = "puzzle-settings-place-holder"
        body.appendChild(placeHolder)

        Templater.inject( "puzzle-settings-place-holder", puzzleSettingsTemplate)

        this._windowElement = document.getElementById("puzzle-settings-window-element") as HTMLElement
        this._closeButton = document.getElementById("puzzle-settings-close-button") as HTMLAnchorElement
        this._blockList = document.getElementById('puzzle-settings-blocklist') as HTMLElement

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

        let categories:{name:string, blocks:Block[]}[] = []

        blocks.forEach(block => {
            let category = categories.filter(cat => cat.name === block.category)
            if(category[0]){
                category[0].blocks.push(block)
            }
            else{
                categories.push({name: block.category, blocks:[block]})
            }
        })

        let enabled = puzzle.blocks
        
        
        this._blockList.innerHTML = ""

        let allCheckbox = document.createElement('input')
        allCheckbox.type = "checkbox"
        allCheckbox.checked = enabled.length>0
        allCheckbox.addEventListener('click', event => {
            this._enabledBlocks = PuzzleUtils.toggleBlockAll(enabled, blocks)
            this._onSettingsChange()
        })
        let allText = document.createElement('span')
        allText.innerHTML = "Vše/nic"
        let allLabel = document.createElement('label')
        allLabel.appendChild(allCheckbox)
        allLabel.appendChild(allText)
        this._blockList.appendChild(allLabel)
        this._blockList.appendChild(document.createElement('br'))
        
        categories.forEach(category => {
            let categoryList = document.createElement('ul')
            let categoryName = document.createElement('span')
            categoryName.innerHTML = category.name
            let categoryCheckbox = document.createElement('input')
            categoryCheckbox.type = "checkbox"
            categoryCheckbox.addEventListener('click', event => {
                this._enabledBlocks = PuzzleUtils.toggleBlockCategory(enabled, blocks, category.name)
                this._onSettingsChange()
            })
            categoryCheckbox.checked = enabled.some(b => b.category == category.name)
            let categoryLabel = document.createElement('label')
            categoryLabel.appendChild(categoryCheckbox)
            categoryLabel.appendChild(categoryName)
            this._blockList.appendChild(categoryLabel)
            category.blocks.forEach(block => {
                let categoryItem = document.createElement('li')
                let label = document.createElement('label')
                let checkbox = document.createElement('input')
                checkbox.type = "checkbox"
                
                checkbox.checked = enabled.some(b => b.type == block.type)

                let blockName = document.createElement('span')
                blockName.innerHTML = block.name
                label.appendChild(checkbox)
                label.appendChild(blockName)
                categoryItem.appendChild(label)
                
                categoryList.appendChild(categoryItem)
                checkbox.addEventListener('click', event => {
                    this._enabledBlocks = PuzzleUtils.toggleBlockType(enabled, block)
                    this._onSettingsChange()
                })
            })
            this._blockList.appendChild(categoryList)
        })
	}


    private _selectionHandler(costume: CostumeData){
        this._close()
        // this._emit('costume-pick', costume)
    }

	private _onSettingsChange(){
		let settings: PuzzleSettings = {
			name: this._puzzleNameElement.value,
			sideWidth: +this._boardSizeElement.value,
			blocks: this._enabledBlocks
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

