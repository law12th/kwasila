DROP TABLE IF EXISTS users.vendor;

CREATE TABLE users.vendor (
	id 			BIGSERIAL 		PRIMARY KEY,
	vendor_name VARCHAR(255) 	NOT NULL			UNIQUE,
	"password"  TEXT 				NOT NULL,
	email 		TEXT 				NOT NULL 		UNIQUE,
	"address" 	VARCHAR(255) 	NOT NULL,
	phone_1 		VARCHAR(20),
	phone_2 		VARCHAR(20),
	created_at  DATE	 			NOT NULL 		DEFAULT NOW(),
	updated_at  DATE 				NOT NULL 		DEFAULT NOW()
);