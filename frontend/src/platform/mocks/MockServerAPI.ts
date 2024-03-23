import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle";
import { ClientID } from "../core/ClientID";
import { IServerAPI, LoginResponse, RegisterResponse, SavePuzzleResponse, StoredPuzzleInfo } from "../core/IServerAPI";
import { User } from "../core/User";
import { getQuestionMarkImg } from "./getQuestionmarkImg";

const MockSavedPuzzles: StoredPuzzleInfo[] = [
    {
        id: "5b06bcf5-bdc5-403e-a133-08e16fb4d3ce",
        author: "Petr Sysel",
        name: "Hledání klíče",
        rating: '5',
        code: 'AE5TL9',
        img: getQuestionMarkImg()
    },
    {
        id: "a6a09584-3f01-4c2c-9ce6-4469cf0ba37f" ,
        author: "Petr Sysel",
        name: "Najdi cestu z bludiště",
        rating: '5',
        code: '5TZ6UV',
        img: getQuestionMarkImg()
    },
    {
        id: "6ab63a21-1f55-450b-85c9-616a4399b90b" ,
        author: "Petr Sysel",
        name: "Tři klíče a dvoje dveře",
        rating: '5',
        code: 'PVU1W2',
        img: getQuestionMarkImg()
    },
    {
        id: "2096c063-93ab-46b9-9e66-52117bb0fd5c" ,
        author: "Petr Sysel",
        name: "Kouzelník a jáma",
        rating: '5',
        code: 'PVU1W2',
        img: getQuestionMarkImg()
    }
]

export class MockServerAPI implements IServerAPI{
    
    constructor(){

    }

    fetchPuzzles(id: ClientID, amount?: number | undefined, offset?: number | undefined): Promise<StoredPuzzleInfo[]> {
        return new Promise((resolve, reject) => {
            resolve([...MockSavedPuzzles])
        })
    }
    findByCode(puzzleCode: string): Promise<StoredPuzzleInfo | undefined> {
        return new Promise((resolve, reject) => {
            resolve(
                MockSavedPuzzles.find(p => p.code === puzzleCode)
            )
        })
    }
    findPuzzles(id: ClientID, query: string): Promise<StoredPuzzleInfo[]> {
        return new Promise((resolve, reject) => {
            resolve([...MockSavedPuzzles])
        })
    }
    isLogged(id: ClientID): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            let user: User | undefined = {
                email: 'petrsysel99@gmail.com',
                fullname: 'Petr Sysel',
                username: 'petrsysel'
            }
            user = undefined
            resolve(user)
        })
    }
    logOut(id: ClientID): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
    loginRequest(id: ClientID, username: string, password: string): Promise<LoginResponse> {
        return new Promise((resolve, reject) => {
            resolve({
                success: true
            })
        })
    }
    registerRequest(id: ClientID, user: User, password: string): Promise<RegisterResponse> {
        return new Promise((resolve, reject) => {
            resolve({
                success: true
            })
        })
    }
    savePuzzle(id: ClientID, puzzle: Puzzle): Promise<SavePuzzleResponse> {
        return new Promise((resolve, reject) => {
            resolve({
                success: true
            })
        })
    }
}