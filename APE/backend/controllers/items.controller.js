const db = require('../config/db.config')
const Item = db.items

// FETCH all Items
exports.findAll = (req, res) => {
    Item.findAll().then(items => { // catch
        res.send(items)
    })
}
