const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    count:Number,
    content: {
        type: String,
        required: true
    },
    author: String,
    date: {
        type: String
    },
    newdate:{
        type:Number
    },
    image:String,
    hashTags : Array,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
});

module.exports = mongoose.model('post', postSchema)
