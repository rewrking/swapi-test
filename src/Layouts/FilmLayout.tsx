import Head from "next/head";
import React, { useMemo } from "react";
import styled from "styled-components";

import { SwFilm } from "Api/SwApi";
import { FilmView } from "Components";
import { Optional } from "Utility";

export type Props = {
	films: Optional<SwFilm[]>;
	filmsWookiee: Optional<SwFilm[]>;
};

const FilmLayout = (props: Props) => {
	return (
		<Container>
			<Head>
				<title>SWAPI Test</title>
				<meta name="description" content="SWAPI test" />
			</Head>

			<Main>
				<FilmView {...props} />
			</Main>
		</Container>
	);
};

export { FilmLayout };

const Container = styled.div`
	padding: 0 2rem;
	background-color: #0a0a0a;
	background-image: url(/stars.jpg);
	background-position: 50% 25%;
	overflow: hidden;
`;

const Main = styled.main`
	min-height: 100vh;
	padding: 4rem 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;
