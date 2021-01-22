const express = require('express')
const NamesService = require('./names-service')
const path = require('path')
const {requireAuth} = require('../middleware/jwt-auth')

const namesRouter = express.Router()
const jsonBodyParser = express.json()

namesRouter
    .route('/')
    .get((req, res, next) => {
        NamesService.getAllNames(req.app.get('db'))
        .then(names => {
            res.json(names.map(NamesService.serializeNames))
        })
        .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const {name, user_id} = req.body
        const newName = {name, user_id}

        for(const [key, value] of Object.entries(newName))
        if (value === null)
        return res.status(400).json({
            error: {message: `Missing '${key}' in request body`}
        })
        NamesService.insertName(
            req.app.get('db'),
            newName
        )
        .then(name => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${name.id}`))
            .json(NamesService.serializeNames(name))
        })
        .catch(next)
    })

namesRouter
    .route('/:name_id')
    .all(requireAuth)
    .all((req, res, next) => {
        NamesService.getById(
            req.app.get('db'),
            parseInt(req.params.name_id)
        )
            .then(name => {
                if (!name) {
                    return res.status(404).json({
                        error: {message: `Name doesn't exist`}
                    })
                }
                res.name = name 
                next()
            })
            .catch(next)
    })
    .get(requireAuth, (req, res, next) => {
        res.json(NamesService.serializeNames(res.name))
    })
    .delete(requireAuth, (req, res, next) => {
        NamesService.deleteName(
            req.app.get('db'),
            req.params.gift_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = namesRouter