"use strict";

const router = require('express').Router()

const { list, create, read, update, delete: deleteUser } = require('../controllers/user')

/* ------------------------------------------------------- */

// URL : /user -->
router.route('/')
    .get(list)
    .post(create)

router.route('/:userId')
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteUser)

module.exports = router