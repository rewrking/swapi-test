import { Optional } from "Utility";

import { BaseApi } from "../BaseApi";
import { SwFilm } from "./FilmResource";

const getRouteString = (route: string, wookiee?: boolean): string => {
	return !!wookiee ? `${route}?format=wookiee` : route;
};

export class SwApi extends BaseApi {
	constructor() {
		super("http://swapi.dev/api");
	}

	getUrl = async <T extends object>(url: string, wookiee: boolean = false): Promise<T | null> => {
		url = url.replace(this.baseUrl, "");
		const route = getRouteString(url, wookiee);
		if (!!wookiee) {
			// Note: there's a format=wookiee parsing issue in the current iteration of this api
			//   this is a workaround
			//   https://github.com/phalt/swapi/issues/100
			//
			const response = await this.getRaw(route);
			if (response.ok) {
				response.data = response.data.replace(/whhuanan/g, '"whhuanan"').replace(/\\rc\\w/g, "\\r\\n");
				const data: any = JSON.parse(response.data);
				return data.rcwochuanaoc;
			}
		} else {
			const response = await this.GET<T>(route);
			if (response.ok) {
				return (response.data as any).results as T;
			}
		}
		return null;
	};

	getAllFilms = (): Promise<Optional<SwFilm[]>> => this.getUrl<SwFilm[]>("/films");

	getAllFilmsWookiee = async (): Promise<Optional<SwFilm[]>> => {
		const result = await this.getUrl<any[]>("/films", true);
		if (!!result) {
			return result.map((val) => ({
				title: val.aoahaoanwo,
				episode_id: val.woakahcoowawo_ahwa,
				opening_crawl: val.ooakwowhahwhrr_oarcraohan,
				director: val.waahrcwooaaooorc,
				producer: val.akrcoowahuoaworc,
				release_date: val.rcwoanworacwo_waraaowo,
				species: val.oaacrarcraoaaoworcc,
				starships: val.akanrawhwoaoc,
				vehicles: val.caorarccacahakc,
				characters: val.howoacahoaanwoc,
				planets: val.cakwooaahwoc,
				url: val.hurcan,
				created: val.oarcworaaowowa,
				edited: val.wowaahaowowa,
			})) as SwFilm[];
		}
		return null;
	};
}
