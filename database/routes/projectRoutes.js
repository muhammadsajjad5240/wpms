// below we require express
let express = require('express');
// below we create express router
const projectRoutes = express.Router();
// below we require schemas
const ClientSchema = require('../schemas/clientSchema');
const projectSchema = require('../schemas/add_project_schema');
const projectHitorySchema = require('../schemas/project_history');
const projectAmountSchmea = require('../schemas/project_amount');
const completeProjectSchema = require('../schemas/complete_projects_schemas');
let sendProjectId;
// below we create route to add project in database
projectRoutes.route('/addProject').post(function (req, res) {
  let newProject = new projectSchema(req.body);
  // console.log(req.body);
  newProject.save()
    .then(newProject => {
      res.status(200).json({ 'newProject': ' add successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newProject': 'Failed to Register New User' });
    });
});
// below we create route to add project in project amount table in database
projectRoutes.route('/addProjectAmount').post(function (req, res) {
  let newProjectAmount = new projectAmountSchmea(req.body);
  newProjectAmount.save()
    .then(newProjectAmount => {
      res.status(200).json({ 'newProjectAmount': ' add successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newProjectAmount': 'Failed to Register New User' });
    });
});
// below we create route to get project from projectamount table
projectRoutes.route('/getProjectAmount').post(function (req, res) {
  projectAmountSchmea.find((err, data) => {
  }).sort({ projectDeadline: 1 }).
    exec(function (err, data) {
      if (err) return res.json(err)
      res.send(data);
    });
});
// below we create route to update project amount
projectRoutes.route('/updateProjectAmount').post(function (req, res) {
  const { projectId, paid, paymentType } = req.body;
  projectAmountSchmea.updateOne({ projectId: projectId }, {
    '$set': {
      'paid': paid, 'paymentType': paymentType
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
projectRoutes.route('/updateProjectAmounts').post(function (req, res) {
  const { projectId, projectAmount } = req.body;
  projectAmountSchmea.updateOne({ projectId: projectId }, {
    '$set': {
      'projectAmount': projectAmount
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// below we create route to get projets
projectRoutes.route('/getAllProjects').post(function (req, res) {
  projectSchema.find((err, data) => {
  }).sort({ projectDeadline: 1 }).
    exec(function (err, data) {
      if (err) return res.json(err)
      res.send(data);
    });
});
// below we create route to get invoices
projectRoutes.route('/deleteInvoice').post(function (req, res) {
  let { id } = req.body;
  salarySchema.findOneAndDelete({ projectId: id }, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// below we create route to searh project by Id
projectRoutes.route('/searchProjectId').post(function (req, res) {
  let { project_id } = req.body;
  projectSchema.find({ projectId: project_id }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh project by name
projectRoutes.route('/searchProjectName').post(function (req, res) {
  let { project_name } = req.body;
  projectSchema.find({ projectName: project_name }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh project by type
projectRoutes.route('/searchProjectType').post(function (req, res) {
  let { project_type } = req.body;
  projectSchema.find({ projectType: project_type }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh project by Id name
projectRoutes.route('/searchProjectIdName').post(function (req, res) {
  let { project_id, project_name } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectName": project_name }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh project by name type
projectRoutes.route('/searchProjectNameType').post(function (req, res) {
  let { project_name, project_type } = req.body
  projectSchema.find({ $and: [{ "projectName": project_name }, { "projectType": project_type }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh project by Id type
projectRoutes.route('/searchProjectIdType').post(function (req, res) {
  let { project_id, project_type } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectType": project_type }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh project by Id name type
projectRoutes.route('/searchProjectIdNameType').post(function (req, res) {
  let { project_id, project_name, project_type } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectName": project_name }, { "projectType": project_type },] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to update project status
projectRoutes.route('/updateProjectStatus').post(function (req, res) {
  let { id, status } = req.body;
  projectSchema.updateOne({ projectId: id }, {
    '$set': {
      'status': status
    }
  },
    { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// below we create route to get complete projects
projectRoutes.route('/completeProjects').post(function (req, res) {
  projectSchema.find({ status: "complete" }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to get runing projects
projectRoutes.route('/runingProjects').post(function (req, res) {
  projectSchema.find({ status: "start" }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// Start of routes of search complete project
// below we create route to searh complete project by Id  
projectRoutes.route('/searchCompleteProjectId').post(function (req, res) {
  let { project_id } = req.body;
  projectSchema.find({ $and: [{ "projectId": project_id }, { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh complete project by name
projectRoutes.route('/searchCompleteProjectName').post(function (req, res) {
  let { project_name } = req.body;
  projectSchema.find({ $and: [{ "projectName": project_name }, { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh complete project by type
projectRoutes.route('/searchCompleteProjectType').post(function (req, res) {
  let { project_type } = req.body;
  projectSchema.find({ $and: [{ "projectType": project_type }, { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh complete project by Id name
projectRoutes.route('/searchCompleteProjectIdName').post(function (req, res) {
  let { project_id, project_name } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectName": project_name }, { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh complete project by name type
projectRoutes.route('/searchCompleteProjectNameType').post(function (req, res) {
  let { project_name, project_type } = req.body
  projectSchema.find({ $and: [{ "projectName": project_name }, { "projectType": project_type }, { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh complete project by Id type
projectRoutes.route('/searchCompleteProjectIdType').post(function (req, res) {
  let { project_id, project_type } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectType": project_type }, { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh complete project by name type
projectRoutes.route('/searchCompleteProjectIdNameType').post(function (req, res) {
  let { project_id, project_name, project_type } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectName": project_name }, { "projectType": project_type }, , { "status": "complete" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// End of routes of search complete project
// start of routes of Runing complete project
// below we create route to searh runing project by Id  
projectRoutes.route('/searchRuningProjectId').post(function (req, res) {
  let { project_id } = req.body;
  projectSchema.find({ $and: [{ "projectId": project_id }, { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh runing project by name
projectRoutes.route('/searchRuningProjectName').post(function (req, res) {
  let { project_name } = req.body;
  projectSchema.find({ $and: [{ "projectName": project_name }, { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh runing project by  type
projectRoutes.route('/searchRuningProjectType').post(function (req, res) {
  let { project_type } = req.body;
  projectSchema.find({ $and: [{ "projectType": project_type }, { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh runing project by Id  name
projectRoutes.route('/searchRuningProjectIdName').post(function (req, res) {
  let { project_id, project_name } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectName": project_name }, { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh runing project by name type
projectRoutes.route('/searchRuningProjectNameType').post(function (req, res) {
  let { project_name, project_type } = req.body
  projectSchema.find({ $and: [{ "projectName": project_name }, { "projectType": project_type }, { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh runing project by Id  type
projectRoutes.route('/searchRuningProjectIdType').post(function (req, res) {
  let { project_id, project_type } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectType": project_type }, { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to searh runing project by name type
projectRoutes.route('/searchRuningProjectIdNameType').post(function (req, res) {
  let { project_id, project_name, project_type } = req.body
  projectSchema.find({ $and: [{ "projectId": project_id }, { "projectName": project_name }, { "projectType": project_type }, , { "status": "start" }] }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// End of routes of Runing complete project
// below we create route to send update project id
projectRoutes.route('/sendupdateProjectid').post(function (req, res) {
  let { id } = req.body;
  sendProjectId = id;
});
// below we create route to get specific project
projectRoutes.route('/getSpecificProject').post(function (req, res) {
  projectSchema.find({ projectId: sendProjectId }).
    sort({ id: -1 }).
    exec(function (err, project) {
      if (err) return res.json(err)
      res.send(project);
    });
});
// below we create route to update the project
projectRoutes.route('/updateProject').post(function (req, res) {
  let { id } = req.body;
  const { projectName, projectId, projectDesc, projectDeadline, projectStrtDate, teamMembers, teamLeader, projectAmount, projectType, technology, status } = req.body;
  projectSchema.updateOne({ projectId: id }, {
    '$set': {
      'projectName': projectName, 'projectId': projectId,
      'projectDesc': projectDesc, 'projectDeadline': projectDeadline, 'projectStrtDate': projectStrtDate, 'teamMembers': teamMembers, 'teamLeader': teamLeader,
      'projectAmount': projectAmount, 'projectType': projectType, 'technology': technology, 'status': status,
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// below we create route to get project clients
projectRoutes.route('/getProjectClients').post(function (req, res) {
  ClientSchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.send(data);
  });
});
// Start of Route of Save Hisory Data
// below we create route to add project history
projectRoutes.route('/addProjectHistory').post(function (req, res) {
  let newProjectHistory = new projectHitorySchema(req.body);
  newProjectHistory.save()
    .then(newProjectHistory => {
      res.status(200).json({ 'newProjectHistory': ' add History successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newProjectHistory': 'Failed to Add History' });
    });
});
// below we create route to get project history
projectRoutes.route('/getProjectHistory').post(function (req, res) {
  projectHitorySchema.find((err, data) => {
  }).sort({ projectDeadline: 1 }).
    exec(function (err, data) {
      if (err) return res.json(err)
      res.send(data);
    });
});
// below we create route to delete project history
projectRoutes.route('/deleteProjectHistory').post(function (req, res) {
  let { id } = req.body;
  projectHitorySchema.findOneAndDelete({ projectId: id }, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// below we create route to update project from history
projectRoutes.route('/updateProjectFromHistory').post(function (req, res) {
  const { projectName, projectId, clientName, projectDesc, projectDeadline, projectStrtDate,
    teamMembers, teamLeader, projectAmount, projectType, technology, status } = req.body;
  // console.log(req.body);
  projectSchema.updateOne({ projectId: projectId }, {
    '$set': {
      'projectName': projectName, 'projectId': projectId, 'clientName': clientName,
      'projectDesc': projectDesc, 'projectDeadline': projectDeadline, 'projectStrtDate': projectStrtDate, 'teamMembers': teamMembers,
      "teamLeader": teamLeader, "projectAmount": projectAmount, "projectType": projectType, "technology": technology, "status": status
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// End of Route of save History Data
// below route to count projects
projectRoutes.route("/countProjects").post(function (req, res) {
  projectSchema.count({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count complete projects
projectRoutes.route("/countCompleteProjects").post(function (req, res) {
  projectSchema.count({ status: "complete" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count runing projects
projectRoutes.route("/countRuningProjects").post(function (req, res) {
  projectSchema.count({ status: "start" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count web projects
projectRoutes.route("/countWebProjects").post(function (req, res) {
  projectSchema.count({ projectType: "WebSite" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count Android projects
projectRoutes.route("/countAndroidProjects").post(function (req, res) {
  projectSchema.count({ projectType: "Android Application" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count Desktop projects
projectRoutes.route("/countDesktopProjects").post(function (req, res) {
  projectSchema.count({ projectType: "Desktop Application" }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to calculate earnings
projectRoutes.route('/sumEaraning').post(function (req, res) {
  projectAmountSchmea.aggregate(
    [{
      $group: {
        _id: null,
        total: { $sum: { $add: ["$projectAmount"] } }
        // totaldocs: { $sum: "$user_totaldocs" },
        // totalthings: { $sum: "$user_totalthings" }
      }
    }],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(result);
        // console.log(result);
      }
    }
  )
});
// below we export projectRoutes
module.exports = projectRoutes;