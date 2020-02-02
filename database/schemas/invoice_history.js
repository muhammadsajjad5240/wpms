// below we export schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// below we create schema
const InvoicesHistory = new Schema({
    slip_id: { type: Number },
    projectName: { type: String },
    clientName: { type: String },
    project_description: { type: String },
    project_start_date: { type: String },
    project_end_date: { type: String },
    project_amount: { type: Number },
    project_type: { type: String },
    project_technoloy: { type: String },
});
// below we export schema
module.exports = mongoose.model('invoiceHistory', InvoicesHistory);