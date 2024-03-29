// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// below we create schema
const clientSchema = new schema({
    fullName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    clientId: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    }
})
// below we export schema
module.exports = mongoose.model('Clients',clientSchema);