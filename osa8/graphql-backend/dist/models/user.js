"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: String
});
exports.default = mongoose_1.model('User', schema);
