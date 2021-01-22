CREATE TABLE giftwrap_gifts (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name_id INTEGER REFERENCES giftwrap_names(id),
    url TEXT NOT NULL, 
    price DOUBLE PRECISION NOT NULL
);