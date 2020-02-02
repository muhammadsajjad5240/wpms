// below we require express
let express = require('express');
// below we import schemas
const EmployeeSchema = require('../schemas/employee_schema');
const BillSchema = require('../schemas/bill_schema');
const BillHistory = require('../schemas/bill_history');
// create express routes
const billRoutes = express.Router();
// below we create route to add bill record in database
billRoutes.route('/addBill').post(function (req, res) {
    let newBill = new BillSchema(req.body);
    newBill.save()
      .then(newBill => {
        res.status(200).json({ 'newBill': 'Bill add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newBill': 'Failed to Add New Bill' });
      });
  });
  // below we create route to get bills from database
billRoutes.route('/getBills').post(function (req,res){
    BillSchema.find((err, data) =>{
        if(err) return res.json({success: false, error: err});
        res.send(data);
    })
});
// below we create route to get specific bill record
billRoutes.route('/getSpecifiBill').post(function (req, res) {
    let { id } = req.body;
    // below we find bill by billid
    BillSchema.find({ billId: id }).
      sort({ id: -1 }).
      exec(function (err, bill) {
        if (err) return res.json(err)
        // below we send bill object as a response
        res.send(bill);
      });
  });
  // below we create route to update the bill
  billRoutes.route('/updateBill').post(function (req, res) {
    // below we get data from front-end body
    const { billId,itemName, purchaseFrom, purchaseDate, purchaseBy, amount, paidBy} = req.body;
    // below we update the record base on bill Id
    BillSchema.updateOne({ billId: billId }, {
      '$set': {
        'itemName': itemName, 'purchaseFrom': purchaseFrom,
        'purchaseDate': purchaseDate, 'purchaseBy': purchaseBy, 'amount': amount, 'paidBy': paidBy,
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // below we create route to get employee name
  billRoutes.route('/getEmployeeNames').post(function (req, res) {
    EmployeeSchema.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        res.send(data);
    });
});

// Start of History Routes
// below we create route to add bill history
billRoutes.route('/addBillHitory').post(function (req, res) {
  let newBillHistory = new BillHistory(req.body);
  newBillHistory.save()
    .then(newBillHistory => {
      res.status(200).json({ 'newBillHistory': 'Bill History add successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newBillHistory': 'Failed to Add Bill history' });
    });
});
// below we create route to get bill history
billRoutes.route('/getBillHistory').post(function (req,res){
  BillHistory.find((err, data) =>{
      if(err) return res.json({success: false, error: err});
      res.send(data);
  })
});
// below we create route to delelte the history
billRoutes.route('/deleteBillHistory').post(function (req, res) {
  // res.send('Hello');
  let { id } = req.body;    
  BillHistory.findOneAndDelete({ billId: id}, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// below we create route to update the bill from histpry
billRoutes.route('/updateBillFromHistory').post(function (req, res) {
  // console.log('helo');
  const {billId, itemName, purchaseFrom, purchaseDate,purchaseBy, amount, paidBy} = req.body;
  // console.log(req.body);
  BillSchema.updateOne({ billId: billId }, {
    '$set': {
      'itemName': itemName,'purchaseFrom': purchaseFrom, 'purchaseDate': purchaseDate,
      'purchaseBy': purchaseBy, 'amount': amount, 'paidBy': paidBy
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// End of History Routes
// below route to calculate Bills
billRoutes.route('/sumBills').post(function (req, res) {
  BillSchema.aggregate(
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
  module.exports = billRoutes;
