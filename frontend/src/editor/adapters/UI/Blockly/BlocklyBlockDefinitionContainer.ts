import Blockly from 'blockly'

export class BlocklyBlockDefinitionContainer{
	private static definitions = [{
		"type": "go_forward",
		"message0": "Jdi vpřed",
		"previousStatement": null,
		"nextStatement": null,
		"colour": 65,
		"tooltip": "Postavička se posune o jedno políčko vpřed",
		"helpUrl": ""
	  },
	  {
		"type": "jump",
		"message0": "Skoč",
		"previousStatement": null,
		"nextStatement": null,
		"colour": 65,
		"tooltip": "Postavička přeskočí políčko před ní.",
		"helpUrl": ""
	  },
	  {
		"type": "turn",
		"message0": "Otoč se %1 %2",
		"args0": [
		  {
			"type": "input_dummy"
		  },
		  {
			"type": "field_dropdown",
			"name": "turn_side",
			"options": [
			  [
				"vlevo",
				"left"
			  ],
			  [
				"vpravo",
				"right"
			  ]
			]
		  }
		],
		"inputsInline": true,
		"previousStatement": null,
		"nextStatement": null,
		"colour": 65,
		"tooltip": "Postavička se otočí o 90˚ vpravo či vlevo",
		"helpUrl": ""
	  },
	  {
		"type": "set_direction",
		"message0": "Nastav směr %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "direction",
			"check": "direction_pick"
		  }
		],
		"inputsInline": true,
		"previousStatement": null,
		"nextStatement": null,
		"colour": 65,
		"tooltip": "Postavička se natočí nastaveným směrem",
		"helpUrl": ""
	  },
	  {
		"type": "jump_to",
		"message0": "Skoč na x: %1 y: %2",
		"args0": [
		  {
			"type": "input_value",
			"name": "x_position",
			"check": "Number"
		  },
		  {
			"type": "input_value",
			"name": "y_position",
			"check": "Number"
		  }
		],
		"inputsInline": true,
		"previousStatement": null,
		"nextStatement": null,
		"colour": 65,
		"tooltip": "",
		"helpUrl": ""
	  },
	  {
		"type": "direction_pick",
		"message0": "směr %1",
		"args0": [
		  {
			"type": "field_dropdown",
			"name": "direction",
			"options": [
			  [
				"nahoru",
				"up"
			  ],
			  [
				"vpravo",
				"right"
			  ],
			  [
				"dolu",
				"down"
			  ],
			  [
				"vlevo",
				"left"
			  ]
			]
		  }
		],
		"output": null,
		"colour": 65,
		"tooltip": "Tímto blokem lze nastavit směr objektům",
		"helpUrl": ""
	  },
	  {
		"type": "position_x",
		"message0": "x",
		"output": "Number",
		"colour": 65,
		"tooltip": "Vrací aktuální souřadnici x",
		"helpUrl": ""
	  },
	  {
		"type": "position_y",
		"message0": "y",
		"output": "Number",
		"colour": 65,
		"tooltip": "Vrací aktuální souřadnici y",
		"helpUrl": ""
	  },
	  {
		"type": "direction",
		"message0": "směr",
		"output": null,
		"colour": 65,
		"tooltip": "Vrací aktuální směr objektu",
		"helpUrl": ""
	  },
	  {
		"type": "say",
		"message0": "Řekni %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "message_to_say",
			"check": "String"
		  }
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 210,
		"tooltip": "Objekt řekne zadaný text",
		"helpUrl": ""
	  },
	  {
		"type": "change_costume",
		"message0": "Změň kostým na %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "costume_name",
			"check": "String"
		  }
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 210,
		"tooltip": "Objekt změní kostým podle zadaného názvu",
		"helpUrl": ""
	  },
	  {
		"type": "change_background",
		"message0": "Změň pozadí %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "background_name",
			"check": "String"
		  }
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 210,
		"tooltip": "Pozadí hry se změní podle zadaného názvu",
		"helpUrl": ""
	  },
	  {
		"type": "show",
		"message0": "Ukaž se",
		"previousStatement": null,
		"nextStatement": null,
		"colour": 210,
		"tooltip": "Pokud byl objekt skrytý, zobrazí se",
		"helpUrl": ""
	  },
	  {
		"type": "hide",
		"message0": "Skryj se",
		"previousStatement": null,
		"nextStatement": null,
		"colour": 210,
		"tooltip": "Pokud byl objekt viditelný, skryje se",
		"helpUrl": ""
	  },
	  {
		"type": "set_layer",
		"message0": "Nastav vrstvu %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "layer",
			"check": "Number"
		  }
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 210,
		"tooltip": "Nastaví vrstvu, na které se objekt nachází",
		"helpUrl": ""
	  },
	  {
		"type": "on_start",
		"message0": "Po startu",
		"nextStatement": null,
		"colour": 330,
		"tooltip": "Základní blok programu. Po začátku hry se provede, co je pod ním",
		"helpUrl": ""
	  },
	  {
		"type": "rule_check",
		"message0": "Kontrola pravidel %1 %2",
		"args0": [
			{
				"type": "input_dummy"
			},
			{
				"type": "input_statement",
				"name": "rule_check_body"
			}
		],
		"colour": 330,
		"tooltip": "Obsah tohoto bloku je volán na konci každého kola. Může definovat pravidla úlohy a podmínky jejího splnění.",
		"helpUrl": ""
	  },
	  {
		"type": "send_message",
		"message0": "Vyšli zprávu %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "message_name",
			"check": "String"
		  }
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 330,
		"tooltip": "Vyšle zprávu, kterou mohou ostatní objekty přijmout.",
		"helpUrl": ""
	  },
	  {
		"type": "on_message_recieve",
		"message0": "Po obdržení zprávy %1 %2",
		"args0": [
		  {
			"type": "input_value",
			"name": "message_name",
			"check": "String"
		  },
		  {
			"type": "input_statement",
			"name": "on_message_body"
			}
		],
		"colour": 330,
		"tooltip": "Pokud obdrží zprávu s uvedeným názvem, vykoná se, co je pod tímto blokem",
		"helpUrl": ""
	  },
	  {
		"type": "wait",
		"message0": "Čekej %1 kol",
		"args0": [
		  {
			"type": "input_value",
			"name": "turn_count",
			"check": "Number"
		  }
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 330,
		"tooltip": "Uvedený počet kol nebude objekt dělat nic",
		"helpUrl": ""
	  },
	  {
		"type": "win",
		"message0": "Výhra! Zpráva pro hráče: %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "win_message",
			"check": "String"
		  }
		],
		"previousStatement": null,
		"colour": 330,
		"tooltip": "Hra končí výtězstvím",
		"helpUrl": ""
	  },
	  {
		"type": "game_over",
		"message0": "Prohra! Zpráva pro hráče: %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "game_over_message",
			"check": "String"
		  }
		],
		"previousStatement": null,
		"colour": 330,
		"tooltip": "Hra končí prohrou",
		"helpUrl": ""
	  },
	  {
		"type": "is_touch",
		"message0": "dotýkáš se %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "object_name",
			"check": "String"
		  }
		],
		"output": "Boolean",
		"colour": 160,
		"tooltip": "Říká, zda se objekt dotýká jiného objektu se zadaným jménem",
		"helpUrl": ""
	  },
	  {
		"type": "in_front_of_me",
		"message0": "je přede mnou %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "object_name",
			"check": "String"
		  }
		],
		"output": "Boolean",
		"colour": 160,
		"tooltip": "Říká, zda se před objektemnachází jiný objekt se zadaným jménem",
		"helpUrl": ""
	  },
	  {
		"type": "distance_to",
		"message0": "vzdálenost k  %1",
		"args0": [
		  {
			"type": "input_value",
			"name": "object_name",
			"check": "String"
		  }
		],
		"output": "Number",
		"colour": 160,
		"tooltip": "Vrací počet políček, které dělí objekt a jiný objektu se zadaným jménem",
		"helpUrl": ""
	}]

	static init(){
		Blockly.defineBlocksWithJsonArray(this.definitions)
	}
}