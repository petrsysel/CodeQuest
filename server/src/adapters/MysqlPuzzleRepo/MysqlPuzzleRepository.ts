import { Connection, ResultSetHeader } from "mysql2";
import { IPuzzleRepository } from "../../core/IPuzzleRepository";
import { FullPuzzle, PuzzleInfo } from "../../core/Puzzle";
import { readFile } from "fs";
import PuzzleModel from "./model/puzzle.model";

export class MysqlPuzzleRepository implements IPuzzleRepository{
	private connection: Connection

	constructor(connection: Connection){
		this.connection = connection
		this.init()
	}

	init(): Promise<void> {
		return new Promise((resolve, reject) => {
			readFile('./assets/puzzle.sql', (err, data) => {
				if(err) return
				this.connection.query(data.toString(), (err, result) => {
					if(err) console.error(err)
				})
			})
		})
	}
	async save(puzzle: FullPuzzle): Promise<void> {
		const existing = await this.getById(puzzle.id)
		return new Promise((resolve, reject) => {
			if(existing){
				console.log(`Updating puzzle: ${puzzle.name}`)
				this.connection.query(
					`UPDATE puzzles SET name=?, content=?,image=?, code=? WHERE id=?`,
					[puzzle.name, puzzle.content, puzzle.image, puzzle.code, puzzle.id],
					(err, result) => {
						if(err) reject(err)
						else resolve()
					}
				)
			}
			else{
				console.log(`Saving new puzzle: ${puzzle.name}`)
				this.connection.query<ResultSetHeader>(
					`INSERT INTO puzzles (id, name, author, authorid, content, image, code) VALUES(?,?,?,?,?,?,?)`,
					[
						puzzle.id,
						puzzle.name,
						puzzle.author,
						puzzle.authorid,
						puzzle.content,
						puzzle.image,
						puzzle.code
					],
					(err, result) => {
						if(err) reject(err)
						else resolve()
					}
				)
			}
			
		})
	}

	find(query: string, offset: number, limit: number, authorId?: string): Promise<PuzzleInfo[]> {
		return new Promise((resolve, reject) => {
			const filter = authorId ? `authorid=?`:'code IS NOT NULL'
			const queryString = `%${query}%`
			const values = authorId ? [authorId, queryString, queryString, limit, offset] : [queryString, queryString, limit, offset]
			
			this.connection.query<PuzzleModel[]>(
				`SELECT * FROM puzzles WHERE ${filter} AND (LOWER(name) LIKE LOWER(?) OR LOWER(author) LIKE LOWER(?)) ORDER BY date DESC LIMIT ? OFFSET ?`,
				values,
				(err, result) => {
					if(err) reject(err)
					else{
						const puzzleInfoList = result.map(p => {
							const puzzleInfo: PuzzleInfo = {
								id: p.id,
								name: p.name,
								author: p.author,
								authorId: p.authorid,
								img: p.image || '',
								rating: '-',
								code: p.code
							}
							return puzzleInfo
						})
						resolve(puzzleInfoList)
					}
				}
			)
		})
	}
	getByCode(code: string): Promise<PuzzleInfo | undefined> {
		return new Promise((resolve, reject) => {
			this.connection.query<PuzzleModel[]>(
				`SELECT * from puzzles WHERE LOWER(code)=LOWER(?)`,
				[code],
				(err, result) => {
					if(err) reject(err)
					else{
						if(result.length === 0) resolve(undefined)
						else{
							const puzzle = result[0]
							const info: PuzzleInfo = {
								id: puzzle.id,
								name: puzzle.name,
								author: puzzle.author,
								code: puzzle.code,
								authorId: puzzle.authorid,
								img: puzzle.image || '',
								rating: '-'
							}
							resolve(info)
						}
					}
				}
			)
		})
	}
	getById(id: string): Promise<FullPuzzle | undefined> {
		return new Promise((resolve, reject) => {
			this.connection.query<PuzzleModel[]>(
				`SELECT * from puzzles WHERE id=?`,
				[id],
				(err, result) => {
					if(err) reject(err)
					else{
						if(result.length === 0) resolve(undefined)
						else{
							const puzzle = result[0]
							const info: FullPuzzle = {
								id: puzzle.id,
								name: puzzle.name,
								author: puzzle.author,
								code: puzzle.code,
								image: puzzle.image || '',
								authorid: puzzle.authorid,
								content: puzzle.content
							}
							resolve(info)
						}
					}
				}
			)
		})
	}

	publish(id: string, code?: string | undefined): Promise<void> {
		return new Promise((resolve, reject) => {
			this.connection.query(
				`UPDATE puzzles SET code=? WHERE id=?`,
				[code, id],
				(err, result) => {
					if(err) reject(err)
					else resolve()
				}
			)
		})
	}
	remove(id: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.connection.query(
				`DELETE FROM puzzles WHERE id=?`,
				[id],
				(err, result) => {
					if(err) reject(err)
					else resolve()
				}
			)
		})
	}
}