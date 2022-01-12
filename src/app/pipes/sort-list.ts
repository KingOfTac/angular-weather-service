import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
	transform(items: any[], order: string) {
		if (order === 'asc') {
			return items;
		}

		return items.slice().reverse();
	}
}