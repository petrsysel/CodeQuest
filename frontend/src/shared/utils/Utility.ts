export class Utility{
    static createHTMLIconButton(iconSrc: string, id:string = ""){
        let button = document.createElement('a')
        if(id) button.id = id
        button.href = "javascript:void(0)"
        button.innerHTML =  `<img src="${iconSrc}">`
        return button
    }

    static getRuleCheckCode(){
        return `if(typeof checkRule === "function") await checkRule();\n`
    }
}