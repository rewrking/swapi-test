import Document, { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

type Props = DocumentProps & {};

class MyDocument extends Document<Props> {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
	render() {
		return (
			<Html>
				<Head>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
