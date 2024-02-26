import { User } from "./ServerTypes"

export interface ISessionManager{
	logIn(clientId: string, user: User, timeout: number): void
	logOut(clientId: string): void
	isLogged(clientId: string): User | undefined
}