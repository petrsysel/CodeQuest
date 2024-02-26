export type UserId = string
export type User = {
	id: UserId,
	username: string,
	fullname: string,
	email: string
	passwordHash: string
}