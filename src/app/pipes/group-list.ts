import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'group',
	pure: false
})
export class GroupPipe implements PipeTransform {
	transform(items: any[], key: any) {
		if (!items || !key) {
			return items;
		}

		const groupObj = items.reduce((prev, curr) => {
			if (!prev[curr[key]]) {
				prev[curr[key]] = [curr];
			} else {
				prev[curr[key]].push(curr);
			}

			return prev;
		}, {})

		return Object.keys(groupObj).map(key => ({ key, value: groupObj[key] }));
	}
}