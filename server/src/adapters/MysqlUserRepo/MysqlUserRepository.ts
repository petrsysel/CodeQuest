import { Connection, ResultSetHeader } from "mysql2";
import { IUserRepository, UserRepoFilter } from "../../core/IUserRepository";
import { User } from "../../core/ServerTypes";
import { readFile } from "fs";
import UserModel from "./model/user.model";

export class MysqlUserRepository implements IUserRepository{
	private connection: Connection

	constructor(connection: Connection){
		this.connection = connection
		connection.on('connection', () => {
			console.log("Database connected succesfuly.")
		})
		connection.on('', (e: any) => {
			console.log("Error on DB:")
			console.log(e)
		})
		this.init() //Musí být v on-connection callbacku!
	}
	init(): Promise<void> {
		return new Promise((resolve, reject) => {
			readFile('./assets/user.sql', (err, data) => {
				if(err) return
				this.connection.query(data.toString(), (err, result) => {
					if(err) console.error(err)
				})
			})
		})
	}

	save(user: User): Promise<void> {
		return new Promise((resolve, reject) => {
			const fullname = user.fullname.length !== 0 ? user.fullname : user.username
			this.connection.query<ResultSetHeader>(
				`INSERT INTO users (id, username, email, fullname, passwordhash) VALUES (?,?,?,?,?);`,
				[user.id, user.username, user.email, fullname, user.passwordHash],
				(err, result) => {
					if(err) reject(err)
					else resolve()
				}
			)
		})
	}
	find(filter: UserRepoFilter, keyword: string): Promise<User | undefined> {
		return new Promise((resolve, reject) => {

			this.connection.query<UserModel[]>(
				`SELECT * FROM users WHERE ${filter}=?`,
				[keyword],
				(err, result) => {
					if(err) reject(err)
					else {
						if(result.length == 0){
							resolve(undefined)
							return
						}
						const model = result[0]
						const user: User = {
							id: model.id,
							username: model.username,
							email: model.email,
							fullname: model.fullname||model.username,
							passwordHash: model.passwordhash
						}
						resolve(user)
					}
				}
			)
		})
	}
}