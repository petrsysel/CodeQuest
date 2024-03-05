import { IServerAPI, ServerAction, StoredPuzzleInfo } from "./core/IServerAPI";
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
					user.email
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
	savePuzzle(id: string, puzzle: Puzzle): Promise<ServerAction> {
		return new Promise((resolve, reject) => {

		})
	}
	fetchPuzzles(id: string, amount?: number | undefined, offset?: number | undefined): Promise<StoredPuzzleInfo[]> {
		return new Promise((resolve, reject) => {

		})
	}
	findByCode(puzzleCode: string): Promise<StoredPuzzleInfo | undefined> {
		return new Promise((resolve, reject) => {

		})
	}
	findPuzzles(id: string, query: string): Promise<StoredPuzzleInfo[]> {
		return new Promise((resolve, reject) => {

		})
	}
}