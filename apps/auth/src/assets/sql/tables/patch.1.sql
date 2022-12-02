CREATE SCHEMA IF NOT EXISTS sys;
CREATE TABLE sys.patch (
    "key" VARCHAR(64) PRIMARY KEY,
    "value" VARCHAR(255)
);
INSERT INTO sys.patch (key, value)
VALUES ('table_patch_level', '0'),
    ('function_patch_level', '0'),
    ('trigger_patch_level', '0');