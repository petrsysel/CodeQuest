// declare const javascript: any
import * as Blockly from 'blockly/blocks'

import * as javascript from 'blockly/javascript';
import { Utility } from '../../../../shared/utils/Utility';

const javascriptGenerator = javascript.javascriptGenerator

export class BlocklyExtendedBehaviourDefinitionContainer {

	static init(){
		
		javascriptGenerator.forBlock['go_forward'] = function(block: any, generator: any) {
			var code = `new GoAction(),`;
			return code
		}

		
		javascriptGenerator.forBlock['wait'] = function(block: any, generator: any) {
			var value_turn_count = generator.valueToCode(block, 'turn_count', javascript.Order.ATOMIC);
			var code = `new WaitAction(${value_turn_count}),`;
			return code;
		};
		
		javascriptGenerator.forBlock['controls_repeat_ext'] = function(block: any, generator: any) {
			var times = generator.valueToCode(block, 'TIMES', javascript.Order.ATOMIC);
			var doInput = generator.statementToCode(block, 'DO');
			doInput = doInput.replace(new RegExp(';$'), '');

			var code = `new ForAction(${times}, [${doInput}]),`;
			return code;
		};
		javascriptGenerator.forBlock['math_number'] = function(block: any, generator: any){
			var number = block.getFieldValue('NUM')
			return [`new NumberAction(${number})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['text'] = function(block: any, generator: any){
			const text = block.getFieldValue('TEXT')
			return [`new TextAction('${text}')`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['send_message'] = function(block: any, generator: any){
			const eventName = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC)
			return `new EmitAction(${eventName}),`
		}

		javascriptGenerator.forBlock['on_message_recieve'] = function(block: any, generator: any) {
			var eventName = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
			var doInput = generator.statementToCode(block, 'on_message_body');
			doInput = doInput.replace(new RegExp(';$'), '');

			var code = `new OnEventAction(${eventName}, ${doInput}),`;
			return code;
		};

		
	}
}