// below we require express for routes
let express = require('express');
// below we import schemas
const projectSchema = require('../schemas/add_project_schema');
let receiveClientId,alreadyClientName;
const ClientSchema = require('../schemas/clientSchema');
const ClientHistorySchema = require('../schemas/client_history');
const projectAmountSchmea = require('../schemas/project_amount');
let receiveClientName;
// below we create express routes
const clientRoutes = express.Router();
// below we create route to add client
clientRoutes.route('/addClient').post(function (req, res) {
    let newClient = new ClientSchema(req.body);
    newClient.save()
      .then(newClient => {
        res.status(200).json({ 'newClient': ' add successfully' });
      })
      .catch(err => {
        res.status(400).json({ 'newClient': 'Failed to Register New User' });
      });
  });
  // below we create route to get clients
  clientRoutes.route('/getClients').post(function (req, res) {
    ClientSchema.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      res.send(data);
    });
  });
  // below we create route to search client by id
  clientRoutes.route('/searchClientId').post(function (req, res) {
    let { client_id } = req.body;
    ClientSchema.find({ clientId: client_id }).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to search client by name
  clientRoutes.route('/searchClientName').post(function (req, res) {
    let { client_name } = req.body;
    ClientSchema.find({ fullName: client_name }).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to search client by email
  clientRoutes.route('/searchClientEmail').post(function (req, res) {
    let { client_email } = req.body;
    ClientSchema.find({ email: client_email }).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to search client by id name
  clientRoutes.route('/searchClientIdName').post(function (req, res) {
    let { client_id,client_name } = req.body
    ClientSchema.find({$and: [{"clientId":client_id},{"fullName":client_name}]}).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to search client by name email
  clientRoutes.route('/searchClientNameEmail').post(function (req, res) {
    let { client_name,client_email } = req.body
    ClientSchema.find({$and: [{"fullName":client_name},{"email":client_email}]}).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to search client by id email
  clientRoutes.route('/searchClientIdEmail').post(function (req, res) {
    let { client_id,client_email } = req.body
    ClientSchema.find({$and: [{"clientId":client_id},{"email":client_email}]}).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to search client by id name email
  clientRoutes.route('/searchClientIdNameEmail').post(function (req, res) {
    let { client_id,client_name,client_email } = req.body
    ClientSchema.find({$and: [{"clientId":client_id},{"fullName":client_name},{"email":client_email},]}).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we get update client id from front-end
  clientRoutes.route('/sendupdateClienttid').post(function (req, res) {
    let { id } = req.body;
    receiveClientId = id;
  });
  // below we create route to get specific clietn
  clientRoutes.route('/getSpecifiClient').post(function (req, res) {
    ClientSchema.find({ clientId: receiveClientId }).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to receive client name
  clientRoutes.route('/sendClienttName').post(function (req, res) {
    let { client_name } = req.body;
    receiveClientName = client_name;
  });
  // below we create route to get client projects
  clientRoutes.route('/getClientProject').post(function (req, res) {
    projectSchema.find({ clientName: receiveClientName }).
      sort({ id: -1 }).
      exec(function (err, project) {
        if (err) return res.json(err)
        res.send(project);
      });
  });
  // below we create route to receive client name
  clientRoutes.route('/sendClientName').post(function (req, res) {
    let { client_name } = req.body;
  });
  clientRoutes.route('/alreadyClientName').post(function (req, res) {
    projectSchema.find({ clientName: alreadyClientName }).
      sort({ id: -1 }).
      exec(function (err, names) {
        if (err) return res.json(err)
        res.send(names);
      });
  });
  // Below get client data for update
  clientRoutes.route('/getClientDataForUpdate').post(function (req, res) {
    ClientSchema.find({ clientId: receiveClientId }).
      sort({ id: -1 }).
      exec(function (err, client) {
        if (err) return res.json(err)
        res.send(client);
      });
  });
  // below we create route to update the client
  clientRoutes.route('/updateClient').post(function (req, res) {
    let { id } = req.body;
    const { fullName, userName, email, clientId, phone, address, gender} = req.body;
    ClientSchema.updateOne({ clientId: id }, {
      '$set': {
        'fullName': fullName, 'userName': userName,
        'email': email, 'clientId': clientId, 'phone': phone, 'address': address,'gender': gender,
      }
    }, { multi: true },
      err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
  })
  // below we create route to get slip project
  clientRoutes.route('/getSlipProject').post(function (req, res) {
    let { id } = req.body;
    projectAmountSchmea.find({ projectId: id }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
            return res.json({ success: true, data: data});
    });
  });
  // below we create route to get client invoies
  clientRoutes.route('/invoices').post(function (req, res) {
    Invoices.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      res.send(data);
    });
  });
  // below we create route to get clietn name
  clientRoutes.route('/getClientNames').post(function (req, res) {
    ClientSchema.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        res.send(data);
    });
});


// Start of Route of add client History
  // below we create route to add client history
clientRoutes.route('/addClientHistory').post(function (req, res) {
  let newClientHistory = new ClientHistorySchema(req.body);
  newClientHistory.save()
    .then(newClientHistory => {
      res.status(200).json({ 'newClientHistory': 'History add successfully' });
    })
    .catch(err => {
      res.status(400).json({ 'newClientHistory': 'Failed to Add History' });
    });
});
  // below we create route to get client history
clientRoutes.route('/getClientHistory').post(function (req, res) {
  ClientHistorySchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.send(data);
  });
});
  // below we create route to delete client history
clientRoutes.route('/deleteClientHistory').post(function (req, res) {
  let { id } = req.body;    
  ClientHistorySchema.findOneAndDelete({ clientId: id}, (err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true });
  });
});
  // below we create route to update client from history
clientRoutes.route('/updateClientFromHistory').post(function (req, res) {
  const {id, fullName,userName,email,phone,address,gender} = req.body;
  ClientSchema.updateOne({ clientId: id }, {
    '$set': {
      'clientId': id,'fullName': fullName, 'userName': userName,
      'email': email, 'phone': phone, 'address': address,'gender': gender,
    }
  }, { multi: true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
})
// End of Route of ADd Client History
// below route to count runing projects
clientRoutes.route("/countClients").post(function(req, res) {
  ClientSchema.count({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// below we export clientRoute
  module.exports = clientRoutes;