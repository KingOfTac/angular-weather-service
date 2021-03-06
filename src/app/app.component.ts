import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HorizontalScroll } from '@microsoft/fast-foundation';
import { AppState, LocationItem } from './store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public locations: Observable<Array<LocationItem>>;
	public locationList: Observable<Array<LocationItem>>;
	public layout: 'row' | 'grid';

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

		this.layout = 'grid';

		if (window.matchMedia('(max-width: 768px)').matches) {
			this.layout = 'row';
		}
	}

	toggleLayout() {
		this.layout === 'row' ?
			this.layout = 'grid' :
			this.layout = 'row';
		
		this.elementRef.nativeElement.setAttribute('layout', this.layout);
	}
}