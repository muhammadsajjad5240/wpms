// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// below we create schema
const TaxesHistory = new Schema({
    taxId: { type: String },
    taxName: { type: String },
    taxPercentage: { type: Number },
    taxDate: { type: String },
    taxAmount: { type: String },
});
// below we export schema
module.exports = mongoose.model('taxHistory', TaxesHistory);