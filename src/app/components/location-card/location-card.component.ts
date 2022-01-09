import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, CurrentConditions, Location } from '../../store';

@Component({
	selector: 'location-card',
	templateUrl: './location-card.component.html',
	styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit, AfterViewInit {
	@Input()
	public id: string;
	@Input()
	public nickname: string;
	@Input()
	public location: Location;
	@Input()
	public current: CurrentConditions;

	@ViewChild('drawerContainer') drawerContainerRef: ElementRef;
	public drawerContainer: HTMLElement;

	@ViewChild('contentContainer') contentContainerRef: ElementRef;
	public contentContainer: HTMLElement;
	
	public now: Date = new Date();

	public settings = [
		{ text: 'test' },
		{ text: 'test' },
		{ text: 'test' },
		{ text: 'test' },
		{ text: 'test' },
		{ text: 'test' },
		{ text: 'test' },
		{ text: 'test' }
	]

	constructor(private store: Store<AppState>, private elementRef: ElementRef) {
		setInterval(() => {
			this.now = new Date();
		}, 60000)
	}

	ngOnInit(): void {
		// this.icons.condition = conditionIcons[this.current.condition.code]();
	}

	ngAfterViewInit(): void {
		this.drawerContainer = this.drawerContainerRef.nativeElement;
		this.contentContainer = this.contentContainerRef.nativeElement;
	}

	private drawerCollapsed: boolean = true;

	public toggleMenu(event: MouseEvent) {
		const target: HTMLElement = (event.target as HTMLElement);
		console.log(target, this.drawerContainer);
		this.drawerContainer.toggleAttribute('collapsed');
		this.contentContainer.toggleAttribute('collapsed');

		if (this.drawerCollapsed) {
			
		}
	}
}