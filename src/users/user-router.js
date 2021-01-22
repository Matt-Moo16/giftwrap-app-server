const express = require('express')
const path = require('path')
const { hasUserWithEmail } = require('./user-service')
const UserService = require('./user-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const {name, email, password} = req.body

        for (const field of ['name', 'email', 'password'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
        
        const passwordError = UserService.validatePassword(password)

        if (passwordError)
            return res.status(400).json({ error: passwordError })
        
        UserService.hasUserWithEmail(
            req.app.get('db'),
            email
        )
            .then(hasUserWithEmail => {
                if(hasUserWithEmail)
                    return res.status(400).json({error: `Email is already taken`})

                return UserService.hashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            name,
                            email,
                            password: hashedPassword,
                            date_created: 'now()',
                        }

                        return UserService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res 
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(UserService.serializeUser(user))
                            })
                    })

            })
            .catch(next)
    })

    module.exports = usersRouter