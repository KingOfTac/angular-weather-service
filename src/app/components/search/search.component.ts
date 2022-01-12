import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Listbox } from "@microsoft/fast-foundation";
import { Store } from "@ngrx/store";
import { LocationService } from "src/app/services";
import { addLocation, AppState, Location } from "src/app/store";

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
	constructor(private locationService: LocationService, private store: Store<AppState>) {}

	@ViewChild('resultsList') resultsListRef: ElementRef;

	ngOnInit(): void {
		document.addEventListener('click', this.handleResultsClick.bind(this));
	}

	searchText = '';
	hasOptions: boolean = false;
	selectedLocation: Location;
	searchResults: Array<Location> = [];

	handleSearch() {
		this.locationService.getLocationsBasedOnSearch(this.searchText)
			.subscribe({
				next: (locations: Array<Location>) => this.searchResults = locations,
				error: () => {
					let message;
					if (this.searchText.trim().length === 0) {
						message = `Please enter a valid location and try again.`;
					} else {
						message = `There was an error searching for ${this.searchText}. Please try again.`;
					}
					
					alert(message);
				}
			});
	}

	handleResultsClick(event: any) {
		const resultsList = (this.resultsListRef?.nativeElement as Listbox);
		if (event.composedPath().includes(resultsList)) {
			this.selectedLocation = ((resultsList.selectedOptions[0] as any).ngValue as Location);

			this.locationService.getSelectedLocationData(this.selectedLocation)
				.subscribe((locationItem) => {
					locationItem.id = `${locationItem.location.name}-${locationItem.location.region}`;
					this.store.dispatch(addLocation(locationItem));
				})
		}

		this.searchResults = [];
	}

	ngAfterViewInit(): void {}
}