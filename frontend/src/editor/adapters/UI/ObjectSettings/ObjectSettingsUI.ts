class ObjectSettingsUI implements IObjectSettingsUI{
    private _eventBehaviour: EventBehaviour<ObjectSettingsUIEvents, ObjectSettingsUIData>
    private _puzzleSettingsElement: HTMLElement

    private _fieldsElement: HTMLElement
    private _costumeElement: HTMLElement

    private _nameElement: HTMLInputElement
    private _settingsTableElement: HTMLTableElement

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

        this._fieldsElement = document.createElement('div')
        this._fieldsElement.classList.add('object-fields')
        this._costumeElement = document.createElement('div')
        this._costumeElement.classList.add('costume-preview')

        this._puzzleSettingsElement.appendChild(this._fieldsElement)
        this._puzzleSettingsElement.appendChild(this._costumeElement)

        this._nameElement = document.createElement('input')
        this._nameElement.type = 'text'
        this._nameElement.classList.add('object-name-input')

        this._settingsTableElement = document.createElement('table')
        this._layerValueElement = document.createElement('input')
        this._layerValueElement.type = 'number'
        this._playerEditValueElement = document.createElement('input')
        this._playerEditValueElement.type = 'checkbox'
        this._positionXValueElement = document.createElement('input')
        this._positionXValueElement.type = 'number'
        this._positionYValueElement = document.createElement('input')
        this._positionYValueElement.type = 'number'
        this._directionValueElement = document.createElement('select')
        
        this._directionUp = document.createElement('option')
        this._directionUp.innerHTML = "nahoru"
        this._directionRight = document.createElement('option')
        this._directionRight.innerHTML = "vpravo"
        this._directionDown = document.createElement('option')
        this._directionDown.innerHTML = "dolu"
        this._directionLeft = document.createElement('option')
        this._directionLeft.innerHTML = "vlevo"
        
        this._directionValueElement.options.add(this._directionRight)
        this._directionValueElement.options.add(this._directionDown)
        this._directionValueElement.options.add(this._directionLeft)
        this._directionValueElement.options.add(this._directionUp)
        
        let layerRow = document.createElement('tr')
        let layerLabel = document.createElement('td')
        layerLabel.innerHTML = "Vrstva"
        layerRow.appendChild(layerLabel)
        layerRow.appendChild(this._layerValueElement)

        let playerEditRow = document.createElement('tr')
        let playerEditLabel = document.createElement('td')
        playerEditLabel.innerHTML = "Upravitelný hráčem"
        playerEditRow.appendChild(playerEditLabel)
        playerEditRow.appendChild(this._playerEditValueElement)

        let positionXRow = document.createElement('tr')
        let positionXLabel = document.createElement('td')
        positionXLabel.innerHTML = "Pozice X"
        positionXRow.appendChild(positionXLabel)
        positionXRow.appendChild(this._positionXValueElement)

        let positionYRow = document.createElement('tr')
        let positionYLabel = document.createElement('td')
        positionYLabel.innerHTML = "Pozice Y"
        positionYRow.appendChild(positionYLabel)
        positionYRow.appendChild(this._positionYValueElement)

        let directionRow = document.createElement('tr')
        let directionLabel = document.createElement('td')
        directionLabel.innerHTML = "Směr"
        directionRow.appendChild(directionLabel)
        directionRow.appendChild(this._directionValueElement)

        this._settingsTableElement.appendChild(layerRow)
        this._settingsTableElement.appendChild(playerEditRow)
        this._settingsTableElement.appendChild(positionXRow)
        this._settingsTableElement.appendChild(positionYRow)
        this._settingsTableElement.appendChild(directionRow)

        this._fieldsElement.appendChild(this._nameElement)
        this._fieldsElement.appendChild(this._settingsTableElement)

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