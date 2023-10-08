declare const javascript: any
class BlocklyBehaviourDefinitionContainer {

	static init(){
		Blockly.JavaScript['go_forward'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['jump'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['turn'] = function(block: any, generator: any) {
			var dropdown_turn_side = block.getFieldValue('turn_side');
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['set_direction'] = function(block: any, generator: any) {
			var value_direction = generator.valueToCode(block, 'direction', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['jump_to'] = function(block: any, generator: any) {
			var value_x_position = generator.valueToCode(block, 'x_position', javascript.Order.ATOMIC);
			var value_y_position = generator.valueToCode(block, 'y_position', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['direction_pick'] = function(block: any, generator: any) {
			var dropdown_direction = block.getFieldValue('direction');
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
		  
		  Blockly.JavaScript['position_x'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
		  
		  Blockly.JavaScript['position_y'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
		  
		  Blockly.JavaScript['direction'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
		  
		  Blockly.JavaScript['say'] = function(block: any, generator: any) {
			var value_message_to_say = generator.valueToCode(block, 'message_to_say', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['change_costume'] = function(block: any, generator: any) {
			var value_costume_name = generator.valueToCode(block, 'costume_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['change_background'] = function(block: any, generator: any) {
			var value_background_name = generator.valueToCode(block, 'background_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['show'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['hide'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['set_layer'] = function(block: any, generator: any) {
			var value_layer = generator.valueToCode(block, 'layer', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['on_start'] = function(block: any, generator: any) {
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['rule_check'] = function(block: any, generator: any) {
			var statements_rule_check_body = generator.statementToCode(block, 'rule_check_body');
			// TODO: Assemble javascript into code variable.
			var code = `${statements_rule_check_body}\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['send_message'] = function(block: any, generator: any) {
			var value_message_name = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['on_message_recieve'] = function(block: any, generator: any) {
			var value_message_name = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['wait'] = function(block: any, generator: any) {
			var value_turn_count = generator.valueToCode(block, 'turn_count', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['win'] = function(block: any, generator: any) {
			var value_win_message = generator.valueToCode(block, 'win_message', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['game_over'] = function(block: any, generator: any) {
			var value_game_over_message = generator.valueToCode(block, 'game_over_message', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = `...\n`;
			return code;
		  };
		  
		  Blockly.JavaScript['is_touch'] = function(block: any, generator: any) {
			var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
		  
		  Blockly.JavaScript['in_front_of_me'] = function(block: any, generator: any) {
			var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
		  
		  Blockly.JavaScript['distance_to'] = function(block: any, generator: any) {
			var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			// TODO: Assemble javascript into code variable.
			var code = '...';
			// TODO: Change ORDER_NONE to the correct strength.
			return [code, Blockly.JavaScript.ORDER_NONE];
		  };
	}
}