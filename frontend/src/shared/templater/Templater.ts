type HtmlTemplate = string

class Templater{
    static inject(destination: string, template: HtmlTemplate): boolean
    static inject(destination: HTMLElement, template: HtmlTemplate): boolean
    static inject(destination: string | HTMLElement, template: HtmlTemplate){
        let destinationElement = typeof destination === "string" ? document.getElementById(destination) : destination
        if(!destinationElement) throw Error(`Placeholder ${destination} does not exist`)
        destinationElement.innerHTML = template
        return true
    }
}