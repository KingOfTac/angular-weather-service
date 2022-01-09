import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
	selector: '[svgIcon]'
})
export class SvgIconDirective implements OnChanges {
	@Input()
	public svg?: string;

	constructor(private elementRef: ElementRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['svg']) {
			this.elementRef.nativeElement.innerHTML = '';

			if (this.svg) {
				this.elementRef.nativeElement.innerHTML = this.svg;
			}
		}
	}
}