import { Component, ElementRef, ViewChild } from "@angular/core";
import { baseLayerLuminance, StandardLuminance } from "@microsoft/fast-components";
import { HorizontalScroll } from "@microsoft/fast-foundation";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState, LocationItem } from "src/app/store";

@Component({
	selector: 'location-list',
	templateUrl: './location-list.component.html',
	styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
	public locations: Observable<Array<LocationItem>>;
	public locationList: Observable<Array<LocationItem>>;
	public layout: 'row' | 'column';
	public direction: 'asc' | 'desc' = 'desc';

	public gridView: HTMLElement;
	@ViewChild('gridView') set gridViewRef(content: ElementRef) {
		if (content) {
			this.gridView = content.nativeElement;
		}
	};

	public rowView: HorizontalScroll;
	@ViewChild('rowView') set rowViewRef(content: ElementRef) {
		if (content) {
			this.rowView = content.nativeElement;

			if (window.matchMedia('(max-width: 768px)').matches) {
				this.rowView.setAttribute('view', 'mobile');
				this.layout = 'row';
			}
		}
	}

	constructor(private store: Store<AppState>, private elementRef: ElementRef) { }

	ngOnInit(): void {
		this.locations = this.store.select((store) => store.locationItems);
		this.locationList = this.store.select((store) => store.locationList);

		this.layout = 'column';

		if (window.matchMedia('(max-width: 768px)').matches) {
			this.layout = 'row';
		}
	}

	toggleLayout() {
		this.layout === 'row' ?
			this.layout = 'column' :
			this.layout = 'row';
		
		this.elementRef.nativeElement.setAttribute('layout', this.layout);
	}

	toggleDir() {
		this.direction === 'asc' ?
			this.direction = 'desc' :
			this.direction = 'asc';
	}
}