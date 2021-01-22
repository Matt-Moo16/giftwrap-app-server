module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/giftwrap',
    JWT_SECRET: process.env.JWT_SECRET || 'someotherkey'
}