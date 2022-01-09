import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/store";

export class DropdownItem {
	constructor(
		public content?: string,
		public start?: string,
		public end?: string,
	) { }
}

export class DropdownButton {
	constructor(
		public content?: string,
		public start?: string,
		public end?: string
	) { }
}

@Component({
	selector: 'dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
	public visible: boolean = false;

	@Input()
	public button: DropdownButton;

	@Input()
	public menuItems: Observable<Array<DropdownItem>> | undefined;

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		
	}

	public toggleVisible() {
		if (this.visible) {
			this.visible = false;
		} else {
			this.visible = true;
		}

	}

	handleClick() {
		this.toggleVisible();
	}
}