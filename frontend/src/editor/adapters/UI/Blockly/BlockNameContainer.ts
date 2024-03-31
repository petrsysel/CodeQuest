export class BlockNameContainer{
	private static names = new Map([
		["nazev_typu", "Jméno bloku"],
		["go_forward", "Jdi vpřed"],
		["go_forward_by", "Jdi vpřed o"],
		["jump", "Skoč"],
		["turn", "Otoč se"],
		["set_direction", "Nastav směr"],
		["jump_to", "Skoč na"],
		["direction_pick", "Výběr směru"],
		["position_x", "Pozice x"],
		["position_y", "Pozice y"],
		["direction", "Směr"],
		["say", "Řekni"],
		["change_costume", "Změň kostým"],
		["change_background", "Změň pozadí"],
		["show", "Ukaž se"],
		["hide", "Skryj se"],
		["set_layer", "Nastav vrstvu"],
		["controls_repeat_ext", "Opakuj x krát"],
		["controls_whileUntil", "Opakuj dokud"],
		["controls_flow_statements", "Přeruš cyklus"],
		["controls_if", "Podmínka když"],
		["logic_compare", "Logické porovnání"],
		["logic_operation", "Logické operátory"],
		["logic_negate", "Negace"],
		["logic_boolean", "Pravdivostní hodnoty"],
		["logic_null", "Null"],
		["logic_ternary", "Ternární operátor"],
		["math_number", "Číslo"],
		["math_arithmetic", "Aritmetické operátory"],
		["math_single", "Sqrt, abs, atd."],
		["math_trig", "Goniometrické funkce"],
		["math_constant", "Konstanty"],
		["math_number_property", "Vlastnosti čísla"],
		["math_round", "Zaokrouhlování"],
		["math_on_list", "Operace se seznamy"],
		["math_modulo", "Zbytek po dělení"],
		["math_constrain", "Omezení rozsahu"],
		["math_random_int", "Náhodné celé číslo"],
		["math_random_float", "Náhodné desetinné číslo"],
		["text", "Text"],
		["text_join", "Spoj"],
		["text_length", "Délka textu"],
		["text_isEmpty", "Test prázdného textu"],
		["text_changeCase", "Změna na velká/malá písměna"],
		["text_trim", "Odstranění mezer z konců textu"],
		["on_start", "Po startu"],
		["send_message", "Vyšli zprávu"],
		["on_message_recieve", "Po přijetí zprávy"],
		["win", "Výtězství"],
		["game_over", "Prohra"],
		["rule_check", "Kontrola pravidel"],
		["wait", "Čekej"],
		["distance_to", "Vzdálenost k"],
		["is_touch", "Dotýkáš se..."],
		["in_front_of_me", "Je před tebou..."],
		["lists_create_with", "Vytvoř seznam"],
		["lists_repeat", "Vytvoř seznam plný..."],
		["lists_length", "Délka seznamu"],
		["lists_isEmpty", "Test prázdného seznamu"],
		["lists_indexOf", "Index objektu v listu"]
	])
	static getName(type: string){
		let name = this.names.get(type)
		return name? name : type
	}
}