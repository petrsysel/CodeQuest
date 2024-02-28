import { IPuzzleRepository } from "./IPuzzleRepository";
import { ISessionManager } from "./ISessionManager";
import { IUserRepository } from "./IUserRepository";
import express, { Express, Request, Response } from "express"
import { User } from "./ServerTypes";
import { randomUUID } from "crypto";
import { UserUtils } from "./UserUtils";
import { send } from "process";
import bodyParser from "body-parser"

export class Server{
	constructor(
		userRepository: IUserRepository,
		puzzleRepository: IPuzzleRepository,
		sessionManager: ISessionManager,
		express: Express 
	){
		
		const port: number = +(process.env.PORT || 3000)
		const hostname = process.env.HOST || 'localhost'

		express.use(bodyParser.json())
		express.listen(port, hostname, () => {
			console.log(`Server is listening on http://${hostname}:${port}`)
		})

		express.get('/', (req, res) => {
			// res.redirect('http://localhost:5173')
			res.send('hello')
		})
		express.post('/api/users/login', async (req, res) => {
			const username = req.body.username
			const password = req.body.password
			const clientid = req.body.clientid

			const fail = () => {
				res.send({
					error: "Nesprávné přihlšovací údaje"
				})
			}

			const user = await userRepository.find('username', username)
			if(!user) fail()
			else{
				if(await UserUtils.verify(password, user.passwordHash)){
					res.send({
						result: "ok"
					})
					sessionManager.logIn(clientid, user, 60*60)
				}
				else fail()
			}
		})
		express.post('/api/users/register', async (req, res) => {
			const clientid = req.body.clientid

			const user = await UserUtils.create(req.body)
			const userByMail = await userRepository.find('email', user.email)
			const userByName = await userRepository.find('username', user.username)
			
			if(userByMail) res.send({
				error: "Tento e-mail je již registrovaný"
			})
			else if(userByName) res.send({
				error: "Toto uživatelské jméno je již obsazené"
			})
			else{
				userRepository.save(user).then(() => {
					res.send({
						result: "ok"
					})
					sessionManager.logIn(clientid, user, 60*60)
				}).catch(err=>{
					console.log(err)
					res.send({
						error: "Při registraci došlo k chybě na straně serveru"
					})
				})
			}
		})
		express.post('/api/users/logout', (req, res) => {
			const clientid = req.body.clientid
			sessionManager.logOut(clientid)
			res.send({result: "ok"})
		})
		express.post('/api/users/islogged', (req, res) => {
			const clientid = req.body.clientid
			const user = sessionManager.isLogged(clientid)
			if(!user) res.send({result: false})
			else res.send({	
				result: true,
				user:{
					username: user.username,
					email: user.email,
					fullname: user.fullname,
					id: user.id
				}
			})
		})
	}
}