const objectSettingsTemplate = /*html*/`
    <div class="object-fields">
        <input type="text" id="name-element" class="object-name-input">
        <table>
            <tr>
                <td>
                    Vrstva: 
                </td>
                <td>
                    <input type="number" id="layer-input-element">
                </td>
            </tr>
            <tr>
                <td>
                    Upravitelný hráčem: 
                </td>
                <td>
                    <input type="checkbox" id="player-edit-input-element">
                </td>
            </tr>
            <tr>
                <td>
                    Pozice X: 
                </td>
                <td>
                    <input type="number" id="position-x-input-element">
                </td>
            </tr>
            <tr>
                <td>
                    Pozice Y: 
                </td>
                <td>
                    <input type="number" id="position-y-input-element">
                </td>
            </tr>
            <tr>
                <td>
                    Směr: 
                </td>
                <td>
                    <select id="direction-input-element">
                        <option value ="up" id="up-option-element">nahoru</option>
                        <option value ="right" id="right-option-element">vpravo</option>
                        <option value ="down" id="down-option-element">dolu</option>
                        <option value ="left" id="left-option-element">vlevo</option>
                    <select>
                </td>
            </tr>
        </table>
    </div>
    
    <div class="costume-preview" id="costume-preview-element">
    </div>
`

class ObjectSettingsUI implements IObjectSettingsUI{
    private _eventBehaviour: EventBehaviour<ObjectSettingsUIEvents, ObjectSettingsUIData>
    private _puzzleSettingsElement: HTMLElement

    private _costumeElement: HTMLElement

    private _nameElement: HTMLInputElement
    
    private _layerValueElement: HTMLInputElement
    private _playerEditValueElement: HTMLInputElement
    private _positionXValueElement: HTMLInputElement
    private _positionYValueElement: HTMLInputElement
    private _directionValueElement: HTMLSelectElement

    private _directionUp: HTMLOptionElement
    private _directionRight: HTMLOptionElement
    private _directionDown: HTMLOptionElement
    private _directionLeft: HTMLOptionElement

    private _selectedObject: PuzzleObject | undefined
    
    constructor(){
        this._eventBehaviour = new EventBehaviour()
        this._puzzleSettingsElement = document.getElementById('object-settings') as HTMLElement

        Templater.inject(this._puzzleSettingsElement, objectSettingsTemplate)

        this._costumeElement = document.getElementById('costume-preview-element') as HTMLElement
        this._nameElement = document.getElementById('name-element') as HTMLInputElement
    
        this._layerValueElement = document.getElementById('layer-input-element') as HTMLInputElement
        this._playerEditValueElement = document.getElementById('player-edit-input-element') as HTMLInputElement
        this._positionXValueElement = document.getElementById('position-x-input-element') as HTMLInputElement
        this._positionYValueElement = document.getElementById('position-y-input-element') as HTMLInputElement

        this._directionValueElement = document.getElementById('direction-input-element') as HTMLSelectElement
        this._directionUp = document.getElementById('up-option-element') as HTMLOptionElement
        this._directionRight = document.getElementById('right-option-element') as HTMLOptionElement
        this._directionDown = document.getElementById('down-option-element') as HTMLOptionElement
        this._directionLeft = document.getElementById('left-option-element') as HTMLOptionElement
        

        this._nameElement.addEventListener('change', this._fieldChanged.bind(this))
        this._layerValueElement.addEventListener('change', this._fieldChanged.bind(this))
        this._playerEditValueElement.addEventListener('change', this._fieldChanged.bind(this))
        this._positionXValueElement.addEventListener('change', this._fieldChanged.bind(this))
        this._positionYValueElement.addEventListener('change', this._fieldChanged.bind(this))
        this._directionValueElement.addEventListener('change', this._fieldChanged.bind(this))
        this._costumeElement.addEventListener('click', this._changeCostume.bind(this))
    }
    render(object: PuzzleObject | undefined): void {
        this._selectedObject = object
        if(!object) return
        this._nameElement.value = object.settings.name
        this._layerValueElement.value = object.settings.layer.toString()
        this._playerEditValueElement.checked = object.settings.playerEdit
        this._positionXValueElement.value = object.settings.X.toString()
        this._positionYValueElement.value = object.settings.Y.toString()
        
        switch(object.settings.direction){
            case 'up':
                this._directionUp.selected = true
            break
            case 'right':
                this._directionRight.selected = true
            break
            case 'down':
                this._directionDown.selected = true
            break
            case 'left':
                this._directionLeft.selected = true
            break
        }
    }

    private _fieldChanged(){
        let settings: PuzzleObjectSettings = {
            name: this._nameElement.value,
            layer: +this._layerValueElement.value,
            playerEdit: this._playerEditValueElement.checked,
            code: this._selectedObject?this._selectedObject.settings.code:"",
            direction: this._getSelectedDirection(),
            X: +this._positionXValueElement.value,
            Y: +this._positionYValueElement.value

        }
        this._emit('settings-changed', settings)
    }

    private _getSelectedDirection(){
        if(this._directionUp.selected) return 'up'
        else if(this._directionRight.selected) return 'right'
        else if(this._directionDown.selected) return 'down'
        else return 'left'
    }

    private _changeCostume(){
        this._emit("change-costume-request", null)
    }

    private _emit(event: ObjectSettingsUIEvents, data: ObjectSettingsUIData){
        this._eventBehaviour.emit(event, data)
    }
    on(event: ObjectSettingsUIEvents, callback: (data: ObjectSettingsUIData) => void){
        this._eventBehaviour.on(event, callback)
    }
}