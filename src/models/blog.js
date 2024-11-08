'use strict'

// mongoose 
const mongoose = require('mongoose');

// Blog Category Schema
const BlogCategorySchema = new mongoose.Schema({

    // _id

    name: {
        type: String,
        trim: true,
        required: true
    }

}, {
    collection: 'BlogCategories', // Table name
    timestamps: true // creates -> createdAt & updatedAt
})

module.exports = {
    BlogCategory: mongoose.model('BlogCategory', BlogCategorySchema)
}