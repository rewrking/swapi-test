import { DateString } from "Utility";

export type SwFilm = {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: DateString;
	species: string[];
	starships: string[];
	vehicles: string[];
	characters: string[];
	planets: string[];
	url: string;
	created: DateString;
	edited: DateString;
};

export type SwFilmResponse = {
	count: number;
	next: SwFilm | null;
	previous: SwFilm | null;
	results: SwFilm[];
};
