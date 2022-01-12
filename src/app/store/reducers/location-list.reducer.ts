import { createReducer, on } from "@ngrx/store";
import { LocationItem, Location } from "../models";
import { addLocation, delLocation } from '../actions';


export const initialState: ReadonlyArray<LocationItem> = [];

export const locationListReducer = createReducer(
	initialState,
	on(
		delLocation,
		(state, locationItem) =>
			state.filter((loc) => locationItem.id !== loc.id
		)
	),
	on(
		addLocation,
		(state, locationItem) => {
			if (state.find(loc => loc.id === locationItem.id)) {
				alert(`${locationItem.location.name}, ${locationItem.location.region} has already been added to your list of locations.`);
				return state;
			}

			return [...state, locationItem]
		}
	)
)