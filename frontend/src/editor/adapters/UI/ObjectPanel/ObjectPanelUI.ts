const objectPanelTemplate = /*html*/`
    <div class="object-panel-controls">
        <a href="javascript:void(0)" id="add-object-button-element"><img src="/frontend/images/icons/cq-add.png"></a>
        <a href="javascript:void(0)" id="duplicate-object-button-element"><img src="/frontend/images/icons/cq-duplicate.png"></a>
        <a href="javascript:void(0)" id="delete-object-button-element"><img src="/frontend/images/icons/cq-delete.png"></a>
    </div>

    <div>
        <div>
            <table class="object-table" id="object-table-element">
            </table>
        </div>
    </div>
`

class ObjectPanelUI implements IObjectPanelUI{
    private _panelElement: HTMLElement
    private _objectTableElement: HTMLElement

    private _addObjectButton: HTMLAnchorElement
    private _deleteObjectButton: HTMLAnchorElement

    private _eventBehaviour: EventBehaviour<ObjectPanelUIEvents, ObjectPanelUIData>
    
    constructor(){
        this._eventBehaviour = new EventBehaviour()
        this._panelElement = document.getElementById('object-panel') as HTMLElement

        Templater.inject(this._panelElement, objectPanelTemplate)

        this._objectTableElement = document.getElementById('object-table-element') as HTMLAnchorElement
        this._addObjectButton = document.getElementById('add-object-button-element') as HTMLAnchorElement
        this._deleteObjectButton = document.getElementById('delete-object-button-element') as HTMLAnchorElement
        
        this._addObjectButton.addEventListener('click', (ev) => {
            this._emit('object-added', null)
        })
        this._deleteObjectButton.addEventListener('click', (ev) => {
            this._emit('object-removed', null)
        })
    }
    render(objects: PuzzleObject[]): void {
        this._objectTableElement.innerHTML = ""
        objects.forEach(object => {
            const row = addRow(object)
            row.addEventListener('click', () => {
                this._emit('object-selected', {id: object.id})
            })
            this._objectTableElement.appendChild(row)
        })
        
        function addRow(object: PuzzleObject){
            let row = document.createElement('tr')
            row.setAttribute("object-id", object.id)

            let haveCode = document.createElement('td')
            let inGameEdit = document.createElement('td')
            let objectName = document.createElement('td')

            row.appendChild(haveCode)
            row.appendChild(inGameEdit)
            row.appendChild(objectName)

            haveCode.innerHTML = object.settings.code.trim() != "{}"&& object.settings.code ? "X" : ""
            inGameEdit.innerHTML = object.settings.playerEdit ? "X" : ""
            objectName.innerHTML = object.settings.name
            return row
        }
    }

    setSelected(objectId: string): void {
        this._objectTableElement.childNodes.forEach(row => {
            let rowElement = row as HTMLElement
            let rowObjectId = rowElement.getAttribute("object-id")
            rowElement.classList.remove('selected-object')
            if(objectId == rowObjectId) rowElement.classList.add("selected-object")
        })
    }

    private _emit(event: ObjectPanelUIEvents, data: ObjectPanelUIData){
        this._eventBehaviour.emit(event, data)
    }

    on(event: ObjectPanelUIEvents, callback: (data: ObjectPanelUIData) => void){
        this._eventBehaviour.on(event, callback)
    }
}