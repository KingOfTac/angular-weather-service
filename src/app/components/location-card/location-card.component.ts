import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CheckableFormAssociatedElement } from '@microsoft/fast-foundation';
import { Store } from '@ngrx/store';
import { AppState, CurrentConditions, Location, LocationItem, ForecastDay, delLocation } from '../../store';

@Component({
	selector: 'weather-data',
	template: `
		<ng-container [ngSwitch]='valueType'>
			<div *ngSwitchCase='"condition"'>
				<app-icon
					class="condition-icon"
					name="weather.{{value.code}}.{{isDay === 1 ? 'day' : 'night'}}.icon" 
					size="huge"></app-icon>
				<div class="condition-text">
					{{value.text}}
				</div>
			</div>
			<div *ngSwitchCase='"date"'>
				{{value | date:dateFormat}}
			</div>
			<div *ngSwitchCase='"simple"'>
				{{value}}
			</div>
			<div *ngSwitchDefault>
				<span>{{value}}<sup style="font-size: 0.5em;">{{valueType}}</sup></span>
			</div>
		</ng-container>
	`,
	styles: [`
		:host {
			div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	`]
})
export class WeatherDataComponent implements OnInit {
	@Input() value: any;
	@Input() label?: string;
	@Input() classList?: Array<string>;
	@Input() visible: boolean;
	@Input() displayLabel: boolean;
	@Input() valueType: string;
	@Input() isDay?: number;
	@Input() dateFormat?: string = 'EEE';
	
	ngOnInit(): void {
		
	}
}

@Component({
	selector: 'location-card',
	templateUrl: './location-card.component.html',
	styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit, AfterViewInit {
	@Input()
	public data: LocationItem;
	public id: string;
	public location: Location;
	public current: CurrentConditions;
	public forecast: Array<ForecastDay>;

	@Input('disable-tools') disableTools: boolean = false;

	@ViewChild('menuRef') menuRef: ElementRef;
	public menuEl: HTMLElement;

	@ViewChild('infoRef') infoRef: ElementRef;
	public infoEl: HTMLElement;
	
	public settings: any = [
		{ prop: 'temp_f', 		area: 'weather', classList: [], label: 'Temperature', 	filterLabel: 'Temperature F', 		visible: true, displayLabel: false, valueType: '°F' },
		{ prop: 'temp_c', 		area: 'weather', classList: [], label: 'Temperature', 	filterLabel: 'Temperature C', 		visible: true, displayLabel: false, valueType: '°C' },
		{ prop: 'condition', 	area: 'weather', classList: [], label: 'Condition', 	filterLabel: 'Condition', 			visible: true, displayLabel: false, valueType: 'condition' },
		{ prop: 'last_updated', area: 'weather', classList: [], label: 'Last Updated', 	filterLabel: 'Last Updated Date', 	visible: false, displayLabel: false, valueType: 'date', dateFormat: 'medium' },
		{ prop: 'wind_mph', 	area: 'detail', classList: [], label: 'Wind', 			filterLabel: 'Wind mph', 			visible: true, displayLabel: true, valueType: 'mph' },
		{ prop: 'wind_kph', 	area: 'detail', classList: [], label: 'Wind', 			filterLabel: 'Wind kph', 			visible: true, displayLabel: true, valueType: 'kph' },
		{ prop: 'wind_dir', 	area: 'detail', classList: [], label: 'Wind Direction', 			filterLabel: 'Wind Direction', 		visible: true, displayLabel: true, valueType: 'simple' },
		{ prop: 'humidity', 	area: 'detail', classList: [], label: 'Humidity', 		filterLabel: 'Humidity', 			visible: true, displayLabel: true, valueType: 'simple' },
		{ prop: 'cloud', 		area: 'detail', classList: [], label: 'Clouds', 		filterLabel: 'Clouds', 				visible: true, displayLabel: true, valueType: 'simple' },
		{ prop: 'feelslike_c', 	area: 'detail', classList: [], label: 'Feels Like', 	filterLabel: 'Feels Like C', 		visible: false, displayLabel: true, valueType: '°C' },
		{ prop: 'feelslike_f', 	area: 'detail', classList: [], label: 'Feels Like', 	filterLabel: 'Feels Like F', 		visible: false, displayLabel: true, valueType: '°F' },
		{ prop: 'gust_mph', 	area: 'detail', classList: [], label: 'Wind Gust', 		filterLabel: 'Wind Gust mph', 		visible: false, displayLabel: true, valueType: 'mph' },
		{ prop: 'gust_kph', 	area: 'detail', classList: [], label: 'Wind Gust', 		filterLabel: 'Wind Gust kph', 		visible: false, displayLabel: true, valueType: 'kph' },
		{ prop: 'pressure_mb', 	area: 'detail', classList: [], label: 'Pressure', 		filterLabel: 'Pressure mb', 		visible: false, displayLabel: true, valueType: 'mb' },
		{ prop: 'pressure_in', 	area: 'detail', classList: [], label: 'Pressure', 		filterLabel: 'Pressure in', 		visible: false, displayLabel: true, valueType: 'in' },
		{ prop: 'precip_mm', 	area: 'detail', classList: [], label: 'Precipitation', 	filterLabel: 'Precipitation mm', 	visible: false, displayLabel: true, valueType: 'mm' },
		{ prop: 'precip_in', 	area: 'detail', classList: [], label: 'Precipitation', 	filterLabel: 'Precipitation in', 	visible: false, displayLabel: true, valueType: 'in' },
		{ prop: 'vis_km', 		area: 'detail', classList: [], label: 'Visibility', 	filterLabel: 'Visibility km', 		visible: false, displayLabel: true, valueType: 'km' },
		{ prop: 'vis_miles', 	area: 'detail', classList: [], label: 'Visibility', 	filterLabel: 'Visibility miles', 	visible: false, displayLabel: true, valueType: 'miles' }
	]

	constructor(private store: Store<AppState>, private elementRef: ElementRef) {}

	ngOnInit(): void {
		this.id = this.data.id;
		this.location = this.data.location;
		this.current = this.data.current;
		this.forecast = this.data.forecast.forecastday;

		this.settings.map(setting => {
			setting.value = this.current[setting.prop];
			if (this.disableTools) {
				setting.visible = true;
			}
		});

		if (this.disableTools) {
			this.elementRef.nativeElement.toggleAttribute('display-only');
		}
	}

	ngAfterViewInit(): void {
		this.menuEl = this.menuRef.nativeElement;
		this.infoEl = this.infoRef.nativeElement;
	}

	public toggleMenu(event: MouseEvent) {
		this.menuEl.toggleAttribute('collapsed');
	}

	public toggleValue(event) {
		const target = (event.target as CheckableFormAssociatedElement);
		if (target.dataset['prop']) {
			this.settings.find(setting =>
				setting.prop === target.dataset['prop']
			).visible = target.checked;
		}
	}

	public delete() {
		this.store.dispatch(delLocation(this.data));
	}
}