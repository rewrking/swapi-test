import { createGlobalStyle } from "styled-components";

const BaseStyle: any = createGlobalStyle`
	html,
	body {
		padding: 0;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
	}


	html,
	body,
	div,
	aside,
	main,
	code,
	pre {
		scrollbar-width: thin;
		scrollbar-color: slategray #111;
	}

	::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}

	::-webkit-scrollbar-track-piece {
		background-color: #111;
	}

	::-webkit-scrollbar-thumb {
		background-color: slategray;

		&:hover {
			background-color: slategray;
		}
	}

`;

export { BaseStyle };
