import "../styles/globals.css";
import "../styles/gradients.css";
import Script from "next/script";

import { Analytics } from "@vercel/analytics/react";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
			/>
			<Script id="google-analytics-script" strategy="lazyOnload">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
					page_path: window.location.pathname,
					});
				`}
			</Script>
			<Component {...pageProps} />
			<Analytics />
		</>
	);
}

export default MyApp;
