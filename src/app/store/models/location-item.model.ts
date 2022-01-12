import { CurrentConditions } from "./current-conditions.model";
import { Forecast } from "./forecast.model";
import { Location } from "./location.model";

export interface LocationItem {
	id: string;
	location: Location;
	current: CurrentConditions;
	forecast: Forecast;
}