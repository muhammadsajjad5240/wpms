// below we require mongoose to create mongodb schemas
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// below we create schema with projectSchema name
const projectSchema = new schema({
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
    teamMembers: {
        type: Object
    },
    teamLeader: {
        type: Array
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
module.exports = mongoose.model('Project',projectSchema);