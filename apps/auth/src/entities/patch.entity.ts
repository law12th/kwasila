import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "sys", name: "patch" })
class Patch {
	@PrimaryColumn({ name: "key", type: "varchar" })
	key = "";

	@Column({ name: "value", type: "varchar" })
	value = "";
}

export default Patch;
