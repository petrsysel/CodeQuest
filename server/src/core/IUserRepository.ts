import { User, UserId } from "./ServerTypes";

export type UserRepoFilter = "id" | "username" | "email"
export interface IUserRepository{
	init(): Promise<void>
	save(user: User): Promise<void>
	find(filter: UserRepoFilter, query: string): Promise<User | undefined>
}