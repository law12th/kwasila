DROP TABLE IF EXISTS users.customer;

CREATE TABLE users.customer (
	id				 BIGSERIAL 		PRIMARY KEY,
	given_name 	 VARCHAR(255) 	NOT NULL,
	family_name  VARCHAR(255)  NOT NULL,
	"password" 	 TEXT 			NOT NULL,
	email 		 TEXT 			UNIQUE,
	phone 		 VARCHAR(20),
	username 	 VARCHAR(100)  NOT NULL 	UNIQUE,
	created_at 	 DATE 			NOT NULL 	DEFAULT NOW(),
	updated_at   DATE 			NOT NULL 	DEFAULT NOW()
);