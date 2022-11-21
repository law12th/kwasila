import { CreateDateColumn, UpdateDateColumn } from "typeorm";

abstract class Base {
	@CreateDateColumn({ name: "created_at" })
	createdAt!: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt!: Date;
}

export default Base;
