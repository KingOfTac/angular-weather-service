import { Astro } from "./astro.model";
import { Day } from "./day.model";
import { Hour } from "./hour.model";

export interface ForecastDay {
	date: string;
	date_epoch: number;
	day: Day;
	astro: Astro;
	hour: Array<Hour>;
}