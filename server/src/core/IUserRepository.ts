import { User, UserId } from "./ServerTypes";

export interface IUserRepository{
	save(user: User): Promise<void>
	get(id: UserId): Promise<User>
}