import { createReducer, on } from "@ngrx/store";
import { retrievedLocationList } from "../actions";
import { LocationItem } from "../models";

const initialState: ReadonlyArray<LocationItem> = []

export const locationReducer = createReducer(
	initialState,
	on(retrievedLocationList, (state, { locationItems }) => locationItems)
);