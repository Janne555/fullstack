"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String }
    ]
});
exports.default = mongoose_1.model('Book', schema);
