const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: { type: String, require: true },
    data: Buffer,
    contentType: { type: String },
    active: { type: Boolean, default: true }, // Added for tracking the active status
});

imageSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        const base64 = Buffer(doc.data).toString("base64");
        ret.data = `data:image/${doc.contentType};base64,${base64}`;
        return ret;
    },
});

module.exports = mongoose.model('Image', imageSchema);
