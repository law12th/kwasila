import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "login", name: "vendor_registry" })
class VendorRegistry {
	@PrimaryColumn({ name: "uuid", type: "uuid" })
	uuid = "";

	@Column({ name: "email", type: "text" })
	email = "";

	@Column({ name: "active", type: "boolean" })
	active = false;

	@Column({ name: "last_login_datetime", type: "datetime" })
	lastLoginDateTime!: Date;
}

export default VendorRegistry;
