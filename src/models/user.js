"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const { Schema, model } = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

/* ------------------------------------------------------- /

const crypto = require('node:crypto')

// parameters
// const keyCode = process.env.KEY_CODE
// const loopCount = Number(process.env.LOOP_COUNT)
// const charCount = Number(process.env.CHAR_COUNT)
// const encType = process.env.ENC_TYPE

const keyCode = '21yuifhsdkjfgisafisadhfsgawfhssvsfifashfusagfjsdga' // secretKey 
const loopCount = 10_000 // number of loops
const charCount = 32 // write 32 for 64
const encType = 'sha512' // Type of algorithm


const passwordEncrypt = (password) => {

    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
}

/* ------------------------------------------------------- */
