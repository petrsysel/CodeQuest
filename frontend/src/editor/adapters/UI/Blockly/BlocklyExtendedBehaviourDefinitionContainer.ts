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
		javascriptGenerator.forBlock['jump'] = function(block: any, generator: any) {
			var code = `new JumpAction(),`;
			return code
		}
		javascriptGenerator.forBlock['turn'] = function(block: any, generator: any) {
			const side = block.getFieldValue('turn_side')
			var code = `new TurnAction('${side}'),`;
			return code
		}
		javascriptGenerator.forBlock['set_direction'] = function(block: any, generator: any) {
			const direction = generator.valueToCode(block, 'direction', javascript.Order.ATOMIC);
			var code = `new SetDirectionAction(${direction}),`;
			return code
		}
		javascriptGenerator.forBlock['direction_pick'] = function(block: any, generator: any) {
			const side = block.getFieldValue('direction');
			var code = `new DirectionPickAction('${side}')`;
			return [code, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['jump_to'] = function(block: any, generator: any) {
			const x = generator.valueToCode(block, 'x_position', javascript.Order.ATOMIC);
			const y = generator.valueToCode(block, 'y_position', javascript.Order.ATOMIC);
			var code = `new JumpToAction(${x}, ${y}),`;
			return code
		}
		javascriptGenerator.forBlock['position_x'] = function(block: any, generator: any) {
			var code = `new GetXAction()`;
			return [code, javascriptGenerator.ORDER_NONE];
		}
		javascriptGenerator.forBlock['position_y'] = function(block: any, generator: any) {
			var code = `new GetYAction()`;
			return [code, javascriptGenerator.ORDER_NONE];
		}
		javascriptGenerator.forBlock['direction'] = function(block: any, generator: any) {
			var code = `new GetDirectionAction()`;
			return [code, javascriptGenerator.ORDER_NONE];
		}
		javascriptGenerator.forBlock['change_costume'] = function(block: any, generator: any) {
			const costumeName = generator.valueToCode(block, 'costume_name', javascript.Order.ATOMIC);
			var code = `new ChangeCostumeAction(${costumeName}),`;
			return code
		}
		javascriptGenerator.forBlock['show'] = function(block: any, generator: any) {
			var code = `new ShowAction(),`;
			return code
		}
		javascriptGenerator.forBlock['hide'] = function(block: any, generator: any) {
			var code = `new HideAction(),`;
			return code
		}
		javascriptGenerator.forBlock['set_layer'] = function(block: any, generator: any) {
			const layer = generator.valueToCode(block, 'layer', javascript.Order.ATOMIC);
			var code = `new SetLayerAction(${layer}),`;
			return code
		}

		javascriptGenerator.forBlock['logic_boolean'] = function(block: any, generator: any){
			const text = block.getFieldValue('BOOL')
			const value = text == "TRUE" ? true : false
			return [`new BooleanAction(${value})`, javascript.Order.ATOMIC]
		}

		// Operations: EQ, NEQ, LT, LTE, GT, GTE
		javascriptGenerator.forBlock['logic_compare'] = function(block: any, generator: any){
			const operation = block.getFieldValue('OP')
			const operandA = generator.valueToCode(block, 'A', javascript.Order.ATOMIC);
			const operandB = generator.valueToCode(block, 'B', javascript.Order.ATOMIC);
			
			return [`new LogicCompareAction('${operation}', ${operandA}, ${operandB})`, javascript.Order.ATOMIC]
		}

		javascriptGenerator.forBlock['logic_operation'] = function(block: any, generator: any){
			const operation = block.getFieldValue('OP')
			const operandA = generator.valueToCode(block, 'A', javascript.Order.ATOMIC);
			const operandB = generator.valueToCode(block, 'B', javascript.Order.ATOMIC);
			
			return [`new LogicOperationAction('${operation}', ${operandA}, ${operandB})`, javascript.Order.ATOMIC]
		}

		javascriptGenerator.forBlock['logic_negate'] = function(block: any, generator: any){
			const expression = generator.valueToCode(block, 'BOOL', javascript.Order.ATOMIC);
			return [`new LogicNegateAction(${expression})`, javascript.Order.ATOMIC]
		}

		javascriptGenerator.forBlock['wait'] = function(block: any, generator: any) {
			var value_turn_count = generator.valueToCode(block, 'turn_count', javascript.Order.ATOMIC);
			var code = `new MutliWaitAction(${value_turn_count}),`;
			return code;
		};
		
		javascriptGenerator.forBlock['controls_if'] = function(block: any, generator: any) {
			/**
			 * IF0 -> DO0
			 * IF1 -> IF1
			 * ...
			 * IFN -> DON
			 * ELSE
			 */
			function getIfDoPairByIndex(i: number){
				const ifStatement = generator.valueToCode(block, `IF${i}`, javascript.Order.ATOMIC)
				if(ifStatement == "") return undefined
				else{
					const doStatement = generator.statementToCode(block, `DO${i}`).replace(new RegExp(',$'), '')
					return `{
						ifStatement: ${ifStatement},
						doStatement: [${doStatement}]
					}`
				}
			}

			const ifDoPairs: string[] = []
			let i = 0
			let ifDoPair
			while((ifDoPair = getIfDoPairByIndex(i)) != undefined){
				ifDoPairs.push(ifDoPair)
				i++
			}
			let ifDoPairsResult = `[${ifDoPairs.join(', ')}]`
			let elseStatementRaw: string = generator.statementToCode(block, `ELSE`)
			let elseStatement = elseStatementRaw == "" ? undefined : 
				`[${elseStatementRaw.replace(new RegExp(',$'), '') }]`


			var code = `new IfAction(${ifDoPairsResult}, ${elseStatement}),`;
			return code;
		};

		javascriptGenerator.forBlock['controls_repeat_ext'] = function(block: any, generator: any) {
			var times = generator.valueToCode(block, 'TIMES', javascript.Order.ATOMIC);
			var doInput = generator.statementToCode(block, 'DO');
			doInput = doInput.replace(new RegExp(';$'), '');

			var code = `new ForAction(${times}, [${doInput}]),`;
			return code;
		};
		javascriptGenerator.forBlock['controls_whileUntil'] = function(block: any, generator: any) {
			var times = generator.valueToCode(block, 'BOOL', javascript.Order.ATOMIC);
			var doInput = generator.statementToCode(block, 'DO');
			doInput = doInput.replace(new RegExp(';$'), '');

			var code = `new ForAction(${times}, [${doInput}]),`;
			return code;
		};
		javascriptGenerator.forBlock['math_number'] = function(block: any, generator: any){
			var number = block.getFieldValue('NUM')
			return [`new NumberAction(${number})`, javascript.Order.ATOMIC]
		}
		// Operations: ADD MINUS MULTIPLY DIVIDE POWER
		javascriptGenerator.forBlock['math_arithmetic'] = function(block: any, generator: any){
			const operation = block.getFieldValue('OP')
			const operandA = generator.valueToCode(block, 'A', javascript.Order.ATOMIC);
			const operandB = generator.valueToCode(block, 'B', javascript.Order.ATOMIC);
			
			return [`new MathArithmeticAction('${operation}', ${operandA}, ${operandB})`, javascript.Order.ATOMIC]
		}
		// Properties: EVEN ODD PRIME WHOLE POSITIVE NEGATIVE DIVISIBLY_BY
		javascriptGenerator.forBlock['math_number_property'] = function(block: any, generator: any){
			
			// block.dispose()
			const property = block.getFieldValue('PROPERTY')
			const numberToCheck = generator.valueToCode(block, 'NUMBER_TO_CHECK', javascript.Order.ATOMIC);
			const divisor = generator.valueToCode(block, 'DIVISOR', javascript.Order.ATOMIC);
			
			return [`new MathPropertyAction('${property}', ${numberToCheck}, ${divisor})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['math_round'] = function(block: any, generator: any){
			const operation = block.getFieldValue('OP')
			const numberToRound = generator.valueToCode(block, 'NUM', javascript.Order.ATOMIC);
			
			return [`new MathRoundAction('${operation}', ${numberToRound})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['math_modulo'] = function(block: any, generator: any){
			const divident = generator.valueToCode(block, 'DIVIDEND', javascript.Order.ATOMIC);
			const divisor = generator.valueToCode(block, 'DIVISOR', javascript.Order.ATOMIC);
			return [`new MathModuloAction(${divident}, ${divisor})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['math_constrain'] = function(block: any, generator: any){
			const value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
			const low = generator.valueToCode(block, 'LOW', javascript.Order.ATOMIC);
			const high = generator.valueToCode(block, 'HIGH', javascript.Order.ATOMIC);
			return [`new MathConstrainAction(${value}, ${low}, ${high})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['math_random_int'] = function(block: any, generator: any){
			const from = generator.valueToCode(block, 'FROM', javascript.Order.ATOMIC);
			const to = generator.valueToCode(block, 'TO', javascript.Order.ATOMIC);
			return [`new MathRandomIntAction(${from}, ${to})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['text'] = function(block: any, generator: any){
			const text = block.getFieldValue('TEXT')
			return [`new TextAction('${text}')`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['text_join'] = function(block: any, generator: any){
			function getIfDoPairByIndex(i: number){
				const valueToAdd: string = generator.valueToCode(block, `ADD${i}`, javascript.Order.ATOMIC)
				if(valueToAdd == "") return undefined
				else{
					return valueToAdd
				}
			}

			let i = 0
			const allValues: string[] = []
			let value
			while((value = getIfDoPairByIndex(i)) != undefined){
				allValues.push(value)
				i++
			}
			let valuesResult = `[${allValues.join(', ')}]`
			
			var code = `new TextJoinAction(${valuesResult})`;
			return [code, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['text_length'] = function(block: any, generator: any){
			const value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
			return [`new TextLengthAction(${value})`, javascript.Order.ATOMIC]
		}
		javascriptGenerator.forBlock['text_isEmpty'] = function(block: any, generator: any){
			const value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
			return [`new TextIsEmptyAction(${value})`, javascript.Order.ATOMIC]
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
		javascriptGenerator.forBlock['game_over'] = function(block: any, generator: any) {
			const message = generator.valueToCode(block, 'game_over_message', javascript.Order.ATOMIC);
			const code = `new GameOverAction(${message}),`;
			return code;
		}
		javascriptGenerator.forBlock['win'] = function(block: any, generator: any) {
			const message = generator.valueToCode(block, 'win_message', javascript.Order.ATOMIC);
			const code = `new WinAction(${message}),`;
			return code;
		}

		javascriptGenerator.forBlock['distance_to'] = function(block: any, generator: any) {
			var targetName = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			
			var code = `new DistanceToAction(${targetName})`;
			return [code, javascript.Order.ATOMIC]
		};
		javascriptGenerator.forBlock['is_touch'] = function(block: any, generator: any) {
			var targetName = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
			var code = `new IsTouchingAction(${targetName})`;
			return [code, javascript.Order.ATOMIC]
		};
		javascriptGenerator.forBlock['in_front_of_me'] = function(block: any, generator: any) {
			var targetName = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);

			var code = `new IsInFrontOfMeAction(${targetName})`;
			return [code, javascript.Order.ATOMIC]
		};
		javascriptGenerator.forBlock['variables_set'] = function(block: any, generator: any) {
			var value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
			const name = block.getFieldValue('VAR')
			
			var code = `new SetVariableAction('${name}', ${value}),`;
			return code
		};
		javascriptGenerator.forBlock['math_change'] = function(block: any, generator: any) {
			var value = generator.valueToCode(block, 'DELTA', javascript.Order.ATOMIC);
			const name = block.getFieldValue('VAR')
			
			var code = `new ChangeVariableAction('${name}', ${value}),`;
			return code
		};
		javascriptGenerator.forBlock['variables_get'] = function(block: any, generator: any) {
			const name = block.getFieldValue('VAR')
			
			var code = `new GetVariableAction('${name}')`;
			return [code, javascript.Order.ATOMIC]
		};
		javascriptGenerator.forBlock['procedures_defnoreturn'] = function(block: any, generator: any) {
			const name = block.getFieldValue('NAME')
			const body = generator.statementToCode(block, `STACK`).replace(new RegExp(',$'), '')
			
			
			var code = `new FunctionAction('${name}', [${body}]),`;
			return code
		};
		javascriptGenerator.forBlock['procedures_callnoreturn'] = function(block: any, generator: any) {
			const variables: [] = block.getVarModels()
			const name = block.getFieldValue('NAME')

			let args = ""
			for (let i = 0; i < variables.length; i++) {
				args += generator.valueToCode(block, `ARG${i}`, javascript.Order.ATOMIC) + ",";
			}
			args = args.replace(new RegExp(',$'), '')
			var seen:any = [];

			const tinyVariables = variables.map((v:any) => {
				return {
					id: v.id_,
					name: v.name
				}
			})
			const code = `new CallMethodAction('${name}', ${JSON.stringify(tinyVariables)}, [${args}]),`;
			return code
		};

		javascriptGenerator.forBlock['procedures_ifreturn'] = function(block: any, generator: any) {
			const root = block.getRootBlock().getFieldValue("NAME")
			const condition = generator.valueToCode(block, `CONDITION`, javascript.Order.ATOMIC)
			const value = generator.valueToCode(block, `VALUE`, javascript.Order.ATOMIC)

			const code = `new ReturnFunctionAction('${root}', ${condition}, ${value}),`;
			
			return code
		};
		
		javascriptGenerator.forBlock['procedures_defreturn'] = function(block: any, generator: any) {
			const name = block.getFieldValue('NAME')
			const body = generator.statementToCode(block, `STACK`).replace(new RegExp(',$'), '')
			const returnValue = generator.valueToCode(block, 'RETURN', javascript.Order.ATOMIC)
			
			const code = `new FunctionAction('${name}', [${body}], ${returnValue}),`;
			return code
		}

		javascriptGenerator.forBlock['procedures_callreturn'] = function(block: any, generator: any) {
			const variables: [] = block.getVarModels()
			const name = block.getFieldValue('NAME')

			let args = ""
			for (let i = 0; i < variables.length; i++) {
				args += generator.valueToCode(block, `ARG${i}`, javascript.Order.ATOMIC) + ",";
			}
			args = args.replace(new RegExp(',$'), '')

			const tinyVariables = variables.map((v:any) => {
				return {
					id: v.id_,
					name: v.name
				}
			})
			const code = `new CallFunctionAction('${name}', ${JSON.stringify(tinyVariables)}, [${args}])`;
			
			return [code, javascript.Order.ATOMIC]
		}

		javascriptGenerator.forBlock['rule_check'] = function(block: any, generator: any) {
			const body = generator.statementToCode(block, `rule_check_body`).replace(new RegExp(',$'), '')
			
			const code = `new RuleCheckAction([${body}]),`;
			return code
		}
	}
}