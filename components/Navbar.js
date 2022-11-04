const Navbar = () => {
	return (
		<>
			<div className="flex justify-center items-center relative bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 pr-14 text-slate-50">
				<p className=" text-center font-black">SOLADD</p>
				&nbsp;&nbsp;|&nbsp;&nbsp;
				<p className="text-center text-sm font-medium sm:text-center">
					Stay one address ahead of your deployment!
					&nbsp;&nbsp;|&nbsp;&nbsp;Soladd is now live on ProductHunt,{" "}
					<span className="border-b-2 border-slate-50 font-bold cursor-pointer hover:text-sky-300 hover:border-sky-300">
						<a
							href="https://www.producthunt.com/posts/soladd"
							target="_blank"
							rel="noreferrer"
						>
							check it out!
						</a>
					</span>
				</p>
			</div>
		</>
	);
};

export default Navbar;
