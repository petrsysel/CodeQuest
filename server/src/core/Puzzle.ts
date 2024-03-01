import { UserId } from "./ServerTypes"

export type PuzzleId = string
export type Puzzledata = string

export type PuzzleInfo = {
	name: string,
    author: string,
	authorId: UserId
    rating: string,
    id: PuzzleId
    code?: string,
    img: string
}
export type FullPuzzle = {
    id: string,
	name: string,
	author: string,
	authorid: string,
	content: string,
	image?: string,
	code?: string,
}