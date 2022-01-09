import { User } from "../models";
import { UserActionType, UserAction } from "../actions";

const initialState: User = {
	id: '1',
	savedLocations: [
		{
			id: '1',
			nickname: 'Home',
			location: {
				name: 'Idaho Falls',
				region: 'Idaho',
				country: 'United States of America',
				tz_id: 'America/Boise',
				localtime_epoch: 1641452574,
				localtime: '2022-01-05 19:24'
			},
			current: {
				last_updated_epoch: 1641448800,
				last_updated: '2022-01-05 19:15',
				temp_c: -1.1,
				temp_f: 30.0,
				is_day: 0,
				condition: {
					text: 'Overcast',
					icon: '//cdn.weatherapi.com/weather/64x64/night/122.png',
					code: 1201
				},
				wind_mph: 11.9,
				wind_kph: 19.1,
				wind_degree: 80,
				wind_dir: 'E',
				pressure_mb: 1015.0,
				pressure_in: 29.96,
				precip_mm: 0.0,
				precip_in: 0.0,
				humidity: 60,
				cloud: 100,
				feelslike_c: -3.6,
				feelslike_f: 25.5,
				vis_km: 16.0,
				vis_miles: 9.0,
				uv: 1.0,
				gust_mph: 6.5,
				gust_kph: 10.4
			}
		}
	]
}

export function UserReducer(
	state: User = initialState,
	action: UserAction
) {
	switch (action.type) {
		case UserActionType.ADD_LOCATION:
			return {...state, ...action.payload};
		case UserActionType.DEL_LOCATION:
			return {...state, ...action.payload};
		default:
			return state;
	}
}