export type GameMessageCallback = {
	id: string,
	message: string,
	callback: () => void
}