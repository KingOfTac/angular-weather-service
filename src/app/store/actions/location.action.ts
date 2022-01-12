import { createAction, props } from "@ngrx/store";
import { LocationItem, Location } from "../models";

export const addLocation = createAction(
	'[Location List] Add Location Item',
	props<LocationItem>()
);

export const delLocation = createAction(
	'[Location List] Del Location Item',
	props<LocationItem>()
);

export const retrievedLocationList = createAction(
	'[Location List] Retrieve Locations Success',
	props<{ locationItems: ReadonlyArray<LocationItem> }>()
);