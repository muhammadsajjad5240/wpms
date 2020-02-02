// below we requrie express
let express = require('express');
// below we requrie shemas
const salarySchema = require('../schemas/salary_schema');
const salaryHistorySchema = require('../schemas/salary_history');
const employeeSchema = require('../schemas/employee_schema');
// below we create express routes
const salarySlipRoutes = express.Router();
// below we create route to create new slip
salarySlipRoutes.route('/newSlip').post(function (req, res) {
    let newSlip = new salarySchema(req.body);
    newSlip.save()
      .then(newSlip => {
        res.status(200).json({ 'newSlip': ' add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newSlip': 'Failed to Register New User' });
      });
  });
  // below we create route to get slip project
  salarySlipRoutes.route('/getSlipReport').post(function (req, res) {
    salarySchema.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      res.send(data);
    });
  });
  // below we create route to get slip
  salarySlipRoutes.route('/getSlip').post(function (req, res) {
    let { id } = req.body;
    salarySchema.find({ slip_id: id }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, data: data });
    });
  });
  // below we create route to get employee record
  salarySlipRoutes.route('/getEmployeeRecord').post(function (req, res) {
    let { id } = req.body;
    employeeSchema.find({ empId: id }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
            return res.json({ success: true, data: data});
    });
  });
  // below we create route to delete slip
  salarySlipRoutes.route('/deleteSlip').post(function (req, res) {
    let { id } = req.body;    
    salarySchema.findOneAndDelete({ slip_id: id}, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true });
    });
  });
  // below  we create route to update the slip
  salarySlipRoutes.route('/updateSlip').post(function (req, res) {
    let { id } = req.body;
    const { emp_name, emp_depart, emp_designation, emp_phone, date, comments, particular, advance, amount, tax, netsalary, subtotals } = req.body;
    salarySchema.updateOne({ slip_id: id }, {
      '$set': {
        'emp_name': emp_name, 'emp_depart': emp_depart,
        'emp_designation': emp_designation, 'emp_phone': emp_phone, 'date': date, 'comments': comments,
        'particular': particular, 'advance': advance, 'amount': amount, 'tax': tax, 'netsalary': netsalary, 'subtotals': subtotals
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // Start of Route of add History
  // below we create route to add slip history
  salarySlipRoutes.route('/newSlipHistory').post(function (req, res) {
    let newSlipHistory = new salaryHistorySchema(req.body);
    newSlipHistory.save()
      .then(newSlipHistory => {
        res.status(200).json({ 'newSlipHistory': 'New Slip History add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newSlipHistory': 'Failed to add Slip History' });
      });
  });
  // below we create route to get slip history
  salarySlipRoutes.route('/getSlipHistory').post(function (req, res) {
    salaryHistorySchema.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      res.send(data);
    });
  });
  // below  we create route to delete salary history
  salarySlipRoutes.route('/deleteSalryHistory').post(function (req, res) {
    let { id } = req.body;    
    salaryHistorySchema.findOneAndDelete({ slip_id: id}, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true });
    });
  });
  // below we create route to update salary from history
  salarySlipRoutes.route('/updateSalaryFromHistory').post(function (req, res) {
    const {emp_name, emp_depart, emp_designation, emp_phone,date, comments, particular,advance,amount,tax,netsalary,subtotals,slip_id} = req.body;
    salarySchema.updateOne({ slip_id: slip_id }, {
      '$set': {
        'emp_name': emp_name,'emp_depart': emp_depart, 'emp_designation': emp_designation,
        'emp_phone': emp_phone, 'date': date, 'comments': comments,'particular': particular,"advance":advance,"amount":amount,
        "tax":tax,"netsalary":netsalary,"subtotals":subtotals
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // End of Route of add history
  // below route to calculate Bills
  salarySlipRoutes.route('/sumSalaries').post(function (req, res) {
    salarySchema.aggregate(
    [{
      $group: {
        _id: null,
        total: { $sum: { $add: ["$amount"] } }
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
  // below we export salarySlipRoutes
module.exports = salarySlipRoutes;