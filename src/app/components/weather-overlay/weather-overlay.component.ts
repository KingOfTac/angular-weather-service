import { Component, ElementRef, Input, OnInit, } from '@angular/core';
import { baseLayerLuminance, StandardLuminance } from '@microsoft/fast-components';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { AppState } from '../../store';

enum DayNightCycle {
	SUNRISE = 'sunrise',
	DAY = 'day',
	SUNSET = 'sunset',
	NIGHT = 'night'
}

@Component({
	selector: 'weather-overlay',
	templateUrl: './weather-overlay.component.html',
	styleUrls: ['./weather-overlay.component.scss']
})
export class WeatherOverlayComponent implements OnInit {
	public cardRef: HTMLElement;
	private night: DateTime;
	private nightEnd: DateTime;

	@Input()
	public localTime: string;
	private localDateTime: DateTime;
	@Input() 
	public sunrise: string;
	private sunriseDateTime: DateTime;
	@Input()
	public sunset: string;
	private sunsetDateTime: DateTime;
	@Input()
	public timezone: string;
	@Input()
	public forecastDate: string;

	private timesInitialized: boolean = false;
	public timeOfDay: DayNightCycle | string = DayNightCycle.DAY;

	public setTimeOfDay() {
		const timeParts = this.localTime.split(' ');
		if (/^[0-9]:/.test(timeParts[1])) {
			timeParts[1] = timeParts[1].replace(timeParts[1], `0${timeParts[1]}`);
		}

		this.localTime = timeParts.join('T');
		this.localDateTime = DateTime.fromISO(this.localTime, { zone: this.timezone });
		this.sunriseDateTime = DateTime.fromFormat(`${this.forecastDate} ${this.sunrise}`, 'yyyy-MM-dd hh:mm a', { zone: this.timezone });
		this.sunsetDateTime = DateTime.fromFormat(`${this.forecastDate} ${this.sunset}`, 'yyyy-MM-dd hh:mm a', { zone: this.timezone });

		// Just going to assume sunrise/sunset lasts about 2 hours.
		this.night = this.sunsetDateTime.plus({ hours: 2 }).setZone(this.timezone);
		this.nightEnd = this.sunriseDateTime.minus({ hours: 2 }).setZone(this.timezone);

		if ((this.localDateTime >= this.nightEnd && this.localDateTime <= this.sunriseDateTime) && this.timeOfDay !== 'sunrise') {
			this.timeOfDay = 'sunrise';
			baseLayerLuminance.setValueFor(this.cardRef, StandardLuminance.LightMode);
		} else if ((this.localDateTime >= this.sunriseDateTime && this.localDateTime < this.sunsetDateTime) && this.timeOfDay !== 'day') {
			this.timeOfDay = 'day';
			baseLayerLuminance.setValueFor(this.cardRef, StandardLuminance.LightMode);
		} else if ((this.localDateTime >= this.sunsetDateTime && this.localDateTime < this.night) && this.timeOfDay !== 'sunset') {
			this.timeOfDay = 'sunset';
			baseLayerLuminance.setValueFor(this.cardRef, StandardLuminance.DarkMode);
		} else if ((this.localDateTime <= this.nightEnd || this.localDateTime >= this.night) && this.timeOfDay !== 'night') {
			this.timeOfDay = 'night';
			baseLayerLuminance.setValueFor(this.cardRef, StandardLuminance.DarkMode);
		}
	}

	constructor(private store: Store<AppState>, elementRef: ElementRef) {
		this.cardRef = elementRef.nativeElement.parentElement;
	}

	ngOnInit(): void {
		this.setTimeOfDay();

		const effectTimer = setInterval(() => {
			this.localDateTime.plus({ minutes: 1});
			this.setTimeOfDay();
		}, 60000);
	}
}