import { RowDataPacket } from "mysql2";

export default interface UserModel extends RowDataPacket{
	id: string,
	username: string,
	email: string,
	fullname?: string,
	passwordhash: string
}