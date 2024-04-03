const moment = require('moment/moment');
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String },
    category: { type: String },
    status: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    description: { type: String },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
});

newsSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.date = moment(doc.date).format("YYYY-MM-DD")
        return ret;
    },
});
const News = mongoose.model('News', newsSchema);

module.exports = News;