export interface IDialogue<T>{
    show(errorMsg?: string, preFill?: T): Promise<T | undefined>
    validate(data: T): {
        isValid: boolean,
        error?: string
    }
}