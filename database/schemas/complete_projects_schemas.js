// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// below we create schema
const completeProjectSchema = new schema({
    projectName: {
        type: String
    },
    projectId: {
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
    teamMembers: {
        type: String
    },
    teamLeader: {
        type: String
    },
    projectAmount: {
        type: Number
    },
    projectType: {
        type: String
    },
    technology: {
        type: String
    },
    status: {
        type: String
    }
})
// below we export schema
module.exports = mongoose.model('completeProject',completeProjectSchema);