import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpServiceBaseLayer } from "src/app/services";

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {


	@ViewChild('searchbar') searchbarRef: ElementRef;
	public searchbar: HTMLElement;

	constructor(private weatherService: HttpServiceBaseLayer) {}

	ngOnInit(): void {
		this.weatherService.endpoint = ''
	}

	ngAfterViewInit(): void {
		this.searchbar = this.searchbarRef.nativeElement;
	}
}