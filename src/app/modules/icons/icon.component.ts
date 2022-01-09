import { Component, ElementRef, Input, OnInit } from "@angular/core";
import icons from './icons';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss']
})
export class Icons implements OnInit {
	@Input() size: string;

	constructor(public element: ElementRef) {}

	@Input() set name(iconPath: string) {
		const iconList = icons();

		let icon = iconList;
		for (let i = 0, path = iconPath.split('.'); i < path.length; i++) {
			icon = icon[path[i]];
		}
		
		this.element.nativeElement.innerHTML = icon;
	}

	ngOnInit(): void {
		const iconSize = this.setIconSize(this.size);
		this.element.nativeElement.setAttribute(
			'style',
			`width: calc(${iconSize} * var(--icon-height-multiplier)); height: calc(${iconSize} * var(--icon-height-multiplier))`
		)
	}

	setIconSize = (size: string) => {
		switch(size) {
			case 'minus-1':
				return '12px';
			case 'minus-2':
				return '10px';
			case 'plus-1':
				return '16px';
			case 'plus-2':
				return '20px';
			case 'plus-3':
				return '28px';
			case 'plus-4':
				return '24px';
			case 'plus-5':
				return '46px';
			case 'plus-6':
				return '60px';
			case 'hero':
				return '120px';
			default:
				return '14px';
		}
	}
}