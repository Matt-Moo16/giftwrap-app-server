const express = require('express')
const GiftService = require('./gifts-service')
const path = require('path')
const { requireAuth } = require('../middleware/jwt-auth')

const giftsRouter = express.Router()
const jsonBodyParser = express.json()

giftsRouter
    .route('/')
    .get((req, res, next) => {
        GiftService.getAllGifts(req.app.get('db'))
        .then(gifts => {
            res.json(gifts.map(GiftService.serializeGifts))
        })
        .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const {name_id, url, price} = req.body
        const newGift = {name_id, url, price}

        for (const [key, value] of Object.entries(newGift))
            if (value === null)
                return res.status(400).json({
                    error: {message: `Missing ${key} in request body`}
                })
        GiftService.insertGift(
            req.app.get('db'),
            newGift
        )
        .then(gift => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${gift.id}`))
            .json(GiftService.serializeGifts(gift))
        })
    })

giftsRouter
    .route('/:gift_id')
    .all(requireAuth)
    .all((req, res, next) => {
        GiftService.getById(
            req.app.get('db'),
            req.params.gift_id
        )
            .then(gift => {
                if(!gift) {
                    return res.status(404),json({
                        error: {message: `Gift does not exist`}
                    })
                }
                res.gift = gift
                next()
            })
            .catch(next)
    })
    .get(requireAuth, (req, res) => {
        res.json(GiftService.serializeGifts(res.gift))
    })
    .delete(requireAuth, (req, res, next) => {
        GiftService.deleteGift(
            req.app.get('db'),
            req.params.gift_id
        )
        .then(numberOfRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

    module.exports = giftsRouter