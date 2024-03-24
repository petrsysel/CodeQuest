import { Puzzle } from "../shared/puzzle-lib/core/Puzzle";
import { ContentResponse, IServerAPI, PuzzleAccess, ServerAction, StoredPuzzleInfo } from "./core/IServerAPI";
import { User } from "./core/User";
async function post(api: string, body: any){
	console.log(api)
	return await fetch(api, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
  	})
}
export class ServerApi implements IServerAPI{
	private host: string
	private port: number
	private protocol: 'http' | 'https'
	constructor(){
		this.host = 'localhost'
		this.port = 3000
		this.protocol = 'http'
	}
	private address(api: string){
		return `${this.protocol}://${this.host}:${this.port}/api/${api}`
	}
	registerRequest(id: string, user: User, password: string): Promise<ServerAction> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address('users/register'),{
				clientid: id,
				username: user.username,
				email: user.email,
				fullname: user.fullname,
				password: password
			})
			const data = await response.json()
			console.log(data)
			resolve({
				success: data.error == undefined,
				error: data.error
			})
		})
	}
	loginRequest(id: string, username: string, password: string): Promise<ServerAction> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address('users/login'),{
				username: username,
				password: password,
				clientid: id
			})
			const data = await response.json()
			resolve({
				success: data.error == undefined,
				error: data.error
			})
		})
	}
	isLogged(id: string): Promise<User | undefined> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address('users/islogged'),{
				clientid: id
			})
			const data = await response.json()
			console.log(data)
			if(!data.result) resolve(undefined)
			else{
				const user = data.user
				resolve(new User(
					user.username,
					user.fullname,
					user.email,
					user.id
				))
			}
		})
	}
	logOut(id: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address('users/logout'),{
				clientid: id
			})
			const data = await response.json()
			resolve()
		})
	}
	savePuzzle(id: string, puzzle: Puzzle, user: User, image: string, code: string | null): Promise<ServerAction> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address("puzzles/save"), {
				clientid: id,
				id: puzzle.getId(),
				name: puzzle.getSettings().name,
				author: user.fullname,
				authorid: user.id,
				content: puzzle.stringify(),
				image: image,
				code: code
			})
			const data = await response.json()
			console.log(data)
			const result = {
				success: data.error === undefined,
				error: data.error
			}
			console.log(result)
			resolve(result)
		})
	}
	fetchPuzzles(id: string, access: PuzzleAccess, amount?: number | undefined, offset?: number | undefined): Promise<StoredPuzzleInfo[]> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address("puzzles/find"), {
				clientid: id,
				query: "",
				limit: amount,
				offset: offset,
				access: access
			})
			const data = await response.json()
			const savedPuzzles: StoredPuzzleInfo[] = data.map((res: any) => {
				const puzzle: StoredPuzzleInfo = {
					author: res.author,
					id: res.id,
					img: res.img,
					name: res.name,
					rating: res.rating,
					code: res.code
				}
				return puzzle
			})
			resolve(savedPuzzles)
		})
	}
	findByCode(puzzleCode: string): Promise<StoredPuzzleInfo | undefined> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address("puzzles/code"), {
				code: puzzleCode
			})
			const data = await response.json()
			console.log(data)
			console.log(data.id)
			console.log(!data.id)
			if(!data.result.id) resolve(undefined)
			else{
				console.log("resolving puzzle code")
				const puzzle: StoredPuzzleInfo = {
					author: data.result.author,
					id: data.result.id,
					img: data.result.img,
					name: data.result.name,
					rating: data.result.rating,
					code: data.result.code
				}
				resolve(puzzle)
			}
		})
	}
	findPuzzles(id: string, query: string): Promise<StoredPuzzleInfo[]> {
		return new Promise(async (resolve, reject) => {
			const access = id == '-'? 'public' : 'private'
			const response = await post(this.address("puzzles/find"), {
				clientid: id,
				query: query,
				limit: 1000,
				offset: 0,
				access: access
			})
			const data = await response.json()
			console.log(data)
			const savedPuzzles: StoredPuzzleInfo[] = data.map((res: any) => {
				const puzzle: StoredPuzzleInfo = {
					author: res.author,
					id: res.id,
					img: res.img,
					name: res.name,
					rating: res.rating,
					code: res.code
				}
				return puzzle
			})
			resolve(savedPuzzles)
		})
	}

	getContent(clientId: string, puzzleId: string): Promise<ContentResponse> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address("puzzles/content"), {
				clientid: clientId,
				id: puzzleId
			})
			const data = await response.json()
			
			resolve({
				response: data.result,
				error: data.error
			})
		})
	}
	publish(clientId: string, puzzleId: string, publish: boolean): Promise<ServerAction> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address("puzzles/publish"), {
				clientid: clientId,
				id: puzzleId,
				public: publish
			})
			const data = await response.json()
			
			resolve({
				success: data.error == undefined,
				error: data.error
			})
		})
	}
	remove(clientId: string, puzzleId: string): Promise<ServerAction> {
		return new Promise(async (resolve, reject) => {
			const response = await post(this.address("puzzles/remove"), {
				clientid: clientId,
				id: puzzleId
			})
			const data = await response.json()
			
			resolve({
				success: data.error == undefined,
				error: data.error
			})
		})
	}
}