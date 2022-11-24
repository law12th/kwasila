DROP TABLE IF EXISTS ref.city;
CREATE TABLE ref.city (
    id BIGSERIAL PRIMARY KEY,
    country_id INT REFERENCES ref.country('id') NOT NULL,
    "name" TEXT NOT NULL
);