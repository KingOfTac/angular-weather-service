import { LocationItem } from "./location-item.model";
import { User } from "./user.model";

export interface AppState {
	readonly locations: Array<LocationItem>;
	readonly user: User;
}