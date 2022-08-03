import type { AppProps } from "next/app";

import { BaseStyle } from "Components/BaseStyle";

type Props = AppProps;

function Main({ Component, pageProps }: Props) {
	return (
		<>
			<BaseStyle />
			<Component {...pageProps} />
		</>
	);
}

export default Main;
