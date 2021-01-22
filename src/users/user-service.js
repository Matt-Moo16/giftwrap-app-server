const xss = require('xss')
const bcrypt = require('bcryptjs')

const UserService = {
    hasUserWithEmail(db, email) {
        return db('giftwrap_users') 
        .where({ email })
        .first()
        .then(user => !!user)
    },
    insertUser(db, newUser) {
        return db 
        .insert(newUser)
        .into('giftwrap_users')
        .returning('*')
        .then(([user]) => user)
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        return null
    },
    hashPassword(password) {
       return bcrypt.hash(password, 7) 
    }, 
    serializeUser(user) {
        return {
            id: user.id,
            name: xss(user.name),
            email: xss(user.email),
            password: xss(user.password),
            date_created: user.date_created,
        }
    },
}

module.exports = UserService