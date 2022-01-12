import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'filter',
	pure: false
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], prop: any, value: any) {
		if (!items || !prop || !value) {
			return items;
		}

		return items.filter(item => item[prop] === value);
	}
}