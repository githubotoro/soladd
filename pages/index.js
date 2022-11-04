import Head from "next/head";
import Image from "next/image";

import { useState, useEffect } from "react";

import { ethers } from "ethers";

import { Network, Alchemy } from "alchemy-sdk";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

	const [address, setAddress] = useState("");
	const [nonce, setNonce] = useState("");

	const [computedAddress, setComputedAddress] = useState("");
	const [computedChain, setComputedChain] = useState("");
	const [computedLink, setComputedLink] = useState("");
	const [computedWallet, setComputedWallet] = useState("");
	const [computedNonce, setComputedNonce] = useState("");

	const chainNames = {
		ETH_MAINNET: "Ethereum Mainnet",
		ETH_GOERLI: "Goerli Ethereum Testnet",
		MATIC_MAINNET: "Polygon Mainnet",
		MATIC_MUMBAI: "Polygon Mumbai Testnet",
		ARB_MAINNET: "Arbitrum Mainnet",
		ARB_GOERLI: "Goerli Arbitrum Testnet",
		OPT_MAINNET: "Optimism Mainnet",
		OPT_GOERLI: "Goerli Optimism Testnet",
	};

	const chains = [
		"ETH_MAINNET",
		"ETH_GOERLI",
		"MATIC_MAINNET",
		"MATIC_MUMBAI",
		"ARB_MAINNET",
		"ARB_GOERLI",
		"OPT_MAINNET",
		"OPT_GOERLI",
	];

	const chainLinks = {
		ETH_MAINNET: "https://etherscan.io/address/",
		ETH_GOERLI: "https://goerli.etherscan.io/address/",
		MATIC_MAINNET: "https://polygonscan.com/address/",
		MATIC_MUMBAI: "https://mumbai.polygonscan.com/address/",
		ARB_MAINNET: "https://arbiscan.io/address/",
		ARB_GOERLI: "https://goerli.arbiscan.io/address/",
		OPT_MAINNET: "https://optimistic.etherscan.io/address/",
		OPT_GOERLI: "https://goerli-optimism.etherscan.io/address/",
	};

	const [chain, setChain] = useState(chains[0]);

	const getSettings = () => {
		let _settings = {};

		switch (chain) {
			case "ETH_MAINNET":
				_settings = {
					apiKey: process.env.ETH_MAINNET,
					network: Network.ETH_MAINNET,
				};
				break;

			case "ETH_GOERLI":
				_settings = {
					apiKey: process.env.ETH_GOERLI,
					network: Network.ETH_GOERLI,
				};
				break;

			case "MATIC_MAINNET":
				_settings = {
					apiKey: process.env.MATIC_MAINNET,
					network: Network.MATIC_MAINNET,
				};
				break;

			case "MATIC_MUMBAI":
				_settings = {
					apiKey: process.env.MATIC_MUMBAI,
					network: Network.MATIC_MUMBAI,
				};
				break;

			case "ARB_MAINNET":
				_settings = {
					apiKey: process.env.ARB_MAINNET,
					network: Network.ARB_MAINNET,
				};
				break;

			case "ARB_GOERLI":
				_settings = {
					apiKey: process.env.ARB_GOERLI,
					network: Network.ARB_GOERLI,
				};
				break;

			case "OPT_MAINNET":
				_settings = {
					apiKey: process.env.OPT_MAINNET,
					network: Network.OPT_MAINNET,
				};
				break;

			case "OPT_GOERLI":
				_settings = {
					apiKey: process.env.OPT_GOERLI,
					network: Network.OPT_GOERLI,
				};
				break;
		}

		return _settings;
	};

	const getNonce = async () => {
		let settings = getSettings();
		let alchemy = new Alchemy(settings);
		let _nonce = await alchemy.core.getTransactionCount(address);

		return _nonce;
	};

	const getContractAddress = async () => {
		if (address === "") {
			toast.error("Wallet address is not defined!", {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

			return;
		}

		let _nonce = 0;

		if (showAdvancedOptions === true) {
			if (nonce === "") {
				_nonce = 0;
				setNonce(0);
			} else {
				_nonce = nonce;
			}
		} else {
			_nonce = await getNonce();
			setNonce(_nonce);
		}

		let rlpEncoded = ethers.utils.RLP.encode([
			address,
			ethers.BigNumber.from(_nonce.toString()).toHexString(),
		]);
		let contractAddressLong = ethers.utils.keccak256(rlpEncoded);
		let contractAddress = "0x".concat(contractAddressLong.substring(26));

		setComputedAddress(0);
		setComputedAddress(contractAddress);
		setComputedChain(chain);
		setComputedNonce(_nonce);
		setComputedWallet(address);
	};

	const inputAddress = () => {
		return (
			<>
				<div className="w-full max-w-screen-sm p-2">
					<label
						for="walletAddress"
						className="flex text-lg font-medium text-gray-700 justify-start"
					>
						Wallet Address
					</label>

					<input
						onChange={(e) => {
							setAddress(e.target.value);
						}}
						value={address}
						type="text"
						id="walletAddress"
						placeholder="Ex: 0xD5a63CCE627372481b30AE24c31a3Fb94913D5Be"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm drop-shadow-md"
					/>
				</div>
			</>
		);
	};

	const advancedOptionsToggle = () => {
		return (
			<>
				<div className="flex flex-row sm:mt-0 mt-4 drop-shadow-md">
					<div className="flex mr-2  justify-end rounded-md bg-slate-700 px-2.5 py-0.5 text-lg font-medium text-slate-50">
						Show Advanced Options
					</div>

					<label
						for="AcceptConditions"
						className="relative h-8 w-14 cursor-pointer"
					>
						<input
							type="checkbox"
							id="AcceptConditions"
							className="peer sr-only"
							onClick={() => {
								setShowAdvancedOptions(!showAdvancedOptions);
							}}
						/>

						<span className="absolute inset-0 rounded-full bg-slate-700 transition peer-checked:bg-green-500"></span>

						<span className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-slate-50 transition peer-checked:translate-x-6"></span>
					</label>
				</div>
			</>
		);
	};

	const advancedOptions = () => {
		return (
			<>
				<div className="w-full max-w-screen-sm">
					<label
						for="nonce"
						className="flex text-lg font-medium text-gray-700 justify-start"
					>
						Nonce (Default Value is fetched from Chain)
					</label>

					<input
						value={nonce}
						type="number"
						id="nonce"
						placeholder="Ex: 135"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm drop-shadow-md"
						onChange={(e) => {
							setNonce(e.target.value);
						}}
					/>
				</div>
			</>
		);
	};

	const findAddress = () => {
		return (
			<>
				<div className="flex w-full sm:justify-end justify-center items-end">
					<button
						onClick={() => getContractAddress()}
						className="drop-shadow-md sm:justify-end justify-center rounded-md border-4 border-slate-700  bg-slate-700 px-6 py-1 text-lg font-bold text-white transition hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring active:text-blue-500"
					>
						Find Smart Contract Address
					</button>
				</div>
			</>
		);
	};

	const selectChain = () => {
		return (
			<>
				<div className="flex items-center">
					<label
						className="font-medium text-lg text-gray-700 pr-2 "
						for="chainsNew"
					>
						Select Chain
					</label>
					<select
						value={chain}
						className="rounded-md border-gray-300 py-1 drop-shadow-md"
						name="chainsNew"
						id="chainsNew"
						onChange={(e) => {
							setChain(e.target.value);
						}}
					>
						<option value="ETH_MAINNET">Ethereum Mainnet</option>
						<option value="ETH_GOERLI">Goerli Ethereum</option>
						<option value="MATIC_MAINNET">Polygon Mainnet</option>
						<option value="MATIC_MUMBAI">Mumbai Testnet</option>
						<option value="ARB_MAINNET">Arbitrum Mainnet</option>
						<option value="ARB_GOERLI">Goerli Arbitrum</option>
						<option value="OPT_MAINNET">Optimism Mainnet</option>
						<option value="OPT_GOERLI">Goerli Optimism</option>
					</select>
				</div>
			</>
		);
	};

	const cta = () => {
		return (
			<>
				<div className="mx-auto text-center pt-10 sm:pb-8 pb-2">
					<h1 className="p-3 bg-slate-50 bg-clip-text font-extrabold text-transparent sm:text-6xl text-2xl drop-shadow-md">
						Find smart contract address
						<br />
						<span className="sm:block sm:text-6xl text-3xl">
							{" "}
							before deployment{" "}
						</span>
					</h1>
				</div>

				<center>
					<p className="flex text-sm sm:text-md text-slate-50 text-bold -mt-3 mb-4 sm:mb-6 max-w-3xl drop-shadow-sm">
						Not an astrologer, but Soladd can predict your smart
						contract address just by seeing your wallet address.
						Indeed, you can be smarter than your smart contract, gg.
						Try it yourself and see the magic! ✨
					</p>
				</center>
			</>
		);
	};

	const result = () => {
		return (
			<>
				<a className="relative block overflow-hidden rounded-lg bg-slate-50 p-4 w-full drop-shadow-md">
					<span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"></span>

					<div className="sm:flex flex-center w-full justify-center">
						<div>
							<h3 className="text-xl font-bold text-gray-900 justify-center text-ellipsis truncate">
								{computedAddress}
							</h3>

							<p className="mt-0 text-md font-medium text-gray-600">
								on {chainNames[computedChain]}
							</p>

							<p className="mt-0 text-md font-extrabold text-gray-600">
								Wallet:{" "}
								<span className="font-bold">
									{computedWallet}
								</span>
							</p>
							<p className="mt-0 text-md font-extrabold text-gray-600">
								Nonce:{" "}
								<span className="font-bold">
									{computedNonce}
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-row justify-center space-x-3 mt-1">
						<div
							onClick={() => {
								navigator.clipboard.writeText(computedAddress);
								toast.info(
									"Contract address has been copied.",
									{
										position: "top-right",
										autoClose: 1500,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "light",
									}
								);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8 copyIcon bg-slate-700 stroke-slate-50 rounded-lg p-1 hover:bg-slate-50 hover:stroke-slate-700 cursor-pointer drop-shadow-md"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
								/>
							</svg>
						</div>

						<a
							href={`${chainLinks[chain]}${computedAddress}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8 linkIcon bg-slate-700 stroke-slate-50 rounded-lg p-1 hover:bg-slate-50 hover:stroke-slate-700 cursor-pointer drop-shadow-md"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
								/>
							</svg>
						</a>
					</div>
				</a>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>
					Soladd | Find smart contract address before deployment
				</title>

				<meta property="og:url" content="https://soladd.vercel.app/" />
				<meta property="og:type" content="website" />
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

				<meta
					name="description"
					content="Not an astrologer, but Soladd can predict your smart
							contract address just by seeing your wallet address.
							Indeed, you can be smarter than your smart contract,
							gg. Try it yourself and see the magic! ✨"
				/>

				<meta
					name="keywords"
					content="smart contracts, ethereum, polygon, arbitrum, optimism address, blockchain, EVM"
				/>
				<meta name="author" content="Uday Khokhariya" />

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
			</Head>

			<Navbar />
			<h1 className="main-banner w-full h-full p-2 min-h-screen">
				{cta()}

				<center>
					<div className="flex flex-col flex-center max-w-screen-sm">
						<center className="space-y-3 glass-card sm:p-4 p-2">
							<div className="flex flex-center justify-center">
								{inputAddress()}
							</div>

							<div className="flex items-center max-w-screen-sm justify-between p-2 pt-0 pb-0 sm:flex-row flex-col">
								<div className="sm:w-1/2">{selectChain()}</div>

								{advancedOptionsToggle()}
							</div>

							{showAdvancedOptions ? (
								<>
									<div className="flex max-w-screen-sm p-2 pt-0 pb-0 ">
										{advancedOptions()}
									</div>
								</>
							) : (
								<></>
							)}

							<div className="flex max-w-screen-sm p-2 pt-0 pb-0">
								{findAddress()}
							</div>

							<div className="flex max-w-screen-sm p-2">
								{computedAddress !== "" ? (
									<>{result()}</>
								) : (
									<></>
								)}
							</div>
						</center>
					</div>
				</center>
			</h1>

			<Footer />

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

			<ToastContainer />
		</>
	);
}
