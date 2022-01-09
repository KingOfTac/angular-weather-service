import { Action } from "@ngrx/store";
import { LocationItem } from "../models";

export enum LocationActionType {
	ADD_ITEM = '[LOCATION] Add Location'
}

export class AddItemAction implements Action {
	readonly type = LocationActionType.ADD_ITEM;

	constructor(public payload: LocationItem) {}
}

export type LocationAction = AddItemAction;