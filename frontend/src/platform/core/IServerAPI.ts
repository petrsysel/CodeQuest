import { ClientID } from "./ClientID";
import { User } from "./User";

export type ServerAction = {
    success: boolean,
    error?: string,
}

export type RegisterResponse = ServerAction
export type LoginResponse = ServerAction
export type SavePuzzleResponse = ServerAction

export type StoredPuzzleInfo = {
    name: string,
    author: string,
    rating: string,
    id: PuzzleId
    code?: string
}

export interface IServerAPI {
    isLogged(id: ClientID): Promise<User|undefined>
    registerRequest(id: ClientID, user: User, password: string): Promise<RegisterResponse>
    loginRequest(id: ClientID, username: string, password: string): Promise<LoginResponse>
    logOut(id: ClientID): Promise<void>
    fetchPuzzles(id: ClientID, amount?: number, offset?: number): Promise<StoredPuzzleInfo[]>
    findPuzzles(id: ClientID, query: string): Promise<StoredPuzzleInfo[]>
    findByCode(puzzleCode: string): Promise<StoredPuzzleInfo|undefined>
    savePuzzle(id: ClientID, puzzle: Puzzle): Promise<SavePuzzleResponse>
}