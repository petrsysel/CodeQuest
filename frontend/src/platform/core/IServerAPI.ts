import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle";
import { CostumeData, PuzzleId } from "../../shared/puzzle-lib/core/PuzzleTypes";
import { ClientID } from "./ClientID";
import { User } from "./User";

export type ServerAction = {
    success: boolean,
    error?: string,
}
export type ContentResponse = {
    response?: string,
    error?: string
}

export type RegisterResponse = ServerAction
export type LoginResponse = ServerAction
export type SavePuzzleResponse = ServerAction

export type LoginData = {
    username: string,
    password: string
}

export type RegisterData = {
    username: string,
    fullname: string,
    email: string,
    password: string,
    passwordAgain: string
}

export type StoredPuzzleInfo = {
    name: string,
    author: string,
    rating: string,
    id: PuzzleId
    code?: string,
    img: string
}

export type PuzzleAccess = "private" | "public"

export interface IServerAPI {
    isLogged(id: ClientID): Promise<User|undefined>
    registerRequest(id: ClientID, user: User, password: string): Promise<RegisterResponse>
    loginRequest(id: ClientID, username: string, password: string): Promise<LoginResponse>
    logOut(id: ClientID): Promise<void>
    fetchPuzzles(id: ClientID, access: PuzzleAccess, amount?: number, offset?: number): Promise<StoredPuzzleInfo[]>
    findPuzzles(id: ClientID, query: string): Promise<StoredPuzzleInfo[]>
    findByCode(puzzleCode: string): Promise<StoredPuzzleInfo|undefined>
    savePuzzle(id: ClientID, puzzle: Puzzle, author: User, image: string, code: string | null): Promise<SavePuzzleResponse>
    getContent(clientId: ClientID, puzzleId: PuzzleId): Promise<ContentResponse>
    publish(clientId: ClientID, puzzleId: PuzzleId, publish: boolean): Promise<ServerAction>
    remove(clientId: ClientID, puzzleId: PuzzleId): Promise<ServerAction>
    getCostumes(): Promise<CostumeData[]>
}