import "../styles/globals.css";
import "../styles/gradients.css";
import Script from "next/script";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.GOOGLE_ANALYTICS}`}
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-${process.env.GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `,
				}}
			/>
			<Head>
				<title>
					Soladd | Find smart contract address before deployment
				</title>
				<meta
					property="og:title"
					content="Soladd - Find smart contract address before deployment"
					key="title"
				/>
				<meta
					name="description"
					content="Not an astrologer, but Soladd can predict your smart
							contract address just by seeing your wallet address.
							Indeed, you can be smarter than your smart contract,
							gg. Try it yourself and see the magic! ✨"
				/>

				<meta charset="UTF-8" />
				<meta
					name="keywords"
					content="smart contracts, ethereum, polygon, arbitrum, optimism address, blockchain, EVM"
				/>
				<meta name="author" content="Uday Khokhariya" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@yupuday" />
				<meta name="twitter:account_id" content="1460479438911537152" />
				<meta
					property="twitter:title"
					content="Soladd - Find smart contract address before deployment."
				/>
				<meta
					property="twitter:description"
					content="Not an astrologer, but Soladd can predict your smart
					contract address just by seeing your wallet address.
					Indeed, you can be smarter than your smart contract,
					gg. Try it yourself and see the magic! ✨"
				/>
				<meta name="twitter:creator" content="@yupuday" />
				<meta
					property="twitter:image:src"
					content="https://raw.githubusercontent.com/githubotoro/soladd/main/gradients/splash.png"
				/>
				<meta property="og:url" content="https://soladd.vercel.app/" />
				<meta
					property="og:title"
					content="Soladd - Find smart contract address before deployment."
				/>
				<meta
					property="og:description"
					content="Not an astrologer, but Soladd can predict your smart
					contract address just by seeing your wallet address.
					Indeed, you can be smarter than your smart contract,
					gg. Try it yourself and see the magic! ✨"
				/>
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/githubotoro/soladd/main/gradients/splash.png"
				/>
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
