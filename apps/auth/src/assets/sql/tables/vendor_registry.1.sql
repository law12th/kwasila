DROP TABLE IF EXISTS "login".vendor_registry;
CREATE TABLE "login".vendor_registry (
    uuid UUID PRIMARY KEY,
    email TEXT NOT NULL,
    active BOOLEAN DEFAULT FALSE,
    last_login_datetime TIMESTAMP
);