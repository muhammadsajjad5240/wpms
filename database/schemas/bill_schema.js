// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// below we create schema with projectSchema name
const Bills = new Schema({
    billId: { type: String },
    itemName: { type: String },
    purchaseFrom: { type: String },
    purchaseDate: { type: String },
    purchaseBy: { type: String },
    amount: { type: Number },
    paidBy: { type: String },
});
// below we export schema
module.exports = mongoose.model('ourBill', Bills);