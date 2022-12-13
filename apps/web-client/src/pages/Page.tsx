import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const Page = () => {
	return (
		<>
			<div>
				<Navbar />
			</div>
			<div>
				<Outlet />
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
};

export default Page;
