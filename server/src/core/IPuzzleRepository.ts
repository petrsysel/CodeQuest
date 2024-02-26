import { PuzzleId, PuzzleInfo, Puzzledata } from "./Puzzle";
import { UserId } from "./ServerTypes";

export interface IPuzzleRepository {
	save(info: PuzzleInfo, data: Puzzledata): Promise<void>
	getByAuthor(id: UserId): Promise<PuzzleInfo[]>
	getByCode(code: string): Promise<PuzzleInfo | undefined>
	getById(id: PuzzleId): Promise<PuzzleInfo>
	fetch(index: number, amount: number, author?: UserId): Promise<PuzzleInfo[]>
	find(query: string, index: number, amount: number): Promise<PuzzleInfo[]>
}