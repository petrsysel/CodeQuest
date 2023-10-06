const CPTemplate = /*html*/`
<div id="cp-window-element" class="costume-picker-window">
    <div class="costume-picker-panel">
        <div class="costume-picker-control-bar">
            <div class="costume-picker-control-bar-item costume-picker-label">
                <span>
                    Vyber vzhled objektu
                </span>
            </div>
            <div class="costume-picker-control-bar-item">
                Vyhledat: <input type="text" class="costume-picker-filter" id="cp-filter-input">
            </div>
            <div class="costume-picker-control-bar-item costume-picker-close">
                <a hfref="javascript:void(0)"  id="cp-close-button"><img src="/frontend/images/icons/cq-close.png"></a>
            </div>
        </div>
        <div class="costume-picker-costume-container" id="cp-costume-container">
        </div>
    </div>
</div>
`

class CostumePickerUI implements ICostumePickerUI {
    private _windowElement: HTMLElement
    private _filterInput: HTMLInputElement
    private _closeButton: HTMLAnchorElement
    private _costumeContainer: HTMLElement

    private _eventBehaviour: EventBehaviour<CostumePickerEvent, CostumePickerData>
    private _costumes: CostumeData[]

    constructor(destination: string){
        this._eventBehaviour = new EventBehaviour()

        this._costumes = []

        Templater.inject(destination, CPTemplate)

        this._windowElement = document.getElementById("cp-window-element") as HTMLElement
        this._filterInput = document.getElementById("cp-filter-input") as HTMLInputElement
        this._closeButton = document.getElementById("cp-close-button") as HTMLAnchorElement
        this._costumeContainer = document.getElementById("cp-costume-container") as HTMLElement

        this._closeButton.addEventListener('click', this._close.bind(this))

        this._filterInput.addEventListener('keyup', event => {
            this.render(this._costumes)
        })

        this._close()
    }
    render(costumes: CostumeData[]): void {
        this._open()
        this._costumes = [...costumes]
        let filter = this._filterInput.value
        let filtered = costumes.filter(costume => {
            let byName = costume.name.toLowerCase().includes(filter.toLowerCase())
            let byTag = costume.tags.some(tag => {
                return tag.toLowerCase().includes(filter.toLowerCase())
            })
            return byName || byTag
        })
        costumes = filtered

        this._costumeContainer.innerHTML = ""
        costumes.forEach(costume => {
            let costumeTemplate = /*html*/`
                <img src="${costume.path}">
                <span>${costume.name}</span>
            `
            let costumeElement = document.createElement('div')
            costumeElement.innerHTML = costumeTemplate
            costumeElement.classList.add('costume-list-item')
            costumeElement.addEventListener('click',() => {
                this._selectionHandler(costume)
            })
            
            this._costumeContainer.appendChild(costumeElement)
        })
    }

    private _selectionHandler(costume: CostumeData){
        this._close()
        this._emit('costume-pick', costume)
    }

    private _close(){
        this._windowElement.style.display = "none"
    }
    private _open(){
        this._windowElement.style.display = "block"
    }

    private _emit(event: CostumePickerEvent, data: CostumePickerData){
        this._eventBehaviour.emit(event, data)
    }

    on(event: CostumePickerEvent, callback: (data: CostumePickerData) => void){
        this._eventBehaviour.on(event, callback)
    }
}

