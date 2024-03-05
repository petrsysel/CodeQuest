import { PuzzleSettings } from "./PuzzleTypes"

export class PuzzleSettingsValidator {
    static validate(newSettings: PuzzleSettings, oldSettings: PuzzleSettings): PuzzleSettings {
        function boundValue(value:number, min:number, max:number){
            let result = value
            if(value < min) result = min
            else if(value > max) result = max
            return result
        }
        let validated: PuzzleSettings = {
            name: newSettings.name ? newSettings.name : oldSettings.name,
            sideWidth: boundValue(newSettings.sideWidth, 2, 10),
			blocks: newSettings.blocks
        }
        return validated
    }
}