import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpServiceBaseLayer, QueryParams, HttpMethod } from "./service-base-layer";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Location, LocationItem } from "../store";

@Injectable({
	providedIn: 'root'
})
export class LocationService extends HttpServiceBaseLayer {
	constructor(override readonly http: HttpClient) {
		super(environment.weatherEndpoint);
	}

	makeRequest<T>(route: string, query: QueryParams, method: HttpMethod = 'get') {
		return this.request<T>(
			null,
			{},
			route,
			{
				key: environment.weatherKey,
				...query
			}, 
			method
		)
	}

	getLocationsBasedOnSearch(searchString: string): Observable<Array<Location>> {
		return this.makeRequest<Array<Location>>('search.json', { q: searchString })
	}

	getSelectedLocationData(location: Location): Observable<LocationItem> {
		return this.makeRequest<LocationItem>(
			'forecast.json',
			{
				q: `${location.name}, ${location.region}, ${location.country}`,
				days: 3,
			}
		);
	}
}