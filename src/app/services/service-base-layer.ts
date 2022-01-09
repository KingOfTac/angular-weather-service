import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { isNull } from "@angular/compiler/src/output/output_ast";

interface QueryParams {
	[key: string]: string | number;
}

@Injectable({
	providedIn: 'root'
})
export class HttpServiceBaseLayer {
	private END_POINT: string;

	constructor(private readonly http: HttpClient) {
	}

	public set endpoint(endpoint: string) {
		this.END_POINT = endpoint;
	}

	public request<T>(
		id: number | null = null,
		data: any,
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