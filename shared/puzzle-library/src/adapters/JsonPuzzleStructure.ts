function createStructure(){
    return{
        name: "puzzle",
        settings: {
            board: {
                width: 5,
                height: 5
            },
            blockLimit: 5
        },
        objects: [
            {
                data: {
                    x: 0,
                    y: 0
                },
                instructions:[
                    {
                        name: "instruction",
                        description: "instruction description"
                    }
                ]
            }
        ]
    }
}

const typeHelper = createStructure()
export type JsonPuzzleStructure = typeof typeHelper

export function initPuzzleStructure(){
    let output: JsonPuzzleStructure = createStructure()
    output.objects.splice(0,output.objects.length)
    return output
}