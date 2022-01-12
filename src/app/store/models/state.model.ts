import { Location } from "./location.model";
import { LocationItem } from "./location-item.model";

export interface AppState {
	readonly locationItems: Array<LocationItem>;
	readonly locationList: Array<LocationItem>
}