declare const javascript: any
class BlocklyBehaviourDefinitionContainer {

	static init(){
		//@ts-ignore
		// window.LoopTrap = 1000
		// Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
		
		Blockly.JavaScript.forBlock['go_forward'] = function(block: any, generator: any) {
			var code = `await goForward(actor)\n`;
			return code;
		}
		  
		Blockly.JavaScript.forBlock['jump'] = function(block: any, generator: any) {
			var code = `await jump(actor)\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['turn'] = function(block: any, generator: any) {
			var dropdown_turn_side = block.getFieldValue('turn_side');
			let direction = `"${dropdown_turn_side}"`
			var code = `await turn(actor, ${direction})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['set_direction'] = function(block: any, generator: any) {
			var value_direction = generator.valueToCode(block, 'direction', javascript.Order.NONE);
			console.log(typeof value_direction)
			var code = `await setDirection(actor, ${value_direction})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['jump_to'] = function(block: any, generator: any) {
			var value_x_position = generator.valueToCode(block, 'x_position', javascript.Order.ATOMIC);
			var value_y_position = generator.valueToCode(block, 'y_position', javascript.Order.ATOMIC);
			var code = `await jumpTo(actor, ${value_x_position}, ${value_y_position})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['direction_pick'] = function(block: any, generator: any) {
			var dropdown_direction = block.getFieldValue('direction');
			var code = `"${dropdown_direction}"`
			console.log(code)
			return [code, Blockly.JavaScript.ORDER_ATOMIC];
		};
		
		Blockly.JavaScript.forBlock['position_x'] = function(block: any, generator: any) {
			var code = `await getX(actor)`;
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
		
		Blockly.JavaScript.forBlock['position_y'] = function(block: any, generator: any) {
			var code = `await getY(actor)`;
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
		
		Blockly.JavaScript.forBlock['direction'] = function(block: any, generator: any) {
			var code = `await getDirection(actor)`;
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
		
		Blockly.JavaScript.forBlock['say'] = function(block: any, generator: any) {
			var value_message_to_say = generator.valueToCode(block, 'message_to_say', javascript.Order.ATOMIC);
			var code = `await say(actor, ${value_message_to_say})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['change_costume'] = function(block: any, generator: any) {
			var value_costume_name = generator.valueToCode(block, 'costume_name', javascript.Order.ATOMIC);
			var code = `await changeCostume(actor, ${value_costume_name})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['change_background'] = function(block: any, generator: any) {
			var value_background_name = generator.valueToCode(block, 'background_name', javascript.Order.ATOMIC);
			var code = `await changeBackground(actor, ${value_background_name})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['show'] = function(block: any, generator: any) {
			var code = `await show(actor)\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['hide'] = function(block: any, generator: any) {
			var code = `await hide(actor)\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['set_layer'] = function(block: any, generator: any) {
			var value_layer = generator.valueToCode(block, 'layer', javascript.Order.ATOMIC);
			var code = `await setLayer(actor, ${value_layer})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['on_start'] = function(block: any, generator: any) {
			var code = `// on_start nebude potřeba\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['rule_check'] = function(block: any, generator: any) {
			var statements_rule_check_body = generator.statementToCode(block, 'rule_check_body');
			var code = `async function checkRule(){
				${statements_rule_check_body}\n
			}`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['send_message'] = function(block: any, generator: any) {
			var value_message_name = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
			var code = `await sendMessage(actor, ${value_message_name})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['on_message_recieve'] = function(block: any, generator: any) {
			var value_message_name = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
			var code = `// tohle si musím ještě promyslet\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['wait'] = function(block: any, generator: any) {
			var value_turn_count = generator.valueToCode(block, 'turn_count', javascript.Order.ATOMIC);
			var code = `await wait(actor, ${value_turn_count})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['win'] = function(block: any, generator: any) {
			var value_win_message = generator.valueToCode(block, 'win_message', javascript.Order.ATOMIC);
			var code = `await win(actor, ${value_win_message})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['game_over'] = function(block: any, generator: any) {
			var value_game_over_message = generator.valueToCode(block, 'game_over_message', javascript.Order.ATOMIC);
			var code = `await gameOver(actor, ${value_game_over_message})\n`;
			return code;
		};
		
		Blockly.JavaScript.forBlock['is_touch'] = function(block: any, generator: any) {
			var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			var code = `await isTouch(actor, ${value_object_name})`;
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
		
		Blockly.JavaScript.forBlock['in_front_of_me'] = function(block: any, generator: any) {
			var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			var code = `await isInFrontOfMe(actor, ${value_object_name})`;
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
		
		Blockly.JavaScript.forBlock['distance_to'] = function(block: any, generator: any) {
			var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			var code = `await distanceTo(actor, ${value_object_name})`;
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
	}
}