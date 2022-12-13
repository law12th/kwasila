import { createBrowserRouter } from "react-router-dom";
import {
	AboutPage,
	ContactPage,
	ErrorPage,
	LandingPage,
	Page,
	PricingPage,
	ServicesPage,
	LicensingPage,
	PrivacyPolicyPage,
} from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Page />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "about",
				element: <AboutPage />,
			},
			{
				path: "contact",
				element: <ContactPage />,
			},
			{
				path: "services",
				element: <ServicesPage />,
			},
			{
				path: "pricing",
				element: <PricingPage />,
			},
			{
				path: "licensing",
				element: <LicensingPage />,
			},
			{
				path: "privacy-policy",
				element: <PrivacyPolicyPage />,
			},
		],
	},
]);

export default router;
