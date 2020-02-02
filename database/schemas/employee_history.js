// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// below we create schema
const employeeHistory = new schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    empId: {
        type: String
    },
    joiningDate: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    department: {
        type: String
    },
    designation: {
        type: String
    },
    gender:{
        type: String
    }
})
// below we export schema
module.exports = mongoose.model('EmployeeHistory',employeeHistory);