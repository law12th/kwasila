import { Link } from "react-router-dom";

/* eslint-disable arrow-body-style */
const Footer = () => {
	const links = [
		{
			name: "About",
			link: "/about",
		},
		{
			name: "Privacy Policy",
			link: "/privacy-policy",
		},
		{
			name: "Licensing",
			link: "/licensing",
		},
		{
			name: "Contact",
			link: "/contact",
		},
	].map(({ name, link }) => {
		return (
			<li key={name}>
				<Link to={link} className="mr-4 hover:underline md:mr-6">
					{name}
				</Link>
			</li>
		);
	});

	return (
		<footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2022{" "}
				<a href="https://flowbite.com/" className="hover:underline">
					Kwasila™
				</a>
				. All Rights Reserved.
			</span>
			<ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
				{links}
			</ul>
		</footer>
	);
};

export default Footer;
