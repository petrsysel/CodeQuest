import { IPuzzleRepository } from "./IPuzzleRepository";
import { ISessionManager } from "./ISessionManager";
import { IUserRepository } from "./IUserRepository";
import express, { Express, Request, Response } from "express"

export class Server{
	constructor(
		userRepository: IUserRepository,
		puzzleRepository: IPuzzleRepository,
		sessionManager: ISessionManager,
		express: Express 
	){
		
		const port: number = +(process.env.PORT || 3000)
		const hostname = process.env.HOST || 'localhost'

		express.listen(port, hostname, () => {
			console.log(`Server is listening on http://${hostname}:${port}`)
		})

		express.get('/', (req, res) => {
			// res.redirect('http://localhost:5173')
			res.send('hello')
		})
		express.post('/api/login', (req, res) => {

		})
		express.post('/api/register', (req, res) => {
			
		})
		express.post('/api/logout', (req, res) => {
			
		})
	}
}