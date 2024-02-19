export interface IDialogue<T>{
    show(errorMsg?: string): Promise<T | undefined>
}