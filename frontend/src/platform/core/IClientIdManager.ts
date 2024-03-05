import { ClientID } from "./ClientID";

export interface IClientIdManager {
	get(): ClientID
}