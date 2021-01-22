const xss = require('xss')

const NamesService = {
    getAllNames(knex) {
        return knex
        .select('*')
        .from('giftwrap_names')
    },
    getById(knex, id) {
        return knex
        .from('giftwrap_names')
        .select('*')
        .where('id', id)
        .first()
    },
    insertName(knex, newName) {
        return knex
        .insert(newName)
        .into('giftwrap_names')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    deleteName(knex, id) {
        return knex('giftwrap_names')
        .where('id', id)
        .delete()
    },
    serializeNames(name) {
        return{
            id: name.id,
            name: xss(name.name),
            user_id: name.user_id,
        }
    },
}

module.exports = NamesService