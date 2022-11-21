import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "sys", name: "patch" })
class Patch {
	@PrimaryColumn({ name: "key" })
	key = "";

	@Column({ name: "value" })
	value = "";
}

export default Patch;
