const xss = require('xss')

const GiftService = {
    getAllGifts(knex) {
        return knex
        .select('*')
        .from('giftwrap_gifts')
    },
    getById(knex, id) {
        return knex 
        .from('giftwrap_gifts')
        .select('*')
        .where('id', id)
        .first()
    },
    insertGift(knex, newGift) {
        return knex
        .insert(newGift)
        .into('giftwrap_gifts')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    deleteGift(knex, id) {
        return knex('giftwrap_gifts')
        .where('id', id)
        .delete()
    },
    serializeGifts(gift) {
        return {
            id: gift.id,
            name_id: gift.name_id,
            url: xss(gift.url),
            price: gift.price,
        }
    },
}

module.exports = GiftService