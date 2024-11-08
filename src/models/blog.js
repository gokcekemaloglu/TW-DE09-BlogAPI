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


const BlogPostSchema = new mongoose.Schema({

  categoryId: { // Default relation is ManyToOne
      ref: "BlogCategory", // referncing it where this field comes.
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      // unique: true // Convert to OneToOne relation
  },

  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },

  title: {
      type: String,
      trim: true,
      required: true
  },

  content: {
      type: String,
      trim: true,
      // required: true
      required: [true, 'Content is required!']
  },

  published:{
      type:Boolean,
      default:true
  }

  // updatedAt
  // createdAt

}, {
  collection: 'BlogPosts', // Table name
  timestamps: true // creates -> createdAt & updatedAt
})


module.exports = {
  BlogCategory: mongoose.model('BlogCategory', BlogCategorySchema),
  BlogPost: mongoose.model('BlogPost', BlogPostSchema)
}