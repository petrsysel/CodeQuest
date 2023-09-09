/// <reference types="@types/jest" />

import {JsonPuzzle} from "../../src/adapters/JsonPuzzle"

    let testPuzzle = `
    {
        "name": "test puzzle",
        "settings": {
            "allowed_blocks":[
                "if",
                "for",
                "move",
                "turn",
                "jump"
            ],
            "block_limit": 5,
            "board":{
                "width": 5,
                "height": 9
            }
        },
        "objects":[
            {
                "id": 4587921657,
                "data":{
                    "position":{
                        "x": 2,
                        "y": 9
                    }
                }
            }
        ],
        "code_instructions": [
            {
                "name": "move"
            }
        ]
    }
    `
    let corruptedPuzzle = `
    {
        "name": "test puzzle",
        "settings": {
            "allowed_blocks":[
                "if",
                "for",
                "move",
                "turn"
                "jump"
            ],
            "block_limit": 5,
            "board":{
                "width": 5,
                "height": 9
            }
        },
        "objects":[
            {
                "id": 4587921657,
                "data":{
                    "position":{
                        "x": 2,
                        "y": 9
                    }
                }
            }
        ],
        "code_instructions": [
            {
                "name": "move"
            }
        ]
    `
    let smallPuzzle = `
    {
        "name": "test puzzle",
        "settings": {
            "board":{
                "width": 5,
                "height": 9
            }
        },
        "objects":[
        ],
        "code_instructions": [
        ]
    }
    `
    let smallPuzzleObject = {
        name: "test puzzle",
        settings: {
            board:{
                width: 5,
                height: 9
            }
        },
        objects:[
        ],
        code_instructions: [
        ]
    }

test("empty JsonPuzzle test", () => {
    let emptyPuzzle = new JsonPuzzle("")

    expect(emptyPuzzle.asObject()).toStrictEqual({})
})

test("correct format", () => {
    let rawPuzzle = new JsonPuzzle(testPuzzle).asObject()
    expect(rawPuzzle).not.toStrictEqual({})
})

test("equal objects", () => {
    let rawPuzzle = new JsonPuzzle(smallPuzzle).asObject()
    expect(rawPuzzle).toStrictEqual(smallPuzzleObject)
})

test("corrupted puzzle", () => {
    let rawPuzzle = new JsonPuzzle(corruptedPuzzle).asObject()
    expect(rawPuzzle).toStrictEqual({})
})