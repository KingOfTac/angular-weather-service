import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { baseLayerLuminance, fillColor, neutralFillLayerRecipe, neutralForegroundRecipe, neutralForegroundRest, neutralLayer1, neutralLayerCardContainer, neutralPalette, PaletteRGB, StandardLuminance, Swatch, SwatchRGB } from '@microsoft/fast-components';
import { composedParent, DesignSystem, DesignToken } from '@microsoft/fast-foundation';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, CurrentConditions, Location, LocationItem } from '../../store';

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
	private DS: DesignSystem;

	@Input()
	public timeOfDay: string;

	public weatherConditions: {} = {
		clouds: false,
		lightning: false,
		rain: false,
		snow: false,
		wind: false
	}

	private randRange(min: number, max: number, round: boolean = false) {
		const value = Math.random() * (max - min) + min;
		return round ? Math.floor(value) : value;
	}

	private spawnedClouds: boolean = false;
	private windSpeed: number = 0;
	private windDirection: number = 120;
	public dayNightCycle: DayNightCycle | string = DayNightCycle.DAY;
	private rainColor: string = 'rgba(100% 100% 100% / 0.4)';
	private snowColor: string = '';

	public setDayNightState(state: DayNightCycle | string) {
		this.dayNightCycle = state;

		if (state === 'night' || state === 'sunset') {
			baseLayerLuminance.setValueFor(this.cardRef, StandardLuminance.DarkMode);
		}
		if (state === 'day' || state === 'sunrise') {
			baseLayerLuminance.setValueFor(this.cardRef, StandardLuminance.LightMode);
		}
	}

	constructor(private store: Store<AppState>, elementRef: ElementRef) {
		this.cardRef = elementRef.nativeElement.parentElement;
	}

	ngOnInit(): void {
		this.setDayNightState(this.timeOfDay);
	}
}