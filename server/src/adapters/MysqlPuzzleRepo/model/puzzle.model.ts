import { RowDataPacket } from "mysql2";

export default interface PuzzleModel extends RowDataPacket{
	id: string,
	name: string,
	author: string,
	authorid: string,
	content: string,
	image?: string,
	code?: string,
}