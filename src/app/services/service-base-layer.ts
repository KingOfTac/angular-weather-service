import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export interface QueryParams {
	[key: string]: string | number;
}

export type HttpMethod = 'get' | 'post' | 'delete' | 'patch';

/**
 * A resuable http service class in case I need to implement other features in the future
 */
export class HttpServiceBaseLayer {
	private END_POINT: string;
	http: HttpClient

	constructor(endpoint: string) {
		this.END_POINT = endpoint;
	}

	public request<T>(
		id: number | null = null,
		data: any = {},
		route: string,
		query: QueryParams | null,
		method: 'get' | 'post' | 'delete' | 'patch'
	): Observable<T> {
		const formattedQuery = this.formatQuery(query);
		return this.http[method](
			`${this.END_POINT}/${route}${id ? `/${id}` : ''}${formattedQuery}`,
			data
		) as unknown as Observable<T>;
	}
	
	private formatQuery(query: QueryParams | null): string {
		if (query === null || query == undefined) {
			return '';
		}

		const queryStrings = this.mapToUrl(query);
		return queryStrings.length === 0 ? '' : `?${queryStrings.join('&')}`;
	}

	private mapToUrl(query: QueryParams): Array<string> {
		return Object.keys(query).map(
			(key: string) => `${key}=${query[key]}`
		);
	}
}