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

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required!"],
      // validate: (email) => {
      //     if (email.includes('@') && email.includes('.')) {
      //         return true
      //     } else {
      //         return false
      //     }
      // },
      // validate: (email)=> (email.includes('@') && email.includes('.')),
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email type is incorrect!",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: true,

      /* ------------------------------------------------------- *

        set: (password) => { 1234 --> 331247687vd7345f3hds687234gdf76382532g3tvdf
            return 'customPassword'
        },
        validate: (password) => {
            if (password.length < 5) return false
            else true
        },

        /* ------------------------------------------------------- */

      set: (password) => {
        // set runs before validate
        if (password.length < 5) {
          // throw new Error('Invalid Password!') // Syntax Error
          return "InvalidPassword";
        } else {
          return passwordEncrypt(password);
        }
      },
      validate: (password) => {
        if (password === "InvalidPassword") {
          return false;
        } else {
          return true;
        }
      },
      /* ------------------------------------------------------- */
      // set: (password) => (password.length > 5 ? passwordEncrypt(password) : 'InvalidPassword'),
      // validate: (password) => password != 'InvalidPassword'
    },

    userName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    firstName: String,

    lastName: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
