import { FullPuzzle, PuzzleId, PuzzleInfo, Puzzledata } from "./Puzzle";
import { UserId } from "./ServerTypes";

export interface IPuzzleRepository {
	init(): Promise<void>
	save(puzzle: FullPuzzle): Promise<void>
	getByCode(code: string): Promise<PuzzleInfo | undefined>
	getById(id: PuzzleId): Promise<FullPuzzle | undefined>
	find(query: string, offset?: number, limit?: number, authorId?: string): Promise<PuzzleInfo[]>
	publish(id: PuzzleId, code?: string): Promise<void>
	remove(id: PuzzleId): Promise<void>
}