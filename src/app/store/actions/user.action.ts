import { Action } from "@ngrx/store";
import { User } from "..";

export enum  UserActionType {
	ADD_LOCATION = '[USER] Save Location',
	DEL_LOCATION = '[USER] Delete Location'
}

export class UserAddLocation implements Action {
	readonly type = UserActionType.ADD_LOCATION;

	constructor(public payload: User) {}
}

export class UserDelLocation implements Action {
	readonly type = UserActionType.DEL_LOCATION;

	constructor(public payload: User) {}
}

export type UserAction = UserAddLocation | UserDelLocation;