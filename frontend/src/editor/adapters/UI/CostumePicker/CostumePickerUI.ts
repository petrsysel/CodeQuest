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
                <a hfref="javascript:void(0)"  id="cp-close-button"><img src="/frontend/images/icons/close.png"></a>
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

    constructor(){
        this._eventBehaviour = new EventBehaviour()

        let body = document.getElementsByTagName('body')[0]
        let placeHolder = document.createElement('div')
        placeHolder.id = "cp-place-holder"
        body.appendChild(placeHolder)

        Teplater.inject( "cp-place-holder", CPTemplate)

        this._windowElement = document.getElementById("cp-window-element") as HTMLElement
        this._filterInput = document.getElementById("cp-filer-input") as HTMLInputElement
        this._closeButton = document.getElementById("cp-close-button") as HTMLAnchorElement
        this._costumeContainer = document.getElementById("cp-costume-container") as HTMLElement

        this._closeButton.addEventListener('click', this._close.bind(this))

        this._close()
    }
    render(images: string[]): void {
        this._windowElement.style.display = "block"
        images.forEach(costumeUrl => {
            let costumeElement = document.createElement('img')
            costumeElement.src = costumeUrl
            this._costumeContainer.appendChild(costumeElement)
        })
    }

    private _close(){
        this._windowElement.style.display = "none"
    }

    private _emit(event: CostumePickerEvent, data: CostumePickerData){
        this._eventBehaviour.emit(event, data)
    }

    on(event: CostumePickerEvent, callback: (data: CostumePickerData) => void){
        this._eventBehaviour.on(event, callback)
    }
}

