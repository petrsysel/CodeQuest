import { Connection, ResultSetHeader } from "mysql2";
import { IPuzzleRepository } from "../../core/IPuzzleRepository";
import { FullPuzzle, PuzzleInfo } from "../../core/Puzzle";
import { readFile } from "fs";
import PuzzleModel from "./model/puzzle.model";

export class MysqlPuzzleRepository implements IPuzzleRepository{
	private connection: Connection

	constructor(connection: Connection){
		this.connection = connection
	}

	init(): Promise<void> {
		return new Promise((resolve, reject) => {
			readFile('./src/adapters/MysqlPuzzleRepo/model/puzzle.sql', (err, data) => {
				if(err) return
				this.connection.query(data.toString(), (err, result) => {
					if(err) console.log(err)
					else console.log(result)
				})
			})
		})
	}
	async save(info: PuzzleInfo, data: string): Promise<void> {
		const existing = await this.getById(info.id)

		return new Promise((resolve, reject) => {
			if(existing){
				this.connection.query(
					`UPDATE puzzles SET name=?, content=?,image=?`,
					[info.name, data, info.img],
					(err, result) => {
						if(err) reject(err)
						else resolve()
					}
				)
			}
			else{
				this.connection.query<ResultSetHeader>(
					`INSERT INTO puzzles (id, name, author, authorid, content, image, code) VALUES(?,?,?,?,?,?,?)`,
					[
						info.id,
						info.name,
						info.author,
						info.authorId,
						data,
						info.img,
						info.code
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
			const filter = authorId ? `WHERE authorid=?`:'1=1'
			const values = authorId ? [authorId, query, query, limit, offset] : [query, query, limit, offset]
			this.connection.query<PuzzleModel[]>(
				`SELECT * FROM puzzles WHERE ${filter} AND (name LIKE %?% OR author LIKE %?%) ORDER BY date DESC LIMIT ? OFFSET ?`,
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
				`SELECT * from puzzles WHERE code=?`,
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

	// private modelToInfo(model: PuzzleModel): PuzzleInfo{
	// 	return 
	// }
}