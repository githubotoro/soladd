const Footer = () => {
	return (
		<>
			<footer
				aria-label="Site Footer"
				className="bg-slate-50 text-center"
			>
				<div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-3xl space-y-6">
						<nav
							aria-label="Footer Nav"
							class="rounded-3xl border-4 border-gray-900 p-2"
						>
							<ul className="flex flex-wrap justify-center gap-6 text-sm font-bold">
								<li>
									<a
										className="text-gray-900 transition hover:text-gray-900/75 hover:border-slate-900/75 hover:border-b-2"
										href="https://github.com/githubotoro/soladd"
										target="_blank"
										rel="noreferrer"
									>
										GitHub
									</a>
								</li>

								<li>
									<a
										className="text-gray-900 transition hover:text-gray-900/75 hover:border-slate-900/75 hover:border-b-2"
										href="https://twitter.com/yupuday"
										target="_blank"
										rel="noreferrer"
									>
										Twitter
									</a>
								</li>

								<li>
									<a
										className="text-gray-900 transition hover:text-gray-900/75 hover:border-slate-900/75 hover:border-b-2"
										href="/"
										target="_blank"
										rel="noreferrer"
									>
										ProductHunt
									</a>
								</li>
							</ul>
						</nav>

						<p class="mx-auto max-w-lg text-xs text-gray-500">
							<span class="mt-4 block">
								{" "}
								&copy; 2022{" "}
								<a
									href="https://yupuday.vercel.app/"
									target="_blank"
									rel="noreferrer"
									className="hover:border-b-2 hover:border-slate-300"
								>
									Uday Khokhariya
								</a>{" "}
								|{" "}
								<a
									href="https://polygonscan.com/address/0xD5a63CCE627372481b30AE24c31a3Fb94913D5Be"
									target="_blank"
									rel="noreferrer"
									className="hover:border-b-2 hover:border-slate-300"
								>
									0xD5a63CCE627372481b30AE24c31a3Fb94913D5Be
								</a>{" "}
								|{" "}
								<a
									href="https://www.lensfrens.xyz/yupuday.lens"
									target="_blank"
									rel="noreferrer"
									className="hover:border-b-2 hover:border-slate-300"
								>
									yupuday.lens
								</a>{" "}
							</span>
						</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
