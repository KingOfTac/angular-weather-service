import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationItem, Location } from '../models';

export const selectLocationItems = createFeatureSelector<ReadonlyArray<LocationItem>>('locationItems');

export const selectLocationListState = createFeatureSelector<ReadonlyArray<Location>>('locationList');

export const selectLocationList = createSelector(
	selectLocationItems,
	selectLocationListState,
	(locationItems, locationList) => {
		return locationList.map((location) =>
			locationItems.find(
				(locationItem) =>
					locationItem.location === location
			)
		)
	}
)