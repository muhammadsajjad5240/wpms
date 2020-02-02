// below we require mongoose
let mongoose = require('mongoose');
// const mongoURI = "mongodb://127.0.0.1:27017/salarySlips";
// const mongoURI = "mongodb://127.0.0.1:27017/wpms";
const mongoURI= "mongodb+srv://muhammadsajjad:sajjad197@cluster0-salme.mongodb.net/test?retryWrites=true&w=majority";
//  const dbRoute = "mongodb://127.0.0.1:27017/mydb";
mongoose.connect(
    mongoURI,  
    { useNewUrlParser: true }
  );
  let db = mongoose.connection;
  db.once("open", () => console.log("connected to the database"));
  // checks if connection with the database is successful
  db.on("error", console.error.bind(console, "MongoDB connection error:"));