import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Base from "./base.entity";

@Entity({ schema: "users", name: "vendor" })
class Vendor extends Base {
	@PrimaryGeneratedColumn({ name: "id" })
	id = 0;

	@Column({ name: "vendor_name", type: "text" })
	vendorName = "";

	@Column({ name: "email", type: "text" })
	email!: string;

	@Column({ name: "phone_1", type: "varchar" })
	phone1!: string;

	@Column({ name: "phone_2", type: "varchar" })
	phone2?: string;

	@Column({ name: "password", type: "text" })
	password = "";

	@Column({ name: "address", type: "varchar" })
	address = "";
}

export default Vendor;
