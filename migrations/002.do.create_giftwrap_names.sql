CREATE TABLE giftwrap_names (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    user_id INTEGER REFERENCES giftwrap_users(id)
);