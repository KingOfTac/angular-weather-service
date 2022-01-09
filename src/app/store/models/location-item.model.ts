import { CurrentConditions } from "./current-conditions.model";
import { Location } from "./location.model";

export interface LocationItem {
	id: string;
	nickname: string;
	location: Location;
	current: CurrentConditions;
}