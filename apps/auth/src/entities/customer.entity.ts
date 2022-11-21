import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Base from "./base.entity";

@Entity({ schema: "action", name: "customer" })
class Customer extends Base {
	@PrimaryGeneratedColumn({ name: "id" })
	id = 0;

	@Column({ name: "given_name", type: "text" })
	givenName = "";

	@Column({ name: "family_name", type: "text" })
	familyName = "";

	@Column({ name: "username", type: "varchar" })
	username = "";

	@Column({ name: "email", type: "text" })
	email!: string;

	@Column({ name: "phone", type: "varchar" })
	phone!: string;

	@Column({ name: "date_of_birth", type: "date" })
	dateOfBirth!: Date;

	@Column({ name: "password", type: "text" })
	password = "";
}

export default Customer;
