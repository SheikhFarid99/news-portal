const { model, Schema } = require('mongoose')

const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('authors', authSchema)