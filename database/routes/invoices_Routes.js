// below we require express
let express = require('express');
// below we require schemas
const Invoices = require('../schemas/invoices_schema');
const InvoicesHistory = require('../schemas/invoice_history');
// below we create express routes
const invoiceRoutes = express.Router();
// below we create route to add new invoice
invoiceRoutes.route('/newInvoice').post(function (req, res) {
    let newSlip = new Invoices(req.body);
    newSlip.save()
      .then(newSlip => {
        res.status(200).json({ 'newSlip': ' add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newSlip': 'Failed to Register New User' });
      });
  });
  // below we create route to get invoice from database
  invoiceRoutes.route('/getInvlices').post(function (req,res){
    Invoices.find((err, data)=>{
        if(err) return res.json({success: false, error: err});
        res.send(data);
    });
  });
  // below we create router to delelte invoice
  invoiceRoutes.route('/deleteInvoice').post(function (req, res) {
    let { id } = req.body; 
    Invoices.findOneAndDelete({ slip_id: id}, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true });
    });
  });
  // below we create route to get invoices
  invoiceRoutes.route('/getInvoice').post(function (req, res) {
    let { id } = req.body;
    Invoices.find({ slip_id: id }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, data: data });
    });
  });
  // Start of Route of add client History
  // below we create route to save invoice history
  invoiceRoutes.route('/InvoiceHistory').post(function (req, res) {
    let SlipHistory = new InvoicesHistory(req.body);
    SlipHistory.save()
      .then(SlipHistory => {
        res.status(200).json({ 'SlipHistory': 'History add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'SlipHistory': 'Failed to add History' });
      });
  });
  // below we create route to get invoice history
  invoiceRoutes.route('/getInvliceHistory').post(function (req,res){
    InvoicesHistory.find((err, data)=>{
        if(err) return res.json({success: false, error: err});
        res.send(data);
    });
  });
  // End of Route of add client History
  // Start of Route of update invoice
  invoiceRoutes.route('/updateInvoice').post(function (req, res) {
    const { slip_id,projectName, clientName, project_description, project_start_date, project_end_date, project_amount,paid,paymentType, project_type, project_technoloy} = req.body;
    Invoices.updateOne({ slip_id: slip_id }, {
      '$set': {
        'projectName': projectName, 'clientName': clientName,
        'project_description': project_description, 'project_start_date': project_start_date, 'project_end_date': project_end_date, 'project_amount': project_amount,
        'project_type': project_type,'paymentType': paymentType,'paid': paid, 'project_technoloy': project_technoloy
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // End of Route of update invoice
  // below we export invoiceRoutes
  module.exports = invoiceRoutes;