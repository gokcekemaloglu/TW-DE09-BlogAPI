'use strict'
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const { BlogPost, BlogCategory } = require('../models/blog')

// BLOG CATEGORY SHOULD BE DONE

/* ------------------------------------------------------- */
// blogCategory controllers
module.exports.blogCategory = {

    list: async (req, res) => {

        const result = await BlogCategory.find()

        res.status(200).send({
            error: false,
            result
        })
    },

    create: async (req, res) => {


        const result = await BlogCategory.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {


        // const result = await BlogCategory.findOne({ _id: req.params.categoryId })

        const result = await BlogCategory.findById(req.params.categoryId)

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        /* !!modifiedCount, get the boolean value of the data, short of -> Boolean(modifiedCount) */
        const { categoryId } = req.params

        /* ------------------------------------------------------- *


        // const result = await BlogCategory.updateOne({ ...filter }, {...data})
        // const { modifiedCount } = await BlogCategory.updateOne({ _id: categoryId }, req.body)
        const { modifiedCount } = await BlogCategory.updateOne({ _id: categoryId }, req.body)

        res.status(modifiedCount ? 202 : 404).send({
            error: !modifiedCount,
            updated: await BlogCategory.findById(categoryId)
        })

        /* ------------------------------------------------------- */

        const updatedData = await BlogCategory.findByIdAndUpdate(categoryId, req.body, {
            new: true, // return updated data 
        })

        res.status(202).send({
            error: false,
            updatedData
        })


    },

    delete: async (req, res) => {

        const { deletedCount } = await BlogCategory.deleteOne({ _id: req.params.categoryId }) // deletecCount return 1 if it is success otherwide return 0


        // res.status(deletedCount ? 204 : 404).send({
        //     error: !deletedCount,
        // })

        if (deletedCount) res.sendStatus(204)
        else throw new Error("Something went wrong!")

    }
}

/* ------------------------------------------------------- */
// blogPost controllers
module.exports.blogPost = {

    list: async (req, res) => {

        /* ------------------------------------------------------- *

        // FILTERING &  SEARCHING & SORTING & PAGINATION

        // console.log('line 101-->', req.query)

        // Filtering:
        // URL?filter[fieldName1]=value1&filter[fieldName2]=value2
        const filter = req.query?.filter || {}


        // Searching:
        // URL?search[fieldName1]=value1&search[fieldName2]=value2
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        const search = req.query?.search || {}

        // { "<field>": { "$regex": "pattern" } }
        for (let key in search)
            search[key] = { $regex: search[key] } // assiging new value
        //console.log(search['key'])


        // Sorting:
        // URL?sort[fieldName]=asc&sort[fieldName2]=desc
        const sort = req.query?.sort || {}

        // Limit:
        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20)

        // Page:
        let page = Number(req.query?.page)
        page = page > 0 ? page : 1

        // Skip:
        let skip = Number(req.query?.skip)
        skip = skip > 0 ? skip : ((page - 1) * limit)

        // console.log('limit--', limit)
        // console.log('skip--', skip)
        // console.log('page--', page)


        const result = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip)
        /* ------------------------------------------------------- */


        // SELECT & POPULATE:
        // const result = await BlogPost.find({...search-filter},{...select})
        // const result = await BlogPost.find({}, { categoryId: true, title: true, content: true, _id: false }).populate('categoryId') // default --> _id : true

        const result = await res.getModelList(BlogPost)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(BlogPost),
            result
        })
    },

    create: async (req, res) => {

        req.body.userId = req.user._id

        const result = await BlogPost.create(req.body)


        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        const result = await BlogPost.findById(req.params.postId)

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        const { postId } = req.params

        const updatedData = await BlogPost.findByIdAndUpdate(postId, req.body, { new: true })

        res.status(202).send({
            error: false,
            updatedData
        })
    },

    delete: async (req, res) => {

        const { deletedCount } = await BlogPost.deleteOne({ _id: req.params.postId })

        if (deletedCount) res.sendStatus(204)
        else throw new Error("Something went wrong!")

    }
}