javascript.javascriptGenerator.forBlock['go_forward'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['jump'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['turn'] = function(block, generator) {
  var dropdown_turn_side = block.getFieldValue('turn_side');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['set_direction'] = function(block, generator) {
  var value_direction = generator.valueToCode(block, 'direction', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['jump_to'] = function(block, generator) {
  var value_x_position = generator.valueToCode(block, 'x_position', javascript.Order.ATOMIC);
  var value_y_position = generator.valueToCode(block, 'y_position', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['direction_pick'] = function(block, generator) {
  var dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};

javascript.javascriptGenerator.forBlock['position_x'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};

javascript.javascriptGenerator.forBlock['position_y'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};

javascript.javascriptGenerator.forBlock['direction'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};

javascript.javascriptGenerator.forBlock['say'] = function(block, generator) {
  var value_message_to_say = generator.valueToCode(block, 'message_to_say', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['change_costume'] = function(block, generator) {
  var value_costume_name = generator.valueToCode(block, 'costume_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['change_background'] = function(block, generator) {
  var value_background_name = generator.valueToCode(block, 'background_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['show'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['hide'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['set_layer'] = function(block, generator) {
  var value_layer = generator.valueToCode(block, 'layer', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['on_start'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['rule_check'] = function(block, generator) {
  var statements_rule_check_body = generator.statementToCode(block, 'rule_check_body');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['send_message'] = function(block, generator) {
  var value_message_name = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['on_message_recieve'] = function(block, generator) {
  var value_message_name = generator.valueToCode(block, 'message_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['wait'] = function(block, generator) {
  var value_turn_count = generator.valueToCode(block, 'turn_count', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['win'] = function(block, generator) {
  var value_win_message = generator.valueToCode(block, 'win_message', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['game_over'] = function(block, generator) {
  var value_game_over_message = generator.valueToCode(block, 'game_over_message', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['is_touch'] = function(block, generator) {
  var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};

javascript.javascriptGenerator.forBlock['in_front_of_me'] = function(block, generator) {
  var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};

javascript.javascriptGenerator.forBlock['distance_to'] = function(block, generator) {
  var value_object_name = generator.valueToCode(block, 'object_name', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.javascript.ORDER_NONE];
};