import { ISessionManager } from "../core/ISessionManager";
import { User } from "../core/ServerTypes";

export class SessionManager implements ISessionManager{
	private loggedUsers: {
		clientId: string,
		user: User
	}[]

	constructor(){
		this.loggedUsers = []
	}

	logOut(clientId: string): void {
		this.loggedUsers = [...this.loggedUsers.filter(u => u.clientId !== clientId)]
	}
	logIn(clientId: string, user: User, timeout: number): void {
		this.loggedUsers.push({
			clientId: clientId,
			user: user
		})
	}
	isLogged(clientId: string): User | undefined {
		return this.loggedUsers.find(u => u.clientId === clientId)?.user
	}
}