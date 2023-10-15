class ObjectSettingsValidator {
    static validate(puzzleSettings: PuzzleSettings, newSettings: PuzzleObjectSettings, oldSettings: PuzzleObjectSettings): PuzzleObjectSettings {
        function boundValue(value:number, min:number, max:number){
            let result = value
            if(value < min) result = min
            else if(value > max) result = max
            return result
        }
        let validated: PuzzleObjectSettings = {
            name: newSettings.name ? newSettings.name : oldSettings.name,
            // name: newSettings.name,
            layer: boundValue(newSettings.layer, 0, 99),
            playerEdit: newSettings.playerEdit,
            code: newSettings.code,
            direction: newSettings.direction,
            X: boundValue(newSettings.X, 0, puzzleSettings.sideWidth - 1),
            Y: boundValue(newSettings.Y, 0, puzzleSettings.sideWidth - 1),
            costume: newSettings.costume,
            visible: newSettings.visible
        }
        return validated
    }
}