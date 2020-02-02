// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// below we create schema
const adminSchema = new schema({
    fullName: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    adminId: {
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
    gender:{
        type: String
    }
})
// below we export schema
module.exports = mongoose.model('admin',adminSchema);