import { Block } from "../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Templater } from "../../../../shared/templater/Templater"

export class BlocklyToolboxContainer{
	private static _toolboxContent = /*html*/`
  
  <category name="Pohyb" colour="#9fa55b">
  <block type="go_forward" deletable="true" movable="true" editable="true"></block>
  <block type="go_forward_by" deletable="true" movable="true" editable="true">
    <value name="steps">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
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
    <value name="NUMBER_TO_">
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
	`
	static getToolbox(enabledBlocks: Block[]){
    
		let toolbox = document.getElementById('blockly-toolbox') as HTMLElement

    

		Templater.inject(toolbox, this._toolboxContent)
		return toolbox
	}
}