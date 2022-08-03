import type { NextPageContext } from "next";

import { SwApi } from "Api";
import { FilmLayout, Props as FilmLayoutProps } from "Layouts/FilmLayout";

const Home = (props: FilmLayoutProps) => {
	return <FilmLayout {...props} />;
};

export default Home;

export async function getServerSideProps(_ctx: NextPageContext) {
	try {
		const swapi = new SwApi();
		const [films, filmsWookiee] = await Promise.all([swapi.getAllFilms(), swapi.getAllFilmsWookiee()]);
		return {
			props: {
				films,
				filmsWookiee,
			},
		};
	} catch (err: any) {
		console.log(err);
		return {
			props: {
				films: null,
				filmsWookie: null,
			},
		};
	}
}
