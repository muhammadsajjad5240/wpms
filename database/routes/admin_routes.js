// below we import express for create server
let express = require('express');
// below we import admin schema
const adminSchema = require('../schemas/admin_schema');
const adminHistorySchema = require('../schemas/admin_history');
// below we create routes
const adminRoutes = express.Router();
let receiveAdminId,alreadyClientName;
// below we create route to add admin data in database
adminRoutes.route('/addAdmin').post(function (req, res) {
    let newAdmin = new adminSchema(req.body);
    newAdmin.save()
      .then(newAdmin => {
        res.status(200).json({ 'newAdmin': ' add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newAdmin': 'Failed to Register New Admin' });
      });
  });
  adminRoutes.route('/addAdminHistory').post(function (req, res) {
    let newAdminHistory = new adminHistorySchema(req.body);
    console.log(req.body);
    newAdminHistory.save()
      .then(newAdminHistory => {
        res.status(200).json({ 'newAdminHistory': ' add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newAdminHistory': 'Failed to Register New Admin History' });
      });
  });
  adminRoutes.route('/getAdminNames').post(function (req,res){
    adminSchema.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      res.send(data);
  });
  })
// below we create route to get admin data
  adminRoutes.route('/getAdmin').post(function (req, res) {
    let { user_name, password } = req.body;
    adminSchema.find({$and: [{"userName":user_name},{"password":password}]}).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by id
  adminRoutes.route('/searchAdminId').post(function (req, res) {
    let { admin_id } = req.body;
    adminSchema.find({ adminId: admin_id }).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by name
  adminRoutes.route('/searchAdminName').post(function (req, res) {
    let { admin_name } = req.body;
    adminSchema.find({ fullName: admin_name }).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by email
  adminRoutes.route('/searchAdminEmail').post(function (req, res) {
    let { admin_email } = req.body;
    adminSchema.find({ email: admin_email }).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by id name
  adminRoutes.route('/searchAdminIdName').post(function (req, res) {
    let { admin_id,admin_name } = req.body
    adminSchema.find({$and: [{"adminId":admin_id},{"fullName":admin_name}]}).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by name email
  adminRoutes.route('/searchAdminNameEmail').post(function (req, res) {
    let { admin_name,admin_email } = req.body
    adminSchema.find({$and: [{"fullName":admin_name},{"email":admin_email}]}).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by id email
  adminRoutes.route('/searchAdminIdEmail').post(function (req, res) {
    let { admin_id,admin_email } = req.body
    adminSchema.find({$and: [{"adminId":admin_id},{"email":admin_email}]}).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to search admin by id name email
  adminRoutes.route('/searchAdminIdNameEmail').post(function (req, res) {
    let { admin_id,admin_name,admin_email } = req.body
    adminSchema.find({$and: [{"adminId":admin_id},{"fullName":admin_name},{"email":admin_email},]}).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we get update admin id from front-end
  adminRoutes.route('/sendupdateAdminid').post(function (req, res) {
    let { id } = req.body;
    receiveAdminId = id;
  });
  // below we create route to get specific admin
  adminRoutes.route('/getSpecifiAdmin').post(function (req, res) {
    adminSchema.find({ adminId: receiveAdminId }).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // Below get client data for update
  adminRoutes.route('/getAdminDataForUpdate').post(function (req, res) {
    adminSchema.find({ adminId: receiveAdminId }).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to update the admin
  adminRoutes.route('/updateAdmin').post(function (req, res) {
    const { id,fullName, userName, email, adminId, phone, password, address,gender} = req.body;
    adminSchema.updateOne({ adminId: id }, {
      '$set': {
        'fullName': fullName, 'userName': userName,
        'email': email, 'adminId': adminId, 'phone': phone, 'password': password,'address': address,"gender":gender
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // below we create route to get admin data from history
  adminRoutes.route('/getAdminHistory').post(function (req, res) {
    adminHistorySchema.find({}).
      sort({ id: -1 }).
      exec(function (err, admin) {
        if (err) return res.json(err)
        res.send(admin);
      });
  });
  // below we create route to delete Admin history
  adminRoutes.route('/deleteAdminHistory').post(function (req, res) {
  let { id } = req.body;    
  adminHistorySchema.findOneAndDelete({ adminId: id}, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
// below we create route to update Admin from history
adminRoutes.route('/updateAdminFromHistory').post(function (req, res) {
  const {adminId,fullName,email,phone, joiningDate, address,userName,password,gender} = req.body;
  adminSchema.updateOne({ adminId: adminId }, {
    '$set': {
      'fullName': fullName,'userName': userName,"password":password, 'email': email,'adminId': adminId,'joiningDate': joiningDate,
      'phone': phone, 'address': address,gender: 'gender'
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
adminRoutes.route('/getAdminData').post(function (req, res) {
  let {userName} = req.body;
  adminSchema.find({ userName: userName }).
    sort({ id: -1 }).
    exec(function (err, admin) {
      if (err) return res.json(err)
      res.send(admin);
    });
});
  // below we export admin routes
module.exports = adminRoutes;