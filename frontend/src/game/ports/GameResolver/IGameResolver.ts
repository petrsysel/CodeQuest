import { Puzzle } from "../../../shared/puzzle-lib/core/Puzzle";
import { GameActor } from "../../core/GameActor";
import { GameRound } from "../../core/GameRound";

export interface IGameResolver {
	resolve(puzzle: Puzzle, actors: GameActor[]): GameRound[]
}