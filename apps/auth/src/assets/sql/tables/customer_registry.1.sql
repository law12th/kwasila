CREATE SCHEMA IF NOT EXISTS "login";
DROP TABLE IF EXISTS "login".customer_registry;
CREATE TABLE "login".customer_registry (
    uuid UUID PRIMARY KEY,
    email TEXT NOT NULL,
    active BOOLEAN DEFAULT FALSE,
    last_login_datetime TIMESTAMP
);