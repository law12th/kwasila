import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "login", name: "customer_registry" })
class CustomerRegistry {
	@PrimaryColumn({ name: "uuid", type: "uuid" })
	uuid = "";

	@Column({ name: "email", type: "text" })
	email = "";

	@Column({ name: "active", type: "boolean" })
	active = false;

	@Column({ name: "last_login_datetime", type: "datetime" })
	lastLoginDateTime!: Date;
}

export default CustomerRegistry;
