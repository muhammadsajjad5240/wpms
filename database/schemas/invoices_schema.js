const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Invoices = new Schema({
    slip_id: { type: Number },
    projectId: {type: String},
    projectName: { type: String },
    clientName: { type: String },
    project_description: { type: String },
    project_start_date: { type: String },
    project_end_date: { type: String },
    project_amount: { type: Number },
    paid:{
        type: String
    },
    paymentType:{
        type: String
    },
    project_type: { type: String },
    project_technoloy: { type: String },
});
module.exports = mongoose.model('clientInvoice', Invoices);