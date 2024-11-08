
















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

  BlogPost: mongoose.model('BlogPost', BlogPostSchema)
}