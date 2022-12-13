import * as z from "zod";
import { useAuth } from "@/lib/auth";
import { InputField, Form, Button } from "@/components";
import { Link } from "react-router-dom";

const schema = z.object({
	vendorName: z.string().min(3, "Vendor name must be at least 3 characters"),
	email: z.string().email("Email must be a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	phoneNumber: z
		.string()
		.min(10, "Phone number must be at least 10 characters"),
});

type RegisterFormValues = {
	vendor_name: string;
	email: string;
	address: string;
	phone_1: string;
	phone_2?: string;
	password: string;
};

type RegisterFormProps = {
	onSuccess: () => void;
};

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
	const { register, isRegistering } = useAuth();

	return (
		<div>
			<Form<RegisterFormValues, typeof schema>
				onSubmit={async (values) => {
					await register(values);
					onSuccess();
				}}
				schema={schema}
				options={{
					shouldUnregister: true,
				}}
			>
				{({ register, formState }) => (
					<>
						<InputField
							type="text"
							label="Vendor Name"
							error={formState.errors["vendor_name"]}
							registration={register("vendor_name")}
						/>
						<InputField
							type="email"
							label="Email Address"
							error={formState.errors["email"]}
							registration={register("email")}
						/>
						<InputField
							type="password"
							label="password"
							error={formState.errors["password"]}
							registration={register("password")}
						/>
						<InputField
							type="text"
							label="address"
							error={formState.errors["address"]}
							registration={register("address")}
						/>
						<InputField
							type="text"
							label="phone"
							error={formState.errors["phone_1"]}
							registration={register("phone_1")}
						/>
						<div>
							<Button
								isLoading={isRegistering}
								type="submit"
								className="w-full"
							>
								Register
							</Button>
						</div>
					</>
				)}
			</Form>
			<div className="mt-2 flex items-center justify-end">
				<div className="text-sm">
					<Link
						to="../login"
						className="font-medium text-blue-600 hover:text-blue-500"
					></Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
