import { randomUUID } from "crypto";
import { User } from "./ServerTypes";
import bcrypt from 'bcrypt'

export class UserUtils{
	static async create(jsonUser: any): Promise<User>{
		return {
			username: jsonUser.username,
			email: jsonUser.email,
			id: randomUUID(),
			fullname: jsonUser.fullname,
			passwordHash: await bcrypt.hash(jsonUser.password, 10)
		}
	}
	static async verify(password: string, hash: string){
		return await bcrypt.compare(password, hash)
	}
}