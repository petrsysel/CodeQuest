import { IPuzzleRepository } from "./IPuzzleRepository";
import { ISessionManager } from "./ISessionManager";
import { IUserRepository } from "./IUserRepository";
import expres, { Express, Request, Response } from "express"
import { User } from "./ServerTypes";
import { randomUUID } from "crypto";
import { UserUtils } from "./UserUtils";
import { send } from "process";
import bodyParser from "body-parser"
import { FullPuzzle, generateCode } from "./Puzzle";
import { readFile, readFileSync, readdir } from "fs";
import https, { createServer } from 'https'

export class Server{
	constructor(
		userRepository: IUserRepository,
		puzzleRepository: IPuzzleRepository,
		sessionManager: ISessionManager,
		express: Express 
	){
		
		const server = createServer({
			key: readFileSync('./certs/key-pem'),
			cert: readFileSync('./certs/cert-pem'),

			maxVersion: 'TLSv1.3',
			minVersion: 'TLSv1.2'
		}, express)

		const port: number = +(process.env.PORT || 3000)
		const hostname = process.env.HOST || 'localhost'

		express.use(bodyParser.json())
		express.use(expres.json({limit: '50mb'}));
		express.use(expres.urlencoded({limit: '50mb'}));
		express.use((req, res, next) => {
			res.socket?.setNoDelay(true)
			res.append('Access-Control-Allow-Origin', ['*'])
			res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
			res.append('Access-Control-Allow-Headers', 'Content-Type')
			next()
		});

		express.listen(port, hostname, () => {
			console.log(`Server is listening on http://${hostname}:${port}`)
		})

		// express.get('/', (req, res) => {
		// 	// res.redirect('http://localhost:5173')	// platform page
		// })
		express.use(expres.static('public'))
		// express.use()
		express.get('/api', (req, res) => {
			readFile('./assets/api.html', (err, data) => {
				if(err) {
					res.send(err)
				}
				else{
					res.send(data.toString())
				}
			})
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
					console.error(err)
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
		
		express.post('/api/puzzles/save', (req, res) => {
			const clientId = req.body.clientid
			const user = sessionManager.isLogged(clientId)

			const puzzle: FullPuzzle = {
				id: 		req.body.id,
				name: 		req.body.name,
				author: 	req.body.author,
				authorid: 	req.body.authorid,
				content: 	req.body.content,
				image: 		req.body.image,
				code: 		req.body.code
			}
			
			if(!user || user.id !== puzzle.authorid){
				res.send({
					error: "User not logged in."
				})
				return
			}
			
			puzzleRepository.save(puzzle).then(() => {
				res.send({
					result: "ok"
				})
			}).catch(err => {
				res.send({
					error: err
				})
			})
		})
		express.post('/api/puzzles/find', (req, res) => {
			const clientid = 	req.body.clientid
			const query = 		req.body.query
			const limit = 		req.body.limit
			const offset = 		req.body.offset
			const access = 		req.body.access //public/private

			const user = access === 'private' ? sessionManager.isLogged(clientid) : undefined

			puzzleRepository.find(query, offset, limit, user?.id).then(result => {
				res.send(result)
			})
			.catch(err => {
				res.send({
					error: err
				})
			})
		})
		express.post('/api/puzzles/content', async (req, res) => {
			const id = req.body.id
			const clientid = req.body.clientid

			const puzzle = await puzzleRepository.getById(id)
			if(!puzzle){
				res.send({
					error: "Puzzle doesnt exist"
				})
				return
			}
			const isPrivate = puzzle.code == undefined
			
			const user = sessionManager.isLogged(clientid)
			if(isPrivate && (!user || user.id !== puzzle.authorid)){
				res.send({
					error: "Access denied."
				})
				return
			}
			else{
				res.send({
					result: puzzle.content
				})
			}
		})
		express.post('/api/puzzles/publish', async (req, res) => {
			const clientid = req.body.clientid
			const id = req.body.id
			const isPublic = req.body.public

			const user = sessionManager.isLogged(clientid)
			const puzzle = await puzzleRepository.getById(id)

			if(!puzzle || !user || puzzle.authorid !== user.id){
				res.send({
					error: "Access denied."
				})
				return
			}
			const code = isPublic ? generateCode() : undefined
			puzzleRepository.publish(puzzle.id, code)
			res.send({
				result: "ok"
			})
		})
		express.post('/api/puzzles/remove', async (req, res) => {
			const clientid = req.body.clientid
			const id = req.body.id

			const user = sessionManager.isLogged(clientid)
			const puzzle = await puzzleRepository.getById(id)

			if(!puzzle || !user || puzzle.authorid !== user.id){
				res.send({
					error: "Access denied."
				})
				return
			}
			puzzleRepository.remove(puzzle.id)
			res.send({
				result: "ok"
			})
		})
		express.post('/api/puzzles/code', (req, res) => {
			const code = req.body.code

			puzzleRepository.getByCode(code)
			.then(result => {
				res.send({
					result: result
				})
			})
			.catch(err => {
				res.send({
					error: err
				})
			})
		})
		express.post('/api/costumes', (req, res) => {
			
			readdir('./public/costumes',{}, (err, files) => {
				res.send(files)
			})
			
		})
	}
}