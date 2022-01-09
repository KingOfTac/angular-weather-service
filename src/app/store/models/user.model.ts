import { LocationItem } from "./location-item.model";

export interface User {
	id: string,
	savedLocations: Array<LocationItem> | undefined;
}