// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// below we create schema
const projectAmountSchema = new schema({
    projectName: {
        type: String
    },
    projectId: {
        type: String
    },
    clientName: {
        type: String
    },
    projectDesc: {
        type: String
    },
    projectDeadline: {
        type: String
    },
    projectStrtDate: {
        type: String
    },
    projectAmount: {
        type: Number
    },
    paid:{
        type: String
    },
    paymentType:{
        type: String
    },
    projectType: {
        type: String
    },
    technology: {
        type: String
    },
})
// below we export schema
module.exports = mongoose.model('ProjectAmount',projectAmountSchema);