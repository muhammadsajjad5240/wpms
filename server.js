// This is our main file of server side
// below we require express
let express = require('express');
// below we require body parser to extract entire body portion of incomming requests
let bodyParser = require('body-parser');
let cors = require('cors');
// below we require different routes
const Employee = require('./database/routes/employeesRoutes');
const Client = require('./database/routes/clientRoutes');
const Invoices = require('./database/routes/invoices_Routes');
const SalarySlip = require('./database/routes/salarySlipeRoutes');
const Project = require('./database/routes/projectRoutes');
const Bill = require('./database/routes/billroutes');
const Tax = require('./database/routes/taxRoutes');
const Admin = require('./database/routes/admin_routes');
const Email = require('./database/routes/emailRoutes');
// below we create server with express
let server = express();
// below we assign port in which server will run
let port = process.env.PORT || 8000;
// below we create route with express
const salaryRoutes = express.Router();
// below we use cors middleware
server.use(cors());
// below we use middleware to parse the data in json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}))
// below we requrie main file of database configuration for database connection
require('./database/index');
// below we use middleware to use routes
server.use('/Employee',Employee);
server.use('/Client',Client);
server.use('/Invoices',Invoices);
server.use('/Salary',SalarySlip);
server.use('/Projects',Project);
server.use('/Bills',Bill);
server.use('/Taxes',Tax);
server.use('/Admin',Admin);
server.use('/Email',Email);
server.use("/api", salaryRoutes);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'./build/index.html'));
});
// below we are runing server on port and console the message with port number
server.listen(port, () => { console.log('Server is runing on port ' + port) })