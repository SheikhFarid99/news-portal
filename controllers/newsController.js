const { formidable } = require('formidable')
const cloudinary = require('cloudinary').v2
const newsModel = require('../models/newsModel')
const authModel = require('../models/authModel')
const moment = require('moment')

class newsController {
    add_news = async (req, res) => {

        const { id, category, name } = req.userInfo
        const form = formidable({})
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })
        try {

            const [fields, files] = await form.parse(req)
            const { url } = await cloudinary.uploader.upload(files.image[0].filepath, { folder: 'news_images' })
            const { title, description } = fields
            const news = await newsModel.create({
                writerId: id,
                title: title[0].trim(),
                slug: title[0].trim().split(' ').join('-'),
                category,
                description: description[0],
                date: moment().format('LL'),
                writerName: name,
                image : url
            })
            return res.status(201).json({ message: 'news add success', news })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new newsController()