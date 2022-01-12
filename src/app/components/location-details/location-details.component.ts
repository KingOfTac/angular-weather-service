import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocationItem } from "src/app/store";

@Component({
	selector: 'location-details',
	templateUrl: './location-details.component.html',
	styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
	public data: LocationItem;

	constructor(private router: Router, private elementRef: ElementRef) {}

	ngOnInit(): void {
		this.data = history.state

		if (!this.data.location) {
			this.router.navigate(['']);
		}

		if (window.matchMedia('(max-width: 768px)').matches) {
			this.elementRef.nativeElement.querySelectorAll('.hours').forEach(el => {
				el.setAttribute('view', 'mobile');
			});
		}
	}
}