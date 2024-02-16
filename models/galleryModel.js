const { model, Schema } = require('mongoose')

const galler_schema = new Schema({
    writerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'authors'
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('images', galler_schema)