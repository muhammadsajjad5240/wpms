// below we require express
let express = require('express');
// below we require schemas
const employeeSchema = require('../schemas/employee_schema');
const employeeHistorySchema = require('../schemas/employee_history');
// below we create express router
const salaryRoutes = express.Router();
let receiveEmployeeId;
// below we create route to add emplyoee to database
salaryRoutes.route('/addEmployee').post(function (req, res) {
    let newEmployee = new employeeSchema(req.body);
    newEmployee.save()
      .then(newEmployee => {
        res.status(200).json({ 'newEmployee': ' add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newEmployee': 'Failed to Register New User' });
      });
  });
  // below we create route to get employee from database
  salaryRoutes.route('/getEmployees').post(function (req, res) {
    employeeSchema.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      res.send(data);
    });
  });
  // below we create route to search emplyoee by Id
  salaryRoutes.route('/searchEmployeeId').post(function (req, res) {
    let { emp_id } = req.body;
    employeeSchema.find({ empId: emp_id }).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to search emplyoee by name
  salaryRoutes.route('/searchEmployeeName').post(function (req, res) {
    let { emp_name } = req.body;
    employeeSchema.find({ fullName: emp_name }).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to search emplyoee by designation
  salaryRoutes.route('/searchEmployeeDesignation').post(function (req, res) {
    let { emp_designation } = req.body;
    employeeSchema.find({ designation: emp_designation }).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to search emplyoee by Id name
  salaryRoutes.route('/searchEmployeeIdName').post(function (req, res) {
    let { emp_id,emp_name } = req.body
    employeeSchema.find({$and: [{"empId":emp_id},{"fullName":emp_name}]}).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to search emplyoee by name designation
  salaryRoutes.route('/searchEmployeeNameDesig').post(function (req, res) {
    let { emp_name,emp_designation } = req.body
    employeeSchema.find({$and: [{"fullName":emp_name},{"designation":emp_designation}]}).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to search emplyoee by id designation
  salaryRoutes.route('/searchEmployeeIdDesig').post(function (req, res) {
    let { emp_id,emp_designation } = req.body
    employeeSchema.find({$and: [{"empId":emp_id},{"designation":emp_designation}]}).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to search emplyoee by Id name designation
  salaryRoutes.route('/searchEmployeeIdNameDesig').post(function (req, res) {
    let { emp_id,emp_name,emp_designation } = req.body
    employeeSchema.find({$and: [{"empId":emp_id},{"fullName":emp_name},{"designation":emp_designation},]}).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
  });
  // below we create route to get update employee id
  salaryRoutes.route('/sendupdateEmployeeid').post(function (req, res) {
    let { id } = req.body;
    receiveEmployeeId = id;
  });
  // Below get Employe data for update
  salaryRoutes.route('/getEmployeeDataForUpdate').post(function (req, res) {
    employeeSchema.find({ empId: receiveEmployeeId }).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to update the record
  salaryRoutes.route('/updateEmployee').post(function (req, res) {
    let { id } = req.body;
    const { fullName, userName, email, empId, phone,address, joiningDate, department,designation,company,gender} = req.body;
    employeeSchema.updateOne({ empId: empId }, {
      '$set': {
        'fullName': fullName,'empId': empId, 'userName': userName,
        'email': email, 'empId': empId, 'phone': phone, 'address': address, 'joiningDate': joiningDate,
        'department': department,'designation': designation,'company': company,'gender': gender,
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // below we create route to get emplyoee names
  salaryRoutes.route('/getEmployeeNames').post(function (req, res) {
    employeeSchema.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        res.send(data);
    });
});
// below we create route to check employee name
salaryRoutes.route('/checkEmployee').post(function (req, res) {
  let { fullName,password } = req.body
    employeeSchema.find({$and: [{"fullName":fullName},{"designation":password}]}).
      sort({ id: -1 }).
      exec(function (err, employee) {
        if (err) return res.json(err)
        res.send(employee);
      });
});
// Start of Route of add Employee History
// below we create route to add employee history
salaryRoutes.route('/addEmployeeHistory').post(function (req, res) {
  let newEmployeeHistory = new employeeHistorySchema(req.body);
  newEmployeeHistory.save()
    .then(newEmployeeHistory => {
      res.status(200).json({ 'newEmployeeHistory': 'New History add successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newEmployeeHistory': 'Failed to add Ne History' });
    });
});
// below we create route to get employee history
salaryRoutes.route('/getEmployeeHistory').post(function (req, res) {
  employeeHistorySchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.send(data);
  });
});
// below we create route to delete employee history
salaryRoutes.route('/deleteEmployeeHistory').post(function (req, res) {
  let { id } = req.body;    
  employeeHistorySchema.findOneAndDelete({ empId: id}, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// below we create route to update employee from history
salaryRoutes.route('/updateEmployeeFromHistory').post(function (req, res) {
  const {fullName,email,empId, joiningDate, phone,
    address,department, designation, gender} = req.body;
  employeeSchema.updateOne({ empId: empId }, {
    '$set': {
      'empId': empId,'fullName': fullName, 'email': email,
      'joiningDate': joiningDate, 'phone': phone, 'address': address,'department': department,"designation":designation,"gender":gender
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// End of Route of add Employee History
// below route to count Employees
salaryRoutes.route("/countEmployee").post(function(req, res) {
  employeeSchema.count({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count Designing Employees
salaryRoutes.route("/countDesigningEmployee").post(function(req, res) {
  employeeSchema.count({department:"Designing"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count Development Employees
salaryRoutes.route("/countDevelopmentEmployee").post(function(req, res) {
  employeeSchema.count({department:"Development"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count SEO Employees
salaryRoutes.route("/countSeoEmployee").post(function(req, res) {
  employeeSchema.count({department:"SEO"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below route to count Marketing Employees
salaryRoutes.route("/countMarketingEmployee").post(function(req, res) {
  employeeSchema.count({department:"Marketing"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below we exprot routes
  module.exports = salaryRoutes;