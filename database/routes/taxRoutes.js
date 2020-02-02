// below we requrie express
let express = require('express');
// below we requrie schemas
const EmployeeSchema = require('../schemas/employee_schema');
const taxHistorySchema = require('../schemas/tax_history');
const taxSchema = require('../schemas/taxSchema');
// below we create express route
const taxRoutes = express.Router();
// below we create route to add tax
taxRoutes.route('/addTax').post(function (req, res) {
    let newtax = new taxSchema(req.body);
    newtax.save()
      .then(newtax => {
        res.status(200).json({ 'newtax': 'Bill add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newtax': 'Failed to Add New Bill' });
      });
  });
  // below we create route to get taxes
  taxRoutes.route('/gettaxes').post(function (req,res){
    taxSchema.find((err, data) =>{
        if(err) return res.json({success: false, error: err});
        res.send(data);
    })
});
// below we create route to get specific tax record
taxRoutes.route('/getSpecificTax').post(function (req, res) {
    let { id } = req.body;
    taxSchema.find({ taxId: id }).
      sort({ id: -1 }).
      exec(function (err, tax) {
        if (err) return res.json(err)
        res.send(tax);
      });
  });
  // below we create route to update Tax
  taxRoutes.route('/updateTax').post(function (req, res) {
    const { taxId,taxName, taxPercentage, taxDate, taxAmount} = req.body;
    taxSchema.updateOne({ taxId: taxId }, {
      '$set': {
        'taxName': taxName,
        'taxPercentage': taxPercentage, 'taxDate': taxDate, "taxAmount":taxAmount,
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // below we create route to get employee names
  taxRoutes.route('/getEmployeeNames').post(function (req, res) {
    EmployeeSchema.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        res.send(data);
    });
});
// below we create route to delete tax
taxRoutes.route('/deleteTax').post(function (req, res) {
  let { id } = req.body;    
  taxSchema.findOneAndDelete({ taxId: id}, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// Start of Route of add Tax History
// below we create route to add tax history
taxRoutes.route('/addTaxHistory').post(function (req, res) {
  let newtaxHistory = new taxHistorySchema(req.body);
  newtaxHistory.save()
    .then(newtaxHistory => {
      res.status(200).json({ 'newtaxHistory': 'Tax History add successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newtaxHistory': 'Failed to Add Tax History' });
    });
});
// below we create route to get tax history
taxRoutes.route('/getTaxeHistory').post(function (req,res){
  taxHistorySchema.find((err, data) =>{
      if(err) return res.json({success: false, error: err});
      res.send(data);
  })
});
// below we create route to delete tax history
taxRoutes.route('/deleteTaxHistory').post(function (req, res) {
  let { id } = req.body;    
  taxHistorySchema.findOneAndDelete({ taxId: id}, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// below we create route to update tax history
taxRoutes.route('/updateTaxHistory').post(function (req, res) {
  const { taxId, taxName, taxPercentage, taxDate,taxAmount} = req.body;
  taxSchema.updateOne({ taxId: taxId }, {
    '$set': {
      'taxName': taxName,
      'taxPercentage': taxPercentage, 'taxDate': taxDate, "taxAmount":taxAmount,
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// End of Route of add Tax History
// below route to calculate Bills
taxRoutes.route('/sumTaxes').post(function (req, res) {
  taxSchema.aggregate(
    [{
      $group: {
        _id: null,
        total: { $sum: { $add: ["$taxAmount"] } }
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
// below we export Tax routes
  module.exports = taxRoutes;
