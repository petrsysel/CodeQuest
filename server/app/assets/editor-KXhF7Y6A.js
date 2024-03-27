var f=Object.defineProperty;var w=(r,e,t)=>e in r?f(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var i=(r,e,t)=>(w(r,typeof e!="symbol"?e+"":e,t),t);import{T as E,a as j,P as I,O as C,N as L,C as O,S as P}from"./NotificationUI-CzwHS9Nb.js";import{E as k,K as S,B as V}from"./KonvaBoardUI-B3I9EWa1.js";import"./blockly-O3kjd3d3.js";import"./uuid-D8aEg3BZ.js";import"./konva-CKjuncwV.js";const T=`
	<div class="control-panel-puzzle-name-container">
	<div id="control-panel-puzzle-name">Název úlohy</div>
	</div>
	<div class="control-panel-controls">
	<a href="javascript:void(0)" id="puzzle-settings-button-element" class="tooltip">
	<span class="tooltiptext">Nastavení úlohy</span>
	<img src="./images/icons/cq-settings.png"></a>
	<a href="javascript:void(0)" id="try-puzzle-button-element" class="tooltip">
	<span class="tooltiptext">Spustit úlohu</span>
	<img src="./images/icons/cq-play.png"></a>
	<a href="javascript:void(0)" id="save-puzzle-button-element" class="tooltip">
	<span class="tooltiptext">Uložit úlohu</span>
	<img src="./images/icons/cq-save.png"></a>
	<div>
`;class N{constructor(e){i(this,"_eventBehaviour");i(this,"_panelElement");i(this,"_settingsButton");i(this,"_tryPuzzleButton");i(this,"_puzzleNameElement");i(this,"savePuzzleButton");this._eventBehaviour=new k,this._panelElement=document.getElementById(e),E.inject(this._panelElement,T),this._settingsButton=document.getElementById("puzzle-settings-button-element"),this._tryPuzzleButton=document.getElementById("try-puzzle-button-element"),this.savePuzzleButton=document.getElementById("save-puzzle-button-element"),this._puzzleNameElement=document.getElementById("control-panel-puzzle-name"),this._settingsButton.addEventListener("click",()=>{this._emit("puzzle-settings-request",null)}),this._tryPuzzleButton.addEventListener("click",()=>{this._emit("play-puzzle",null)}),this.savePuzzleButton.addEventListener("click",()=>{this._emit("save-game",null)})}_emit(e,t){this._eventBehaviour.emit(e,t)}on(e,t){this._eventBehaviour.on(e,t)}render(e){this._puzzleNameElement.innerHTML=e.name}}const U=`
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
                <a hfref="javascript:void(0)"  id="cp-close-button"><img src="./images/icons/cq-close.png"></a>
            </div>
        </div>
        <div class="costume-picker-costume-container" id="cp-costume-container">
        </div>
    </div>
</div>
`;class x{constructor(e){i(this,"_windowElement");i(this,"_filterInput");i(this,"_closeButton");i(this,"_costumeContainer");i(this,"_eventBehaviour");i(this,"_costumes");this._eventBehaviour=new k,this._costumes=[],E.inject(e,U),this._windowElement=document.getElementById("cp-window-element"),this._filterInput=document.getElementById("cp-filter-input"),this._closeButton=document.getElementById("cp-close-button"),this._costumeContainer=document.getElementById("cp-costume-container"),this._closeButton.addEventListener("click",this._close.bind(this)),this._filterInput.addEventListener("keyup",t=>{this.render(this._costumes)}),this._close()}render(e){this._open(),this._costumes=[...e];let t=this._filterInput.value;e=e.filter(s=>{let d=s.name.toLowerCase().includes(t.toLowerCase()),c=s.tags.some(a=>a.toLowerCase().includes(t.toLowerCase()));return d||c}),this._costumeContainer.innerHTML="",e.forEach(s=>{let d=`
                <img src="${s.path}">
                <span>${s.name}</span>
            `,c=document.createElement("div");c.innerHTML=d,c.classList.add("costume-list-item"),c.addEventListener("click",()=>{this._selectionHandler(s)}),this._costumeContainer.appendChild(c)})}_selectionHandler(e){this._close(),this._emit("costume-pick",e)}_close(){this._windowElement.style.display="none"}_open(){this._windowElement.style.display="block"}_emit(e,t){this._eventBehaviour.emit(e,t)}on(e,t){this._eventBehaviour.on(e,t)}}const q=`
    <div class="object-panel-controls">
        <a href="javascript:void(0)" id="add-object-button-element" class="tooltip">
        <span class="tooltiptext">Přidat objekt</span>
        <img src="./images/icons/cq-add.png"></a>
        <a href="javascript:void(0)" id="duplicate-object-button-element" class="tooltip">
        <span class="tooltiptext">Duplikovat objekt</span>
        <img src="./images/icons/cq-duplicate.png"></a>
        <a href="javascript:void(0)" id="delete-object-button-element" class="tooltip">
        <span class="tooltiptext">Smazat objekt</span>
        <img src="./images/icons/cq-delete.png"></a>
    </div>

    <div class="objec-table-container">
        <table class="object-table" id="object-table-element">
        </table>
    </div>
`;class H{constructor(e){i(this,"_panelElement");i(this,"_objectTableElement");i(this,"_addObjectButton");i(this,"_deleteObjectButton");i(this,"_duplicateObjectButton");i(this,"_eventBehaviour");this._eventBehaviour=new k,this._panelElement=document.getElementById(e),E.inject(this._panelElement,q),this._objectTableElement=document.getElementById("object-table-element"),this._addObjectButton=document.getElementById("add-object-button-element"),this._deleteObjectButton=document.getElementById("delete-object-button-element"),this._duplicateObjectButton=document.getElementById("duplicate-object-button-element"),this._addObjectButton.addEventListener("click",t=>{this._emit("object-added",null)}),this._deleteObjectButton.addEventListener("click",t=>{this._emit("object-removed",null)}),this._duplicateObjectButton.addEventListener("click",t=>{this._emit("object-duplicated",null)})}render(e){this._objectTableElement.innerHTML="",e.forEach(l=>{const s=t(l);s.addEventListener("click",()=>{this._emit("object-selected",{id:l.id})}),this._objectTableElement.appendChild(s)});function t(l){let s=document.createElement("tr");s.setAttribute("object-id",l.id);let d=document.createElement("td"),c=document.createElement("td"),a=document.createElement("td"),o="<img src='./images/icons/cq-code.png'>",u="<img src='./images/icons/cq-game.png'>";return s.appendChild(d),s.appendChild(c),s.appendChild(a),d.innerHTML=l.settings.code.trim()!="{}"&&l.settings.code?o:"",c.innerHTML=l.settings.playerEdit?u:"",a.innerHTML=l.settings.name,s}}setSelected(e){this._objectTableElement.childNodes.forEach(t=>{let l=t,s=l.getAttribute("object-id");l.classList.remove("selected-object"),e==s&&l.classList.add("selected-object")})}_emit(e,t){this._eventBehaviour.emit(e,t)}on(e,t){this._eventBehaviour.on(e,t)}}const A=`
    <div class="object-fields-container">
        <div class="object-fields" id="object-fields-element">
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
                <tr>
                    <td>
                        Viditelný: 
                    </td>
                    <td>
                        <input type="checkbox" id="visible-input-element">
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="costume-preview-container">
            <div class="costume-preview" id="costume-preview-element">
            </div>
        </div>
        <div id="nonselect-element" class="nonselect-element">
            Není vybrán žádný objekt
        </div>
    </div>
`;class M{constructor(e){i(this,"_eventBehaviour");i(this,"_puzzleSettingsElement");i(this,"_costumeElement");i(this,"_fieldsElement");i(this,"_nonselectElement");i(this,"_nameElement");i(this,"_layerValueElement");i(this,"_playerEditValueElement");i(this,"_visibleValueElement");i(this,"_positionXValueElement");i(this,"_positionYValueElement");i(this,"_directionValueElement");i(this,"_directionUp");i(this,"_directionRight");i(this,"_directionDown");i(this,"_directionLeft");i(this,"_selectedObject");this._eventBehaviour=new k,this._puzzleSettingsElement=document.getElementById(e),E.inject(this._puzzleSettingsElement,A),this._nonselectElement=document.getElementById("nonselect-element"),this._fieldsElement=document.getElementById("object-fields-element"),this._costumeElement=document.getElementById("costume-preview-element"),this._nameElement=document.getElementById("name-element"),this._layerValueElement=document.getElementById("layer-input-element"),this._playerEditValueElement=document.getElementById("player-edit-input-element"),this._positionXValueElement=document.getElementById("position-x-input-element"),this._positionYValueElement=document.getElementById("position-y-input-element"),this._directionValueElement=document.getElementById("direction-input-element"),this._directionUp=document.getElementById("up-option-element"),this._directionRight=document.getElementById("right-option-element"),this._directionDown=document.getElementById("down-option-element"),this._directionLeft=document.getElementById("left-option-element"),this._visibleValueElement=document.getElementById("visible-input-element"),this._nameElement.addEventListener("change",this._fieldChanged.bind(this)),this._layerValueElement.addEventListener("change",this._fieldChanged.bind(this)),this._playerEditValueElement.addEventListener("change",this._fieldChanged.bind(this)),this._visibleValueElement.addEventListener("change",this._fieldChanged.bind(this)),this._positionXValueElement.addEventListener("change",this._fieldChanged.bind(this)),this._positionYValueElement.addEventListener("change",this._fieldChanged.bind(this)),this._directionValueElement.addEventListener("change",this._fieldChanged.bind(this)),this._costumeElement.addEventListener("click",this._changeCostume.bind(this))}render(e){this._selectedObject=e,this._showSettings(e!=null),e&&this._renderSettings(e)}_showSettings(e=!0){e?(this._fieldsElement.style.display="block",this._costumeElement.style.display="block",this._nonselectElement.style.display="none"):(this._fieldsElement.style.display="none",this._costumeElement.style.display="none",this._nonselectElement.style.display="block")}_renderNothing(){}_renderSettings(e){this._nameElement.value=e.settings.name,this._layerValueElement.value=e.settings.layer.toString(),this._playerEditValueElement.checked=e.settings.playerEdit,this._visibleValueElement.checked=e.settings.visible,this._positionXValueElement.value=e.settings.X.toString(),this._positionYValueElement.value=e.settings.Y.toString();let t=0;switch(e.settings.direction){case"up":this._directionUp.selected=!0,t=180;break;case"right":this._directionRight.selected=!0,t=-90;break;case"down":this._directionDown.selected=!0,t=0;break;case"left":this._directionLeft.selected=!0,t=90;break}this._costumeElement.innerHTML=`<img src="${e.settings.costume.path}" style="transform:rotate(${t}deg)">`}_fieldChanged(){let e={name:this._nameElement.value,layer:+this._layerValueElement.value,playerEdit:this._playerEditValueElement.checked,code:this._selectedObject?this._selectedObject.settings.code:"",direction:this._getSelectedDirection(),X:+this._positionXValueElement.value,Y:+this._positionYValueElement.value,costume:this._selectedObject?this._selectedObject.settings.costume:j.getDefaultCostume(),visible:this._visibleValueElement.checked};this._emit("settings-changed",e)}_getSelectedDirection(){return this._directionUp.selected?"up":this._directionRight.selected?"right":this._directionDown.selected?"down":"left"}_changeCostume(){this._emit("change-costume-request",null)}_emit(e,t){this._eventBehaviour.emit(e,t)}on(e,t){this._eventBehaviour.on(e,t)}}const W=`
<div id="puzzle-settings-window-element" class="costume-picker-window">
    <div class="costume-picker-panel">
        <div class="costume-picker-control-bar">
            <div class="costume-picker-control-bar-item costume-picker-label">
                <span>
                    Nastavení úlohy
                </span>
            </div>
            
            <div class="costume-picker-control-bar-item costume-picker-close">
                <a hfref="javascript:void(0)"  id="puzzle-settings-close-button"><img src="./images/icons/cq-close.png"></a>
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
`;class D{constructor(e){i(this,"_windowElement");i(this,"_closeButton");i(this,"_eventBehaviour");i(this,"_puzzleNameElement");i(this,"_boardSizeElement");i(this,"_blockList");i(this,"_enabledBlocks");this._eventBehaviour=new k,this._enabledBlocks=[],E.inject(e,W),this._windowElement=document.getElementById("puzzle-settings-window-element"),this._closeButton=document.getElementById("puzzle-settings-close-button"),this._blockList=document.getElementById("puzzle-settings-blocklist"),this._closeButton.addEventListener("click",this._close.bind(this)),this._puzzleNameElement=document.getElementById("puzzle-settings-puzzle-name"),this._boardSizeElement=document.getElementById("puzzle-settings-board-size"),this._puzzleNameElement.addEventListener("change",this._onSettingsChange.bind(this)),this._boardSizeElement.addEventListener("change",this._onSettingsChange.bind(this)),this._puzzleNameElement.addEventListener("keyup",(()=>{let t=50;this._puzzleNameElement.value.length&&(this._puzzleNameElement.value=this._puzzleNameElement.value.substring(0,t))}).bind(this)),this._close()}render(e,t){this._open(),this._puzzleNameElement.value=e.name,this._boardSizeElement.value=e.sideWidth.toString(),this._enabledBlocks=e.blocks;let l=[];t.forEach(o=>{let u=l.filter(p=>p.name===o.category);u[0]?u[0].blocks.push(o):l.push({name:o.category,blocks:[o]})});let s=e.blocks;this._blockList.innerHTML="";let d=document.createElement("input");d.type="checkbox",d.checked=s.length>0,d.addEventListener("click",o=>{this._enabledBlocks=j.toggleBlockAll(s,t),this._onSettingsChange()});let c=document.createElement("span");c.innerHTML="Vše/nic";let a=document.createElement("label");a.appendChild(d),a.appendChild(c),this._blockList.appendChild(a),this._blockList.appendChild(document.createElement("br")),l.forEach(o=>{let u=document.createElement("ul"),p=document.createElement("span");p.innerHTML=o.name;let g=document.createElement("input");g.type="checkbox",g.addEventListener("click",h=>{this._enabledBlocks=j.toggleBlockCategory(s,t,o.name),this._onSettingsChange()}),g.checked=s.some(h=>h.category==o.name);let _=document.createElement("label");_.appendChild(g),_.appendChild(p),this._blockList.appendChild(_),o.blocks.forEach(h=>{let y=document.createElement("li"),b=document.createElement("label"),v=document.createElement("input");v.type="checkbox",v.checked=s.some(n=>n.type==h.type);let z=document.createElement("span");z.innerHTML=h.name,b.appendChild(v),b.appendChild(z),y.appendChild(b),u.appendChild(y),v.addEventListener("click",n=>{this._enabledBlocks=j.toggleBlockType(s,h),this._onSettingsChange()})}),this._blockList.appendChild(u)})}_selectionHandler(e){this._close()}_onSettingsChange(){let e={name:this._puzzleNameElement.value,sideWidth:+this._boardSizeElement.value,blocks:this._enabledBlocks};this._emit("settings-changed",e)}_close(){this._windowElement.style.display="none"}_open(){this._windowElement.style.display="block"}_emit(e,t){this._eventBehaviour.emit(e,t)}on(e,t){this._eventBehaviour.on(e,t)}}class R{static validate(e,t){function l(d,c,a){let o=d;return d<c?o=c:d>a&&(o=a),o}return{name:e.name?e.name:t.name,sideWidth:l(e.sideWidth,2,10),blocks:e.blocks}}}class X{constructor(e,t,l,s,d,c,a,o,u,p,g){i(this,"_mockupPuzzle");i(this,"_mockupCostumes");i(this,"_selectedObjectId");i(this,"boardUI");i(this,"codeUI");i(this,"controlPanelUI");i(this,"objectPanelUI");i(this,"objectSettingsUI");i(this,"costumePickerUI");i(this,"puzzleSettingsUI");i(this,"notificationUI");i(this,"loggedUser");const _=p.get();this._mockupCostumes=g,u.isLogged(_).then(n=>{this.loggedUser=n}),this.codeUI=t,this._mockupPuzzle=new I,this._mockupPuzzle.changeSettings({name:this._mockupPuzzle.getSettings().name,sideWidth:this._mockupPuzzle.getSettings().sideWidth,blocks:t.getBlocks()}),this.boardUI=e,this.controlPanelUI=l,this.objectPanelUI=s,this.objectSettingsUI=d,this.costumePickerUI=c,this.puzzleSettingsUI=a,this.notificationUI=o,t.on("code-change",n=>{this._mockupPuzzle.changeObjectCode(this._selectedObjectId,n),this._renderObjectPanel()}),s.on("object-added",n=>{let m=this._mockupPuzzle.addObject();this._selectedObjectId=m,t.clearWorkspace(),this._renderAll(),c.render(this._mockupCostumes)}),s.on("object-removed",n=>{this._selectedObjectId&&this._mockupPuzzle.removeObject(this._selectedObjectId),t.clearWorkspace(),this._renderAll()}),s.on("object-duplicated",n=>{if(!this._selectedObjectId)return;let m=this._mockupPuzzle.duplicateObject(this._selectedObjectId);this._selectedObjectId=m,t.clearWorkspace(),this._renderAll()}),s.on("object-selected",n=>{let m=n.id;this._selectedObjectId=m,this._renderAll()}),d.on("settings-changed",n=>{if(!this._selectedObjectId)return;let m=this._mockupPuzzle.getObject(this._selectedObjectId);if(!m)return;let B=C.validate(this._mockupPuzzle.getSettings(),n,m.settings);this._mockupPuzzle.changeObjectSettings(this._selectedObjectId,B),this._renderAll()}),d.on("change-costume-request",async()=>{c.render(this._mockupCostumes)}),c.on("costume-pick",n=>{this._selectedObjectId&&(this._mockupPuzzle.changeObjectCostume(this._selectedObjectId,n),this._renderAll())}),e.on("object-moved",n=>{this._mockupPuzzle.setObjectPosition(n.objectId,n.x,n.y),this._selectedObjectId=n.objectId,this._renderAll()}),l.on("puzzle-settings-request",n=>{let m=t.getBlocks();a.render(this._mockupPuzzle.getSettings(),m)}),a.on("settings-changed",n=>{let m=R.validate(n,this._mockupPuzzle.getSettings());this._mockupPuzzle.changeSettings(m),this._mockupPuzzle.revalidateObjects(),this._renderAll();let B=t.getBlocks();this.puzzleSettingsUI.render(this._mockupPuzzle.getSettings(),B)});const h=()=>{if(!this.loggedUser)return;const n=e.getPreviewImage();return u.savePuzzle(_,this._mockupPuzzle,this.loggedUser,n,null)},y=n=>{window.open(`game.html?puzzleid=${n}`)};l.on("play-puzzle",async()=>{var n;(n=h())==null||n.then(m=>{y(this._mockupPuzzle.getId())}).catch(async()=>{await o.notify("Úlohu se nepodařilo uložit.")})}),l.on("save-game",()=>{var n;(n=h())==null||n.then(async m=>{await o.notify("Úloha byla uložena!")}).catch(async()=>{await o.notify("Úlohu se nepodařilo uložit.")})});const b=window.location.search,z=new URLSearchParams(b).get("puzzleid");z&&u.getContent(_,z).then(n=>{n.error?console.error(n.error):(this._mockupPuzzle.loadFromString(n.response),this._renderAll())}),this._renderAll()}_renderAll(){this._renderObjectPanel();let e=this._mockupPuzzle.getObject(this._selectedObjectId);this.objectSettingsUI.render(e),this._selectedObjectId&&this.boardUI.setSelected(this._selectedObjectId),this.boardUI.render(this._mockupPuzzle.getSettings(),this._mockupPuzzle.getObjectList()),this.codeUI.clearWorkspace();let t=this._mockupPuzzle.getObjectCode(this._selectedObjectId);t&&this.codeUI.loadWorkspace(t,{loadRuleChecks:!0}),this.controlPanelUI.render(this._mockupPuzzle.getSettings())}_renderObjectPanel(){this.objectPanelUI.render(this._mockupPuzzle.getObjectList()),this._selectedObjectId&&this.objectPanelUI.setSelected(this._selectedObjectId)}}async function Y(){const r=new S("board-container",{draggable:!0,selectable:"all"}),e=new V("blockly-placeholder"),t=new N("control-panel"),l=new H("object-panel"),s=new M("object-settings"),d=new x("cp-place-holder"),c=new D("puzzle-settings-place-holder"),a=new L,o=new P,u=new O,p=await o.getCostumes();new X(r,e,t,l,s,d,c,a,o,u,p)}window.onload=Y;
