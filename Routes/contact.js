const express = require('express')
const Contact = require('../Controllers/contact')

const router = express.Router()

router.post('/message',Contact.getContacts)

module.exports = router