"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
});
schema.virtual('bookCount', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author',
    count: true
});
exports.default = mongoose_1.model('Author', schema);
