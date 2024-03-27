var I=Object.defineProperty;var M=(d,e,t)=>e in d?I(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var l=(d,e,t)=>(M(d,typeof e!="symbol"?e+"":e,t),t);import{B as g,j as r,C as E}from"./blockly-O3kjd3d3.js";import{v as b}from"./uuid-D8aEg3BZ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();class B{static validate(e,t,o){function n(a,c,u){let m=a;return a<c?m=c:a>u&&(m=u),m}return{name:t.name?t.name:o.name,layer:n(t.layer,0,99),playerEdit:t.playerEdit,code:t.code,direction:t.direction,X:n(t.X,0,e.sideWidth-1),Y:n(t.Y,0,e.sideWidth-1),costume:t.costume,visible:t.visible}}}class w{static init(){g.defineBlocksWithJsonArray(this.definitions)}}l(w,"definitions",[{type:"go_forward",message0:"Jdi vpřed",previousStatement:null,nextStatement:null,colour:65,tooltip:"Postavička se posune o jedno políčko vpřed",helpUrl:""},{type:"jump",message0:"Skoč",previousStatement:null,nextStatement:null,colour:65,tooltip:"Postavička přeskočí políčko před ní.",helpUrl:""},{type:"turn",message0:"Otoč se %1 %2",args0:[{type:"input_dummy"},{type:"field_dropdown",name:"turn_side",options:[["vlevo","left"],["vpravo","right"]]}],inputsInline:!0,previousStatement:null,nextStatement:null,colour:65,tooltip:"Postavička se otočí o 90˚ vpravo či vlevo",helpUrl:""},{type:"set_direction",message0:"Nastav směr %1",args0:[{type:"input_value",name:"direction",check:"direction_pick"}],inputsInline:!0,previousStatement:null,nextStatement:null,colour:65,tooltip:"Postavička se natočí nastaveným směrem",helpUrl:""},{type:"jump_to",message0:"Skoč na x: %1 y: %2",args0:[{type:"input_value",name:"x_position",check:"Number"},{type:"input_value",name:"y_position",check:"Number"}],inputsInline:!0,previousStatement:null,nextStatement:null,colour:65,tooltip:"",helpUrl:""},{type:"direction_pick",message0:"směr %1",args0:[{type:"field_dropdown",name:"direction",options:[["nahoru","up"],["vpravo","right"],["dolu","down"],["vlevo","left"]]}],output:null,colour:65,tooltip:"Tímto blokem lze nastavit směr objektům",helpUrl:""},{type:"position_x",message0:"x",output:"Number",colour:65,tooltip:"Vrací aktuální souřadnici x",helpUrl:""},{type:"position_y",message0:"y",output:"Number",colour:65,tooltip:"Vrací aktuální souřadnici y",helpUrl:""},{type:"direction",message0:"směr",output:null,colour:65,tooltip:"Vrací aktuální směr objektu",helpUrl:""},{type:"say",message0:"Řekni %1",args0:[{type:"input_value",name:"message_to_say",check:"String"}],previousStatement:null,nextStatement:null,colour:210,tooltip:"Objekt řekne zadaný text",helpUrl:""},{type:"change_costume",message0:"Změň kostým na %1",args0:[{type:"input_value",name:"costume_name",check:"String"}],previousStatement:null,nextStatement:null,colour:210,tooltip:"Objekt změní kostým podle zadaného názvu",helpUrl:""},{type:"change_background",message0:"Změň pozadí %1",args0:[{type:"input_value",name:"background_name",check:"String"}],previousStatement:null,nextStatement:null,colour:210,tooltip:"Pozadí hry se změní podle zadaného názvu",helpUrl:""},{type:"show",message0:"Ukaž se",previousStatement:null,nextStatement:null,colour:210,tooltip:"Pokud byl objekt skrytý, zobrazí se",helpUrl:""},{type:"hide",message0:"Skryj se",previousStatement:null,nextStatement:null,colour:210,tooltip:"Pokud byl objekt viditelný, skryje se",helpUrl:""},{type:"set_layer",message0:"Nastav vrstvu %1",args0:[{type:"input_value",name:"layer",check:"Number"}],previousStatement:null,nextStatement:null,colour:210,tooltip:"Nastaví vrstvu, na které se objekt nachází",helpUrl:""},{type:"on_start",message0:"Po startu",nextStatement:null,colour:330,tooltip:"Základní blok programu. Po začátku hry se provede, co je pod ním",helpUrl:""},{type:"rule_check",message0:"Kontrola pravidel %1 %2",args0:[{type:"input_dummy"},{type:"input_statement",name:"rule_check_body"}],colour:330,tooltip:"Obsah tohoto bloku je volán na konci každého kola. Může definovat pravidla úlohy a podmínky jejího splnění.",helpUrl:""},{type:"send_message",message0:"Vyšli zprávu %1",args0:[{type:"input_value",name:"message_name",check:"String"}],previousStatement:null,nextStatement:null,colour:330,tooltip:"Vyšle zprávu, kterou mohou ostatní objekty přijmout.",helpUrl:""},{type:"on_message_recieve",message0:"Po obdržení zprávy %1 %2",args0:[{type:"input_value",name:"message_name",check:"String"},{type:"input_statement",name:"on_message_body"}],colour:330,tooltip:"Pokud obdrží zprávu s uvedeným názvem, vykoná se, co je pod tímto blokem",helpUrl:""},{type:"wait",message0:"Čekej %1 kol",args0:[{type:"input_value",name:"turn_count",check:"Number"}],previousStatement:null,nextStatement:null,colour:330,tooltip:"Uvedený počet kol nebude objekt dělat nic",helpUrl:""},{type:"win",message0:"Výhra! Zpráva pro hráče: %1",args0:[{type:"input_value",name:"win_message",check:"String"}],previousStatement:null,colour:330,tooltip:"Hra končí výtězstvím",helpUrl:""},{type:"game_over",message0:"Prohra! Zpráva pro hráče: %1",args0:[{type:"input_value",name:"game_over_message",check:"String"}],previousStatement:null,colour:330,tooltip:"Hra končí prohrou",helpUrl:""},{type:"is_touch",message0:"dotýkáš se %1",args0:[{type:"input_value",name:"object_name",check:"String"}],output:"Boolean",colour:160,tooltip:"Říká, zda se objekt dotýká jiného objektu se zadaným jménem",helpUrl:""},{type:"in_front_of_me",message0:"je přede mnou %1",args0:[{type:"input_value",name:"object_name",check:"String"}],output:"Boolean",colour:160,tooltip:"Říká, zda se před objektemnachází jiný objekt se zadaným jménem",helpUrl:""},{type:"distance_to",message0:"vzdálenost k  %1",args0:[{type:"input_value",name:"object_name",check:"String"}],output:"Number",colour:160,tooltip:"Vrací počet políček, které dělí objekt a jiný objektu se zadaným jménem",helpUrl:""}]);class T{static inject(e,t){let o=typeof e=="string"?document.getElementById(e):e;if(!o)throw Error(`Placeholder ${e} does not exist`);return o.innerHTML=t,!0}}class C{static getToolbox(e){let t=document.getElementById("blockly-toolbox");return T.inject(t,this._toolboxContent),t}}l(C,"_toolboxContent",`
  
  <category name="Pohyb" colour="#9fa55b">
  <block type="go_forward" deletable="true" movable="true" editable="true"></block>
  <block type="jump" deletable="true" movable="true" editable="true"></block>
  <block type="turn" deletable="true" movable="true" editable="true">
    <field name="turn_side">turn_left</field>
  </block>
  <block type="set_direction" deletable="true" movable="true" editable="true">
    <value name="direction">
      <shadow type="direction_pick">
        <field name="direction">up</field>
      </shadow>
    </value>
  </block>
  <block type="jump_to" deletable="true" movable="true" editable="true">
    <value name="x_position">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
    <value name="y_position">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
  </block>
  <block type="direction_pick" deletable="true" movable="true" editable="true">
    <field name="direction">up</field>
  </block>
  <block type="position_x" deletable="true" movable="true" editable="true"></block>
  <block type="position_y" deletable="true" movable="true" editable="true"></block>
  <block type="direction" deletable="true" movable="true" editable="true"></block>
</category>
<category name="Vzhled" colour="#5b80a5">
  <block type="change_costume" deletable="true" movable="true" editable="true">
    <value name="costume_name">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="show" deletable="true" movable="true" editable="true"></block>
  <block type="hide" deletable="true" movable="true" editable="true"></block>
  <block type="set_layer" deletable="true" movable="true" editable="true">
    <value name="layer">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
</category>
<category name="Cykly" colour="#5ba55b">
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
  <block type="controls_whileUntil">
    <field name="MODE">WHILE</field>
  </block>
  
</category>
<category name="Logika" colour="#5b80a5">
  <block type="controls_if"></block>
  <block type="logic_compare">
    <field name="OP">EQ</field>
  </block>
  <block type="logic_operation">
    <field name="OP">AND</field>
  </block>
  <block type="logic_negate"></block>
  <block type="logic_boolean">
    <field name="BOOL">TRUE</field>
  </block>
</category>
<category name="Matematika" colour="#745ba5">
  <block type="math_number">
    <field name="NUM">0</field>
  </block>
  <block type="math_arithmetic">
    <field name="OP">ADD</field>
    <value name="A">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="B">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  
  <block type="math_number_property">
    <mutation divisor_input="false"></mutation>
    <field name="PROPERTY">EVEN</field>
    <value name="NUMBER_TO_CHECK">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
  </block>
  <block type="math_round">
    <field name="OP">ROUND</field>
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">3.1</field>
      </shadow>
    </value>
  </block>
  <block type="math_modulo">
    <value name="DIVIDEND">
      <shadow type="math_number">
        <field name="NUM">64</field>
      </shadow>
    </value>
    <value name="DIVISOR">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
  <block type="math_constrain">
    <value name="VALUE">
      <shadow type="math_number">
        <field name="NUM">50</field>
      </shadow>
    </value>
    <value name="LOW">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="HIGH">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
  </block>
  <block type="math_random_int">
    <value name="FROM">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="TO">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
  </block>
</category>
<category name="Text" colour="#5ba58c">
  <block type="text">
    <field name="TEXT"></field>
  </block>
  <block type="text_join">
    <mutation items="2"></mutation>
  </block>
  <block type="text_length">
    <value name="VALUE">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_isEmpty">
    <value name="VALUE">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
</category>
<category name="Události" colour="#a5745b">
  
  <block type="send_message" deletable="true" movable="true" editable="true">
    <value name="message_name">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="on_message_recieve" deletable="true" movable="true" editable="true">
    <value name="message_name">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="win" deletable="true" movable="true" editable="true">
    <value name="win_message">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="game_over" deletable="true" movable="true" editable="true">
    <value name="game_over_message">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="wait" deletable="true" movable="true" editable="true">
    <value name="turn_count">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="rule_check"></block>
</category>
<category name="Vnímání" colour="#5ba58c">
  <block type="distance_to">
    <value name="object_name">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="is_touch" deletable="true" movable="true" editable="true">
    <value name="object_name">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="in_front_of_me" deletable="true" movable="true" editable="true">
    <value name="object_name">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
</category>
<category name="Proměnné" colour="#a55b80" custom="VARIABLE">
<block></block>
</category>

<category name="Funkce" colour="#995ba5" custom="PROCEDURE">
<block></block>
</category>
	`);const s=r.javascriptGenerator;class ${static init(){s.forBlock.go_forward=function(e,t){var o="new GoAction(),";return o},s.forBlock.jump=function(e,t){var o="new JumpAction(),";return o},s.forBlock.turn=function(e,t){var n=`new TurnAction('${e.getFieldValue("turn_side")}'),`;return n},s.forBlock.set_direction=function(e,t){var n=`new SetDirectionAction(${t.valueToCode(e,"direction",r.Order.ATOMIC)}),`;return n},s.forBlock.direction_pick=function(e,t){var n=`new DirectionPickAction('${e.getFieldValue("direction")}')`;return[n,r.Order.ATOMIC]},s.forBlock.jump_to=function(e,t){const o=t.valueToCode(e,"x_position",r.Order.ATOMIC),n=t.valueToCode(e,"y_position",r.Order.ATOMIC);var i=`new JumpToAction(${o}, ${n}),`;return i},s.forBlock.position_x=function(e,t){var o="new GetXAction()";return[o,s.ORDER_NONE]},s.forBlock.position_y=function(e,t){var o="new GetYAction()";return[o,s.ORDER_NONE]},s.forBlock.direction=function(e,t){var o="new GetDirectionAction()";return[o,s.ORDER_NONE]},s.forBlock.change_costume=function(e,t){var n=`new ChangeCostumeAction(${t.valueToCode(e,"costume_name",r.Order.ATOMIC)}),`;return n},s.forBlock.show=function(e,t){var o="new ShowAction(),";return o},s.forBlock.hide=function(e,t){var o="new HideAction(),";return o},s.forBlock.set_layer=function(e,t){var n=`new SetLayerAction(${t.valueToCode(e,"layer",r.Order.ATOMIC)}),`;return n},s.forBlock.logic_boolean=function(e,t){return[`new BooleanAction(${e.getFieldValue("BOOL")=="TRUE"})`,r.Order.ATOMIC]},s.forBlock.logic_compare=function(e,t){const o=e.getFieldValue("OP"),n=t.valueToCode(e,"A",r.Order.ATOMIC),i=t.valueToCode(e,"B",r.Order.ATOMIC);return[`new LogicCompareAction('${o}', ${n}, ${i})`,r.Order.ATOMIC]},s.forBlock.logic_operation=function(e,t){const o=e.getFieldValue("OP"),n=t.valueToCode(e,"A",r.Order.ATOMIC),i=t.valueToCode(e,"B",r.Order.ATOMIC);return[`new LogicOperationAction('${o}', ${n}, ${i})`,r.Order.ATOMIC]},s.forBlock.logic_negate=function(e,t){return[`new LogicNegateAction(${t.valueToCode(e,"BOOL",r.Order.ATOMIC)})`,r.Order.ATOMIC]},s.forBlock.wait=function(e,t){var o=t.valueToCode(e,"turn_count",r.Order.ATOMIC),n=`new WaitAction(${o}),`;return n},s.forBlock.controls_if=function(e,t){function o(f){const k=t.valueToCode(e,`IF${f}`,r.Order.ATOMIC);if(k!=""){const A=t.statementToCode(e,`DO${f}`).replace(new RegExp(",$"),"");return`{
						ifStatement: ${k},
						doStatement: [${A}]
					}`}}const n=[];let i=0,a;for(;(a=o(i))!=null;)n.push(a),i++;let c=`[${n.join(", ")}]`,u=t.statementToCode(e,"ELSE"),m=u==""?void 0:`[${u.replace(new RegExp(",$"),"")}]`;var p=`new IfAction(${c}, ${m}),`;return p},s.forBlock.controls_repeat_ext=function(e,t){var o=t.valueToCode(e,"TIMES",r.Order.ATOMIC),n=t.statementToCode(e,"DO");n=n.replace(new RegExp(";$"),"");var i=`new ForAction(${o}, [${n}]),`;return i},s.forBlock.controls_whileUntil=function(e,t){var o=t.valueToCode(e,"BOOL",r.Order.ATOMIC),n=t.statementToCode(e,"DO");n=n.replace(new RegExp(";$"),"");var i=`new ForAction(${o}, [${n}]),`;return i},s.forBlock.math_number=function(e,t){var o=e.getFieldValue("NUM");return[`new NumberAction(${o})`,r.Order.ATOMIC]},s.forBlock.math_arithmetic=function(e,t){const o=e.getFieldValue("OP"),n=t.valueToCode(e,"A",r.Order.ATOMIC),i=t.valueToCode(e,"B",r.Order.ATOMIC);return[`new MathArithmeticAction('${o}', ${n}, ${i})`,r.Order.ATOMIC]},s.forBlock.math_number_property=function(e,t){const o=e.getFieldValue("PROPERTY"),n=t.valueToCode(e,"NUMBER_TO_CHECK",r.Order.ATOMIC),i=t.valueToCode(e,"DIVISOR",r.Order.ATOMIC);return[`new MathPropertyAction('${o}', ${n}, ${i})`,r.Order.ATOMIC]},s.forBlock.math_round=function(e,t){const o=e.getFieldValue("OP"),n=t.valueToCode(e,"NUM",r.Order.ATOMIC);return[`new MathRoundAction('${o}', ${n})`,r.Order.ATOMIC]},s.forBlock.math_modulo=function(e,t){const o=t.valueToCode(e,"DIVIDEND",r.Order.ATOMIC),n=t.valueToCode(e,"DIVISOR",r.Order.ATOMIC);return[`new MathModuloAction(${o}, ${n})`,r.Order.ATOMIC]},s.forBlock.math_constrain=function(e,t){const o=t.valueToCode(e,"VALUE",r.Order.ATOMIC),n=t.valueToCode(e,"LOW",r.Order.ATOMIC),i=t.valueToCode(e,"HIGH",r.Order.ATOMIC);return[`new MathConstrainAction(${o}, ${n}, ${i})`,r.Order.ATOMIC]},s.forBlock.math_random_int=function(e,t){const o=t.valueToCode(e,"FROM",r.Order.ATOMIC),n=t.valueToCode(e,"TO",r.Order.ATOMIC);return[`new MathRandomIntAction(${o}, ${n})`,r.Order.ATOMIC]},s.forBlock.text=function(e,t){return[`new TextAction('${e.getFieldValue("TEXT")}')`,r.Order.ATOMIC]},s.forBlock.text_join=function(e,t){function o(m){const p=t.valueToCode(e,`ADD${m}`,r.Order.ATOMIC);if(p!="")return p}let n=0;const i=[];let a;for(;(a=o(n))!=null;)i.push(a),n++;var u=`new TextJoinAction(${`[${i.join(", ")}]`})`;return[u,r.Order.ATOMIC]},s.forBlock.text_length=function(e,t){return[`new TextLengthAction(${t.valueToCode(e,"VALUE",r.Order.ATOMIC)})`,r.Order.ATOMIC]},s.forBlock.text_isEmpty=function(e,t){return[`new TextIsEmptyAction(${t.valueToCode(e,"VALUE",r.Order.ATOMIC)})`,r.Order.ATOMIC]},s.forBlock.send_message=function(e,t){return`new EmitAction(${t.valueToCode(e,"message_name",r.Order.ATOMIC)}),`},s.forBlock.on_message_recieve=function(e,t){var o=t.valueToCode(e,"message_name",r.Order.ATOMIC),n=t.statementToCode(e,"on_message_body");n=n.replace(new RegExp(";$"),"");var i=`new OnEventAction(${o}, ${n}),`;return i},s.forBlock.game_over=function(e,t){return`new GameOverAction(${t.valueToCode(e,"game_over_message",r.Order.ATOMIC)}),`},s.forBlock.win=function(e,t){return`new WinAction(${t.valueToCode(e,"win_message",r.Order.ATOMIC)}),`},s.forBlock.distance_to=function(e,t){var o=t.valueToCode(e,"object_name",r.Order.ATOMIC),n=`new DistanceToAction(${o})`;return[n,r.Order.ATOMIC]},s.forBlock.is_touch=function(e,t){var o=t.valueToCode(e,"object_name",r.Order.ATOMIC),n=`new IsTouchingAction(${o})`;return[n,r.Order.ATOMIC]},s.forBlock.in_front_of_me=function(e,t){var o=t.valueToCode(e,"object_name",r.Order.ATOMIC),n=`new IsInFrontOfMeAction(${o})`;return[n,r.Order.ATOMIC]},s.forBlock.variables_set=function(e,t){var o=t.valueToCode(e,"VALUE",r.Order.ATOMIC),i=`new SetVariableAction('${e.getFieldValue("VAR")}', ${o}),`;return i},s.forBlock.math_change=function(e,t){var o=t.valueToCode(e,"DELTA",r.Order.ATOMIC),i=`new ChangeVariableAction('${e.getFieldValue("VAR")}', ${o}),`;return i},s.forBlock.variables_get=function(e,t){var n=`new GetVariableAction('${e.getFieldValue("VAR")}')`;return[n,r.Order.ATOMIC]},s.forBlock.procedures_defnoreturn=function(e,t){const o=e.getFieldValue("NAME"),n=t.statementToCode(e,"STACK").replace(new RegExp(",$"),"");var i=`new FunctionAction('${o}', [${n}]),`;return i},s.forBlock.procedures_callnoreturn=function(e,t){const o=e.getVarModels(),n=e.getFieldValue("NAME");let i="";for(let u=0;u<o.length;u++)i+=t.valueToCode(e,`ARG${u}`,r.Order.ATOMIC)+",";i=i.replace(new RegExp(",$"),"");const a=o.map(u=>({id:u.id_,name:u.name}));return`new CallMethodAction('${n}', ${JSON.stringify(a)}, [${i}]),`},s.forBlock.procedures_ifreturn=function(e,t){const o=e.getRootBlock().getFieldValue("NAME"),n=t.valueToCode(e,"CONDITION",r.Order.ATOMIC),i=t.valueToCode(e,"VALUE",r.Order.ATOMIC);return`new ReturnFunctionAction('${o}', ${n}, ${i}),`},s.forBlock.procedures_defreturn=function(e,t){const o=e.getFieldValue("NAME"),n=t.statementToCode(e,"STACK").replace(new RegExp(",$"),""),i=t.valueToCode(e,"RETURN",r.Order.ATOMIC);return`new FunctionAction('${o}', [${n}], ${i}),`},s.forBlock.procedures_callreturn=function(e,t){const o=e.getVarModels(),n=e.getFieldValue("NAME");let i="";for(let u=0;u<o.length;u++)i+=t.valueToCode(e,`ARG${u}`,r.Order.ATOMIC)+",";i=i.replace(new RegExp(",$"),"");const a=o.map(u=>({id:u.id_,name:u.name}));return[`new CallFunctionAction('${n}', ${JSON.stringify(a)}, [${i}])`,r.Order.ATOMIC]},s.forBlock.rule_check=function(e,t){return`new RuleCheckAction([${t.statementToCode(e,"rule_check_body").replace(new RegExp(",$"),"")}]),`}}}class S{constructor(e){l(this,"_workspace");l(this,"_destination");this._destination=e}_getWorkspaceOptions(e,t){return{toolbox:e,theme:t,collapse:!1,autoClose:!1,comments:!0,disable:!0,maxBlocks:1/0,trashcan:!0,zoom:{controls:!0,maxScale:3,minScale:.3,scaleSpeed:1.2,startScale:1,wheel:!0},horizontalLayout:!1,toolboxPosition:"start",css:!0,media:"https://blockly-demo.appspot.com/static/media/",rtl:!1,scrollbars:!0,sounds:!0,oneBasedIndex:!0,grid:{spacing:20,length:1,colour:"#000",snap:!1}}}_getTheme(){let e="#d4d9e3",t="#bdcae1",o="#002e82",n={family:"mainFont, serif",weight:"bold",size:12};return g.Theme.defineTheme("code-quest",{base:g.Themes.Classic,componentStyles:{workspaceBackgroundColour:e,toolboxBackgroundColour:o,toolboxForegroundColour:"#fff",flyoutBackgroundColour:t,flyoutForegroundColour:e,flyoutOpacity:.8,scrollbarColour:"#797979",insertionMarkerColour:"#aaa",insertionMarkerOpacity:.3,scrollbarOpacity:.4,cursorColour:"#d0d0d0"},fontStyle:n,name:"cq-theme"})}createWorkspace(e){w.init(),$.init();let t=C.getToolbox(e),o=this._getTheme(),n=this._getWorkspaceOptions(t,o);return this._workspace=g.inject(this._destination,n),g.setLocale(E),this._workspace.getToolbox().getFlyout().autoClose=!1,this._workspace}}class j{static getCodeFor(e){this._workspace||this._init();let t=JSON.parse(e.settings.code);return g.serialization.workspaces.load(t,this._workspace),r.javascriptGenerator.workspaceToCode(this._workspace)}static _init(){let e=document.getElementsByTagName("body")[0],t=document.createElement("div");t.style.display="none",t.id="generator-workspace",e.appendChild(t);let o=new S("generator-workspace");this._workspace=o.createWorkspace([])}}l(j,"_workspace");class O{constructor(e,t){l(this,"_primitive");l(this,"_isSleeping");l(this,"_code");this._primitive=e,this._code=t,this._isSleeping=!1}putToSleep(){this._isSleeping=!0}isSleeping(){return this._isSleeping}getObject(){return this._primitive}getCode(){return this._code}id(){return this._primitive.id}}class v{static createPuzzle(){return{id:b(),version:1,settings:{name:"Nová úloha",sideWidth:5,blocks:[]},objects:[]}}static createObject(e=0){let t=e?` ${e}`:"";return{id:b(),settings:{name:`Nový objekt${t}`,layer:1,playerEdit:!1,code:"",direction:"down",X:0,Y:0,costume:this.getDefaultCostume(),visible:!0}}}static duplicateObject(e){return{id:b(),settings:{name:e.settings.name,layer:e.settings.layer,playerEdit:e.settings.playerEdit,code:e.settings.code,direction:e.settings.direction,X:e.settings.X,Y:e.settings.Y,costume:e.settings.costume,visible:e.settings.visible}}}static getDefaultCostume(){return{name:"kouzelník",path:"./costumes/kouzelník.png",tags:["fantasy","kouzelník"]}}static toggleBlockType(e,t){let o=[...e],n=o.findIndex(i=>i.type==t.type);return n!==-1?o.splice(n,1):o.push(t),o}static toggleBlockCategory(e,t,o){if(e.some(i=>i.category==o))return e.filter(i=>i.category!==o);{let i=t.filter(a=>a.category==o);return[...e,...i]}}static toggleBlockAll(e,t){return e.length>0?[]:[...t]}static createActors(e){return e.getObjectList().filter(o=>{let n=o.settings.code;return n!=""&&n!="{}"}).map(o=>new O(o,j.getCodeFor(o)))}static stringifyActors(e){return JSON.stringify(e)}static destringifyActors(e){return JSON.parse(e).map(t=>new O(t._primitive,t._code))}}class y{constructor(e=null){l(this,"_primitive");l(this,"_objectCounter",1);l(this,"commands",{goForward:this._commandGoForward.bind(this),jump:this._commandJump.bind(this),turn:this._commandTurn.bind(this),setDirection:this._commandSetDirection.bind(this),jumpTo:this._commandJumpTo.bind(this),getX:this._commandGetX.bind(this),getY:this._commandGetY.bind(this),getDirection:this._commandGetDirection.bind(this),show:this._commandShow.bind(this),hide:this._commandHide.bind(this),isTouch:this._commandIsTouch.bind(this),isInFrontOfMe:this._commandIsInFrontOfMe.bind(this),distanceTo:this._commandDistanceTo.bind(this),setLayer:this._commandSetLayer.bind(this)});e?this._primitive=e:this._primitive=v.createPuzzle()}addObject(){let e=v.createObject(this._objectCounter);return this._primitive.objects.push(e),this._objectCounter++,e.id}duplicateObject(e){let t=this.getObject(e),o=v.duplicateObject(t);return this._primitive.objects.push(o),this._objectCounter++,o.id}removeObject(e){return this._primitive.objects=this._primitive.objects.filter(t=>t.id!=e),!1}changeObjectSettings(e,t){return this._primitive.objects.forEach(o=>{o.id==e&&(o.settings=t)}),!0}changeSettings(e){return this._primitive.settings=e,!0}getObjectSettings(e){let t;return this._primitive.objects.forEach(o=>{e==o.id&&(t=o.settings)}),t}getSettings(){return this._primitive.settings}getObjectList(){return this._primitive.objects}getObject(e){let t;return this._primitive.objects.forEach(o=>{e==o.id&&(t=o)}),t}changeObjectCostume(e,t){let o=this.getObject(e);if(o)o.settings.costume=t;else return!1;return!0}changeObjectCode(e,t){let o=this.getObject(e);if(o)o.settings.code=t;else return!1;return!0}getObjectCode(e){let t=this.getObject(e);if(t)return t.settings.code}setObjectPosition(e,t,o){let n=this.getObject(e),i=this._validatePosition(t,o);if(n)n.settings.X=i.validateX,n.settings.Y=i.validateY;else return!1;return!0}getBlocks(){return[...this._primitive.settings.blocks]}_validatePosition(e,t){let o=e,n=t;return e<0?o=0:e>this._primitive.settings.sideWidth-1&&(o=this._primitive.settings.sideWidth-1),t<0&&(n=0),t>this._primitive.settings.sideWidth-1&&(n=this._primitive.settings.sideWidth-1),{validateX:o,validateY:n}}revalidateObjects(){this._primitive.objects.forEach(e=>{e.settings=B.validate(this._primitive.settings,e.settings,e.settings)})}getFirstPlayerObject(){var e;return(e=this._primitive.objects.find(t=>t.settings.playerEdit))==null?void 0:e.id}stringify(){let e=JSON.stringify(this._primitive);return encodeURIComponent(e)}loadFromString(e){let t=decodeURIComponent(e);this._primitive=JSON.parse(t)}_commandGoForward(e){this._commandGoForwardBy(e,1)}_commandJump(e){this._commandGoForwardBy(e,2)}_commandGoForwardBy(e,t){let o=this.getObject(e);o&&(o.settings.direction=="up"?o.settings.Y-=t:o.settings.direction=="right"?o.settings.X+=t:o.settings.direction=="down"?o.settings.Y+=t:o.settings.X-=t)}_commandTurn(e,t){let o=this.getObject(e);if(!o||t!="right"&&t!="left")return;let n=o.settings.direction;n=="up"?t=="right"?n="right":n="left":n=="right"?t=="right"?n="down":n="up":n=="down"?t=="right"?n="left":n="right":t=="right"?n="up":n="down",o.settings.direction=n}_commandSetDirection(e,t){let o=this.getObject(e);o&&(t!="right"&&t!="left"&&t!="up"&&t!="down"||(o.settings.direction=t))}_commandJumpTo(e,t,o){let n=this.getObject(e);n&&(n.settings.X=t,n.settings.Y=o)}_commandGetX(e){let t=this.getObject(e);return t?t.settings.X:0}_commandGetY(e){let t=this.getObject(e);return t?t.settings.Y:0}_commandGetDirection(e){let t=this.getObject(e);return t?t.settings.direction:"down"}_commandShow(e){let t=this.getObject(e);t&&(t.settings.visible=!0)}_commandHide(e){let t=this.getObject(e);t&&(t.settings.visible=!1)}_commandIsTouch(e,t){let o=this.getObject(e);if(!o)return!1;let n=this._primitive.objects.filter(i=>i.settings.name==t);return n=n.filter(i=>i.settings.visible),n.some(i=>i.settings.X==(o==null?void 0:o.settings.X)&&i.settings.Y==o.settings.Y)}_commandIsInFrontOfMe(e,t){let o=this.getObject(e);if(!o)return!1;let n=o.settings.X,i=o.settings.Y,a=o.settings.direction;return a=="up"?i--:a=="right"?n++:a=="down"?i++:n--,this._primitive.objects.some(c=>c.settings.X==n&&c.settings.Y==i&&c.settings.name==t)}_commandDistanceTo(e,t){let o=this.getObject(e);if(!o)return-1;let n=this._primitive.objects.filter(i=>i.settings.name==t).map(i=>{let a=o.settings.X-i.settings.X,c=o.settings.Y-i.settings.Y;return Math.sqrt(a*a+c*c)});return n.length==0?-1:Math.min(...n)}_commandSetLayer(e,t){let o=this.getObject(e);o&&(o.settings.layer=t)}clone(){return new y(JSON.parse(JSON.stringify(this._primitive)))}getId(){return this._primitive.id}duplicate(){let e=JSON.parse(JSON.stringify(this._primitive));return e.id=b(),e.settings.name+=" - kopie",new y(e)}}class x{constructor(e,t,o,n){l(this,"username");l(this,"fullname");l(this,"email");l(this,"id");this.username=e,this.fullname=t,this.email=o,this.id=n}}const _={protocol:"https",host:"localhost",port:3001};async function h(d,e){return await fetch(d,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}class V{constructor(){l(this,"host");l(this,"port");l(this,"protocol");this.host=_.host,this.port=_.port,this.protocol=_.protocol}address(e){return`${this.protocol}://${this.host}:${this.port}/api/${e}`}registerRequest(e,t,o){return new Promise(async(n,i)=>{const c=await(await h(this.address("users/register"),{clientid:e,username:t.username,email:t.email,fullname:t.fullname,password:o})).json();n({success:c.error==null,error:c.error})})}loginRequest(e,t,o){return new Promise(async(n,i)=>{const c=await(await h(this.address("users/login"),{username:t,password:o,clientid:e})).json();n({success:c.error==null,error:c.error})})}isLogged(e){return new Promise(async(t,o)=>{const i=await(await h(this.address("users/islogged"),{clientid:e})).json();if(!i.result)t(void 0);else{const a=i.user;t(new x(a.username,a.fullname,a.email,a.id))}})}logOut(e){return new Promise(async(t,o)=>{await(await h(this.address("users/logout"),{clientid:e})).json(),t()})}savePuzzle(e,t,o,n,i){return new Promise(async(a,c)=>{const m=await(await h(this.address("puzzles/save"),{clientid:e,id:t.getId(),name:t.getSettings().name,author:o.fullname,authorid:o.id,content:t.stringify(),image:n,code:i})).json(),p={success:m.error===void 0,error:m.error};a(p)})}fetchPuzzles(e,t,o,n){return new Promise(async(i,a)=>{const m=(await(await h(this.address("puzzles/find"),{clientid:e,query:"",limit:o,offset:n,access:t})).json()).map(p=>({author:p.author,id:p.id,img:p.img,name:p.name,rating:p.rating,code:p.code}));i(m)})}findByCode(e){return new Promise(async(t,o)=>{const i=await(await h(this.address("puzzles/code"),{code:e})).json();if(!i.result.id)t(void 0);else{const a={author:i.result.author,id:i.result.id,img:i.result.img,name:i.result.name,rating:i.result.rating,code:i.result.code};t(a)}})}findPuzzles(e,t){return new Promise(async(o,n)=>{const i=e=="-"?"public":"private",u=(await(await h(this.address("puzzles/find"),{clientid:e,query:t,limit:1e3,offset:0,access:i})).json()).map(m=>({author:m.author,id:m.id,img:m.img,name:m.name,rating:m.rating,code:m.code}));o(u)})}getContent(e,t){return new Promise(async(o,n)=>{const a=await(await h(this.address("puzzles/content"),{clientid:e,id:t})).json();o({response:a.result,error:a.error})})}publish(e,t,o){return new Promise(async(n,i)=>{const c=await(await h(this.address("puzzles/publish"),{clientid:e,id:t,public:o})).json();n({success:c.error==null,error:c.error})})}remove(e,t){return new Promise(async(o,n)=>{const a=await(await h(this.address("puzzles/remove"),{clientid:e,id:t})).json();o({success:a.error==null,error:a.error})})}getCostumes(){return new Promise(async(e,t)=>{const n=await(await h(this.address("costumes"),{})).json();e(n.map(i=>({name:i.split(".")[0],path:`./costumes/${i}`,tags:[i]})))})}}class R{constructor(){l(this,"key");l(this,"id");this.id=null,this.key="cq-client-id",this.init()}init(){this.id=localStorage.getItem(this.key),this.id||(localStorage.setItem(this.key,b()),this.init())}get(){return this.id}}const N=`
	<div class="notif-bg">
		<div class="notif-window">
			<div class="notif-header">
				<a hfref="javascript:void(0)"  id="notif-close-button"><img src="./images/icons/cq-close.png"></a>
			</div>
			<div class="notif-color"></div>
			<div class="notif-message-container">
				<p id="notif-placeholder"><p>
			</div>
			<div class="notif-color"></div>
			<div class="notif-button-container">
				<button class="notif-button" id="notif-button-ok">OK</button>
				<button class="notif-button" id="notif-button-yes">Ano</button>
				<button class="notif-button" id="notif-button-no">Ne</button>
				<button class="notif-button" id="notif-button-cancel">Zrušit</button>
			</div>
		</div>
	</div>
`;class D{constructor(){l(this,"_windowElement");l(this,"_messagePlaceholder");l(this,"_buttonYes");l(this,"_buttonNo");l(this,"_buttonCancel");l(this,"_buttonOk");l(this,"_buttonClose");const e=document.getElementsByTagName("body")[0];this._windowElement=document.createElement("div"),e.appendChild(this._windowElement),this._hide(),T.inject(this._windowElement,N),this._messagePlaceholder=document.getElementById("notif-placeholder"),this._buttonYes=document.getElementById("notif-button-yes"),this._buttonNo=document.getElementById("notif-button-no"),this._buttonCancel=document.getElementById("notif-button-cancel"),this._buttonOk=document.getElementById("notif-button-ok"),this._buttonClose=document.getElementById("notif-close-button")}notify(e,t){return new Promise((o,n)=>{this._show(),this._displayMessage(e),this._showOkButton(()=>{this._hide(),o()})})}dialogue(e,t){return new Promise((o,n)=>{this._show(),this._displayMessage(e),this._showYesNoButton(i=>{this._hide(),o(i)})})}_show(){this._windowElement.style.display="block"}_hide(){this._windowElement.style.display="none"}_showOkButton(e){this._buttonYes.style.display="none",this._buttonNo.style.display="none",this._buttonCancel.style.display="none",this._buttonOk.style.display="block",this._buttonOk.addEventListener("click",e),this._buttonClose.addEventListener("click",e)}_showYesNoButton(e){this._buttonYes.style.display="block",this._buttonNo.style.display="block",this._buttonCancel.style.display="none",this._buttonOk.style.display="none",this._buttonYes.addEventListener("click",()=>{e("yes")}),this._buttonNo.addEventListener("click",()=>{e("no")}),this._buttonCancel.addEventListener("click",()=>{e("no")})}_displayMessage(e){this._messagePlaceholder.innerHTML=e}}export{S as B,R as C,D as N,B as O,y as P,V as S,T,v as a};
