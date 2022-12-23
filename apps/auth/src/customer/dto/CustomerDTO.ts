import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
} from "class-validator";

class CustomerDTO {
	id = 0;

	@IsNotEmpty({
		message: "First name is required",
	})
	@IsString()
	firstName = "";

	@IsString()
	lastName = "";

	@IsNotEmpty()
	@IsString()
	username = "";

	@IsNotEmpty({
		message: "Phone number is required",
	})
	@IsPhoneNumber("ZM")
	phone = "";

	@IsEmail()
	email = "";

	@IsNotEmpty({ message: "Password is required" })
	@IsStrongPassword({
		minLength: 6,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password = "";
}

export default CustomerDTO;
