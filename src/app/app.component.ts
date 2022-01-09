import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, User } from './store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public user$: Observable<User>;

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.user$ = this.store.select((store) => store.user);
	}
}