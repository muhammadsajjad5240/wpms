// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// below we create schema
const SalaryHistory = new Schema({
    slip_id:{type: Number},
    emp_name: { type: String },
    emp_depart: { type: String },
    emp_designation: { type: String },
    emp_phone: { type: String },
    date: { type: String },
    comments: {type: String},
    particular: { type: String },
    advance: { type: Number },
    amount: { type: Number },
    tax: { type: Number },
    netsalary: {type: Number},
    subtotals: {type: Number}
});
// below we export schema
module.exports = mongoose.model('salaryHistory', SalaryHistory);