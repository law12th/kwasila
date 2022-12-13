/* eslint-disable arrow-body-style */
import { useState } from "react";
import { Link } from "react-router-dom";

const active_navbar_link_class =
	"block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
const inactive_navbar_link_class =
	"block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

const Navbar = () => {
	const [activeLink, setActiveLink] = useState("");

	const handleClick = (link: string) => {
		setActiveLink(link);
	};

	const links = [
		{
			label: "Home",
			link: "/",
		},
		{
			label: "About",
			link: "/about",
		},
		{
			label: "Services",
			link: "/services",
		},
		{
			label: "Pricing",
			link: "/pricing",
		},
		{
			label: "Contact",
			link: "/contact",
		},
	].map(({ label, link }) => {
		return (
			<li key={link}>
				<Link
					to={link}
					onClick={() => handleClick(link)}
					className={
						activeLink === link
							? active_navbar_link_class
							: inactive_navbar_link_class
					}
				>
					{label}
				</Link>
			</li>
		);
	});

	return (
		<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2 5 rounded dark:bg-gray-900">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<Link className="flex items-container" to="/">
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						Kwasila
					</span>
				</Link>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						{links}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
