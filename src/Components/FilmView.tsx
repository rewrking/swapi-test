import React, { useMemo, useState } from "react";
import styled from "styled-components";

import { SwFilm } from "Api";
import { Optional, hasMinWidth, toRomanNumeral } from "Utility";

import { Checkbox } from "./Checkbox";
import { SelectDropdown, SelectOption } from "./SelectDropdown";

export type Props = {
	films: Optional<SwFilm[]>;
	filmsWookiee: Optional<SwFilm[]>;
};

const FilmView = ({ films, filmsWookiee }: Props) => {
	const [selected, setSelected] = useState<number>(0);
	const [wookiee, setWookiee] = useState<boolean>(false);
	const options: SelectOption[] = useMemo(
		() =>
			films?.map(({ title }, index) => ({
				value: `${index}`,
				label: title,
			})) ?? [],
		[films]
	);

	if (!films || !filmsWookiee) {
		return (
			<Styles>
				<TitleContainer>
					<FilmTitle>Error fetching films from SWAPI.</FilmTitle>
				</TitleContainer>
			</Styles>
		);
	}

	const film = wookiee ? filmsWookiee[selected] : films[selected];
	const episode = toRomanNumeral(selected + 1);
	const releaseDate = new Date(film.release_date).toDateString();
	const openingCrawl = film.opening_crawl
		.replace(/.\r\nh/g, "\r\n")
		.split("\r\n\r\n")
		.map((paragraph, i) => <p key={i}>{paragraph.replace(/\r\n/g, " ")}</p>);

	return (
		<Styles>
			<Controls>
				<SelectDropdown
					name="Choose a film:"
					options={options}
					onChange={(option) => {
						setSelected(parseInt(option.value));
					}}
				/>
				<Checkbox name="wookiee" label="Wookiee?" checked={wookiee} onClick={() => setWookiee(!wookiee)} />
			</Controls>
			<FilmReleaseDate>
				Release date:
				<br />
				<span>{releaseDate}</span>
			</FilmReleaseDate>
			<TitleContainer>
				<FilmEpisode>Episode {episode}</FilmEpisode>
				<FilmTitle>{film.title}</FilmTitle>
			</TitleContainer>
			<CrawlContainer>
				<Crawl className={wookiee ? "wookiee" : undefined}>{openingCrawl}</Crawl>
			</CrawlContainer>
		</Styles>
	);
};

export { FilmView };

const Styles = styled.div`
	display: block;
	color: #ffd108;
`;

const Controls = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	> .checkbox {
		margin-top: 1rem;
	}
`;

const FilmEpisode = styled.h3`
	display: block;
	text-align: center;
	margin: 0;
	padding: 0;
	font-size: 0.75rem;

	@media ${hasMinWidth(1)} {
		font-size: 1.5rem;
	}
`;

const FilmTitle = styled.h1`
	display: block;
	text-align: center;
	text-transform: uppercase;
	margin: 0;
	padding: 0;
	font-size: 1.25rem;

	@media ${hasMinWidth(0)} {
		font-size: 1.5rem;
	}

	@media ${hasMinWidth(1)} {
		font-size: 2rem;
	}
`;

const FilmReleaseDate = styled.p`
	display: block;
	text-align: center;
	padding-bottom: 2rem;
	color: #555;

	> span {
		color: #cdcdcd;
		font-weight: 600;
	}
`;

const TitleContainer = styled.div`
	display: block;

	&.wookiee {
		width: 23rem;
	}

	@media ${hasMinWidth(0)} {
		width: 23rem;
		transform: scale(50%, 200%) perspective(33rem) rotateX(80deg) scale(150%);
	}

	@media ${hasMinWidth(1)} {
		width: 29rem;

		> p {
			font-size: 2rem;
		}
	}
`;

const Crawl = styled.div`
	display: block;
	width: 15rem;

	&.wookiee {
		width: 23rem;
	}

	> p {
		font-size: 1rem;
		text-align: justify;
		font-weight: 600;
		line-height: 1.25;
	}

	@media ${hasMinWidth(0)} {
		width: 23rem;
		transform-origin: 50% 0%;
		transform: scale(200%, 85%) perspective(20rem) rotateX(30deg) scale(50%);

		&.wookiee {
			width: 23rem;
			transform: scale(200%, 85%) perspective(20rem) rotateX(30deg) scale(50%);
		}

		> p {
			font-size: 1.5rem;
		}

		&.wookiee {
			> p {
				font-size: 1.1rem;
			}
		}
	}

	@media ${hasMinWidth(1)} {
		width: 30.5rem;
		transform: scale(200%, 85%) perspective(25rem) rotateX(30deg) scale(50%);

		> p {
			font-size: 2rem;
		}

		&.wookiee {
			> p {
				font-size: 1.25rem;
			}
		}
	}
`;

const CrawlContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
