class BlocklyToolboxContainer{
	private static _toolboxContent = /*html*/`
	<category name="Pohyb" colour="#9fa55b">
    <block type="go_forward" deletable="true" movable="true" editable="false"></block>
    <block type="jump" deletable="true" movable="true" editable="false"></block>
    <block type="turn" deletable="true" movable="true" editable="false">
      <field name="turn_side">turn_left</field>
    </block>
    <block type="set_direction" deletable="true" movable="true" editable="false"></block>
    <block type="jump_to" deletable="true" movable="true" editable="false"></block>
    <block type="direction_pick" deletable="true" movable="true" editable="false">
      <field name="direction">up</field>
    </block>
    <block type="position_x" deletable="true" movable="true" editable="false"></block>
    <block type="position_y" deletable="true" movable="true" editable="false"></block>
    <block type="direction" deletable="true" movable="true" editable="false"></block>
  </category>
  <category name="Vzhled" colour="#5b80a5">
    <block type="say" deletable="true" movable="true" editable="false"></block>
    <block type="change_costume" deletable="true" movable="true" editable="false"></block>
    <block type="change_background" deletable="true" movable="true" editable="false"></block>
    <block type="show" deletable="true" movable="true" editable="false"></block>
    <block type="hide" deletable="true" movable="true" editable="false"></block>
    <block type="set_layer" deletable="true" movable="true" editable="false"></block>
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
    <block type="controls_flow_statements">
      <field name="FLOW">BREAK</field>
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
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
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
    <block type="math_single">
      <field name="OP">ROOT</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </block>
    <block type="math_trig">
      <field name="OP">SIN</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </block>
    <block type="math_constant">
      <field name="CONSTANT">E</field>
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
    <block type="math_on_list">
      <mutation op="SUM"></mutation>
      <field name="OP">SUM</field>
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
    <block type="math_random_float"></block>
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
    <block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
  <category name="Události" colour="#a5745b">
    <block type="on_start" deletable="true" movable="true" editable="false"></block>
    <block type="send_message" deletable="true" movable="true" editable="false"></block>
    <block type="on_message_recieve" deletable="true" movable="true" editable="false"></block>
    <block type="win" deletable="true" movable="true" editable="false"></block>
    <block type="game_over" deletable="true" movable="true" editable="false"></block>
    <block type="rule_check" deletable="true" movable="true" editable="false"></block>
    <block type="wait" deletable="true" movable="true" editable="false"></block>
  </category>
  <category name="Vnímání" colour="#5ba58c">
    <block type="distance_to"></block>
    <block type="is_touch" deletable="true" movable="true" editable="false"></block>
    <block type="in_front_of_me" deletable="true" movable="true" editable="false"></block>
  </category>
  <category name="Proměnné" colour="#a55b80" custom="VARIABLE"></category>
  <category name="Seznamy" colour="#995ba5">
    <block type="lists_create_with">
      <mutation items="0"></mutation>
    </block>
    <block type="lists_create_with">
      <mutation items="3"></mutation>
    </block>
    <block type="lists_repeat">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="yr;#3s-wObwR%15af:;a">list</field>
        </block>
      </value>
    </block>
  </category>
  <category name="Funkce" colour="#995ba5" custom="PROCEDURE"></category>
	`
	static getToolbox(){
		let toolbox = document.getElementById('blockly-toolbox') as HTMLElement
		Templater.inject(toolbox, this._toolboxContent)
		return toolbox
	}
}