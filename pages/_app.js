import "../styles/globals.css";
import "../styles/gradients.css";
import Script from "next/script";

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
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
