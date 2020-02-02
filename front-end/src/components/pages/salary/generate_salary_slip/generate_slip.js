// Below we import modules necessary for component and declare some global variables
import React, { Component } from 'react';
import './generate_slip.css';
import logo from '../../../../assets/images/wpms_images/logo.png';
import jsPDF from 'jspdf';
var converter = require('number-to-words');
let axios = require('axios');
let obj, month;
const qurryString = require("query-string");
// Below we create constructor and create state for component form data
class GenerateSlips extends Component {
  constructor(props) {
    super(props);
    // below we bind all function
    this.handleEmpName = this.handleEmpName.bind(this);
    this.handleEmpDepart = this.handleEmpDepart.bind(this);
    this.handleEmpDesig = this.handleEmpDesig.bind(this);
    this.handleSalMonth = this.handleSalMonth.bind(this);
    this.handleEmpPhone = this.handleEmpPhone.bind(this);
    this.handleEmpComments = this.handleEmpComments.bind(this);
    this.handleEmpParticular = this.handleEmpParticular.bind(this);
    this.handleEmpAdvance = this.handleEmpAdvance.bind(this);
    this.handleEmpAmount = this.handleEmpAmount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    // Below we create state in which component form data will hold
    this.state = {
      data: [],
      emp_name: '',
      emp_depart: '',
      emp_desig: '',
      emp_id: '',
      sal_mon: '',
      emp_phone: '',
      comments: '',
      particluar: '',
      advance: '',
      amount: '',
      tax: '',
      netsalary: '',
      subtotals: '',
      slip_id: '',
      taxAmount: '',
      totalDeduction: '',
      salaryWords: ''
    }
  }
  // below is function of handleEmployee Name
  handleEmpName = (e) => {
    this.setState({ emp_name: e.target.value });
    let letters = /^[a-zA-Z ]+$/;
    let name = document.getElementById('emp_name').value;
    if (!letters.test(name) || name.length < 3) {
      document.getElementById('emp_name').style.border = '1px solid red';
    }
    else {
      document.getElementById('emp_name').style.border = '1px solid grey';
    }
  }
  // Below is function of handle department
  handleEmpDepart = (e) => {
    this.setState({ emp_depart: e.target.value });
    let department = document.getElementById('emp_depart').value;
    if (department === "Select Department") {
      document.getElementById('emp_depart').style.border = '1px solid red';
    }
    else {
      document.getElementById('emp_depart').style.border = '1px solid grey';
    }
  }
  // Below is function to handleEmployee Designation
  handleEmpDesig = (e) => {
    this.setState({ emp_desig: e.target.value });
    let designation = document.getElementById('_designation').value;
    if (designation === 'Development') {
      document.getElementById('development_deis').style.display = 'block'
      document.getElementById('seo_deis').style.display = 'none'
      document.getElementById('designing_deis').style.display = 'none'
      document.getElementById('marketing_deis').style.display = 'none'
    }
    else if (designation === 'SEO') {
      document.getElementById('development_deis').style.display = 'none'
      document.getElementById('seo_deis').style.display = 'block'
      document.getElementById('designing_deis').style.display = 'none'
      document.getElementById('marketing_deis').style.display = 'none'
    }
    else if (designation === 'Designing') {
      document.getElementById('development_deis').style.display = 'none'
      document.getElementById('seo_deis').style.display = 'none'
      document.getElementById('designing_deis').style.display = 'block'
      document.getElementById('marketing_deis').style.display = 'none'
    }
    else if (designation === 'Marketing') {
      document.getElementById('development_deis').style.display = 'none'
      document.getElementById('seo_deis').style.display = 'none'
      document.getElementById('designing_deis').style.display = 'none'
      document.getElementById('marketing_deis').style.display = 'block'
    }
  }
  // Below we handle salary month
  handleSalMonth = (e) => {
    this.setState({ sal_mon: e.target.value });
  }
  // below we handle Employee Phone Number
  handleEmpPhone = (e) => {
    this.setState({ emp_phone: e.target.value });
    let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    let phone = document.getElementById('emp_phone').value;
    if (!letters.test(phone)) {
      document.getElementById('emp_phone').style.border = '1px solid red';
    }
    else {
      document.getElementById('emp_phone').style.border = '1px solid grey';
    }
  }
  // Below we handle Comments about employee
  handleEmpComments = (e) => {
    this.setState({ comments: e.target.value });
    let letters = /^[a-zA-Z0-9.,/ ]+$/;
    let comments = document.getElementById('comments').value;
    if (!letters.test(comments) || comments.length < 10) {
      document.getElementById('comments').style.border = '1px solid red';
    }
    else {
      document.getElementById('comments').style.border = '1px solid grey';
    }
  }
  // Below we handle Either the employee is Project base or Monthly Base
  handleEmpParticular = (e) => {
    this.setState({ particluar: e.target.value });
    let particular = document.getElementById('particluars').value;
    if (particular === 'Particular') {
      document.getElementById('particluars').style.border = '1px solid red';
      document.getElementById('particularlbl').style.color = 'red'
      document.getElementById('particularlbl').innerText = 'Particular *';
    }
    else {
      document.getElementById('particluars').style.border = '1px solid grey';
      document.getElementById('particularlbl').style.color = '#000000'
      document.getElementById('particularlbl').innerText = 'Particular';
    }
  }
  // Belowe we handle the Employee Advance Payment
  handleEmpAdvance = (e) => {
    this.setState({ advance: e.target.value });
    let letters = /^[0-9 ]+$/;
    let advance = document.getElementById('_advance').value;
    if (!letters.test(advance) || advance === "") {
      document.getElementById('_advance').style.border = '1px solid red';
      document.getElementById('advancelbl').style.color = 'red'
      document.getElementById('advancelbl').innerText = 'Advance *';
    }
    else {
      document.getElementById('_advance').style.border = '1px solid grey';
      document.getElementById('advancelbl').style.color = '#000000'
      document.getElementById('advancelbl').innerText = 'Advance';
    }
    let amount = document.getElementById('_amount').value;
    let tax = document.getElementById('_tax').value;
    let percentage = tax / 100 * amount;
    let deduction = amount - advance - percentage;
    this.setState({ netsalary: deduction });
    this.setState({ subtotals: deduction });
  }
  // Belowe we handle Employee Total Amount
  handleEmpAmount = (e) => {
    this.setState({ amount: e.target.value });
    let letters = /^[0-9 ]+$/;
    let amount = document.getElementById('_amount').value;
    if (!letters.test(amount)) {
      document.getElementById('_amount').style.border = '1px solid red';
      document.getElementById('amountlbl').style.color = 'red'
      document.getElementById('amountlbl').innerText = 'Amount *';
    }
    else {
      document.getElementById('_amount').style.border = '1px solid grey';
      document.getElementById('amountlbl').style.color = '#000000'
      document.getElementById('amountlbl').innerText = 'Amount';
    }
    let tax = document.getElementById('_tax').value;
    let advance = document.getElementById('_advance').value;
    let percentage = tax / 100 * amount;
    let deduction = amount - advance - percentage;
    this.setState({ netsalary: deduction });
    this.setState({ subtotals: deduction });
  }
  // Below we handle Employee Tax
  handleTax = (e) => {
    this.setState({ tax: e.target.value });
    let letters = /^[0-9]+$/;
    let tax = document.getElementById('_tax').value;
    if (!letters.test(tax)) {
      document.getElementById('taxlbl').style.color = 'red'
      document.getElementById('taxlbl').innerText = 'Tax (%) *';
      document.getElementById('_tax').style.border = '1px solid red';
    }
    else {
      document.getElementById('taxlbl').style.color = '#000000'
      document.getElementById('taxlbl').innerText = 'Tax (%)';
      document.getElementById('_tax').style.border = '1px solid grey';
    }
    let amount = document.getElementById('_amount').value;
    let advance = document.getElementById('_advance').value;
    let percentage = tax / 100 * amount;
    let deduction = amount - advance - percentage;
    this.setState({ taxAmount: percentage });
    this.setState({ netsalary: deduction });
    this.setState({ subtotals: deduction });
  }
  // Below we handle Submit fucntion which will run when the use will submit the form 
  // This function will also check validation and send form data to server.
  handleSubmit = (e) => {
    e.preventDefault();
    let namePattern = /^[a-zA-Z ]+$/;
    let phonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    let amountPattern = /^[0-9 ]+$/;
    let name = document.getElementById('emp_name').value;
    let department = document.getElementById('emp_depart').value;
    let designation = document.getElementById('_designation').value;
    let phone = document.getElementById('emp_phone').value;
    let particluar = document.getElementById('particluars').value;
    let advance = document.getElementById('_advance').value;
    let amount = document.getElementById('_amount').value;
    let tax = document.getElementById('_tax').value;
    if (!namePattern.test(name) || name.length < 3) {
      document.getElementById('emp_name').style.border = '1px solid red';
    }
    else if (particluar === "Particular") {
      document.getElementById('particluars').style.border = '1px solid red';
      document.getElementById('particularlbl').style.color = 'red'
      document.getElementById('particularlbl').innerText = 'Particular *';
    }
    else if (!amountPattern.test(advance) || advance === "") {
      document.getElementById('_advance').style.border = '1px solid red';
      document.getElementById('advancelbl').style.color = 'red'
      document.getElementById('advancelbl').innerText = 'Advance *';
    }
    else if (!amountPattern.test(amount)) {
      document.getElementById('_amount').style.border = '1px solid red';
      document.getElementById('amountlbl').style.color = 'red'
      document.getElementById('amountlbl').innerText = 'Amount *';
    }
    else if (!amountPattern.test(tax)) {
      document.getElementById('_tax').style.border = '1px solid red';
      document.getElementById('taxlbl').style.color = 'red'
      document.getElementById('taxlbl').innerText = 'Tax (%) *';
    }
    else {
      // below we create object in which we store data and send to route for server
      let newSlip = {
        emp_name: this.state.emp_name,
        emp_depart: this.state.emp_depart,
        emp_designation: this.state.emp_desig,
        emp_phone: this.state.emp_phone,
        emp_id: this.state.emp_id,
        date: this.state.sal_mon,
        comments: this.state.comments,
        particular: this.state.particluar,
        advance: this.state.advance,
        amount: this.state.amount,
        tax: this.state.tax,
        netsalary: this.state.netsalary,
        subtotals: this.state.subtotals,
        slip_id: this.state.slip_id
      }
      // below we use route and send object which we create before and send object to server
      axios.post('/Salary/newSlip', newSlip)
        .then(res =>
          console.log(res.data));
      let pramerter = qurryString.parse(window.location.search)
      let salary_words = converter.toWords(this.state.netsalary); // => “thirteen”
      this.setState({ salaryWords: salary_words });
      // Below is start of create and view the pdf which create and view . This can also be download.
      var doc = new jsPDF('p', 'pt');
      // start of main heading 
      doc.setFontSize(20)
      doc.setTextColor('#000000')
      doc.text(120, 60, 'PAYSLIP FOR THE MONTH OF ' + month);
      // End of main heading 
      // start of Slip ID heading 
      doc.setFontSize(12)
      doc.setTextColor('#000')
      doc.text(430, 140, 'PAYSLIP # ' + this.state.slip_id)
      // End of Slip ID heading 
      doc.setFontSize(12)
      doc.setTextColor('#000000')
      doc.text(430, 180, 'Salary Month: ' + this.state.sal_mon)
      // start of address heading 
      doc.setFontSize(12)
      doc.setTextColor('#000000')
      doc.text(140, 100, 'WAMPDO p-29 street no 3 people colony no 2 Faisalabad ')
      // End of address heading 
      // Start of Logo
      var imgData = 'data:image/png;base64,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'
      doc.addImage(imgData, 'JPEG', 20, 100, 120, 100);
      // End of Logo
      doc.setFontSize(12)
      doc.setTextColor('#000000')
      doc.setFontType("bold")
      doc.text(20, 220, 'Name :')
      doc.setFontType("normal")
      doc.text(120, 220, this.state.emp_name)
      // start of department heading 
      doc.setFontSize(12)
      doc.setTextColor('#000000')
      doc.setFontType("bold")
      doc.text(20, 260, 'Department :')
      doc.setFontType("normal")
      doc.text(120, 260, this.state.emp_depart)
      // End of Department Heading
      // start of employee ID heading
      doc.setFontSize(12)
      doc.setTextColor('#000000')
      doc.setFontType("bold")
      doc.text(20, 300, 'Employee ID :')
      doc.setFontType("normal")
      doc.text(120, 300, pramerter.id)
      // End of employee ID heading
      // start of totla Earnings
      doc.setFontSize(12)
      doc.setFontType("bold")
      doc.setTextColor('#000')
      doc.text(20, 340, 'Earnings')
      // End of Basic Salary
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal")
      doc.text(20, 380, 'Basic Salary')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(250, 380, this.state.amount)
      // End of basic salary
      // starto of Home Allowance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(20, 420, 'House Rent Allowance (H.R.A.)')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(250, 420, '0')
      // End of Home Allowance
      // Start of conyance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(20, 460, 'Conveyance')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(250, 460, '0')
      // End of conyance
      // start of other allowance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(20, 500, 'Other Allowance')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(250, 500, '0')
      // End of other allowance
      // start of Total Earnings
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 540, 'Total Earnings')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(250, 540, this.state.amount)
      // End of Total Earnings


      doc.setFontType("bold");
      doc.setFontSize(12)
      doc.setTextColor('#000')
      doc.text(330, 340, 'Deductions')
      // End of Basic Salary
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal")
      doc.text(330, 380, 'Tax')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(535, 380, this.state.tax)
      // End of basic salary
      // starto of Home Allowance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(330, 420, 'Provident Fund')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(535, 420, '0')
      // End of Home Allowance
      // Start of conyance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(330, 460, 'Tax Amount')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      this.state.taxAmount = String(this.state.taxAmount)
      doc.text(535, 460, this.state.taxAmount)
      // End of conyance
      // start of other allowance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(330, 500, 'Loan')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(535, 500, this.state.advance)
      // End of other allowance
      let totalDeduction = Number(this.state.advance) + Number(this.state.taxAmount);
      this.setState({ totalDeduction: totalDeduction });
      // start of Total Deduction
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(330, 540, 'Total Deductions')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(535, 540, String(totalDeduction))
      // End of Total Deduction
      // start of Total Net Salary
      doc.setFontSize(14)
      doc.setTextColor('#000')
      doc.setFontType("bold")
      doc.text(20, 580, 'Net Salary')
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal")
      this.state.netsalary = String(this.state.netsalary)
      doc.text(120, 580, this.state.netsalary)
      salary_words = String(salary_words)
      doc.text(175, 580, '('+salary_words+')')
      // End of Total Net Salary    
      // start of employeer signature
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal")
      doc.text(100, 660, 'Employer Signature')
      // End of employeer signature
      // start of employeer signature
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal");
      doc.text(360, 660, 'CEO Signature')
      // End of employeer signature
      // Save the Data
      // doc.save('Generated'.pdf);
      // window.open(doc.output('Generated'.pdf));
      // doc.autoPrint();
      // Below we create function which will print pdf in new browser window which is called blob.
      window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=2480 ,height=1400");
      // Below we replace location with new component after submit form
      window.location.replace('/dashboard/salary-report');
      // Below we empty all the state which data we sent to server and display in pdf
      this.setState({
        emp_name: '',
        emp_depart: '',
        emp_desig: '',
        sal_mon: '',
        emp_phone: '',
        comments: '',
        date: new Date(),
        particluar: '',
        advance: '',
        amount: '',
        tax: '',
        netsalary: '',
        subtotals: '',
        slip_id: ''
      })
    }
  };
  // below is function of focus input when user will focus on input field
  myfocus = (a) => {
    document.getElementById(a).style.border = "1px solid grey";
  }
  // Below is function which will run when the component will load
  // In this function we retrieve some data just like Employee Name, Departmnet, Designation and Phone Number.
  componentDidMount = () => {
    localStorage.clear();
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    month = m + "/" + y;
    let d = n.getDate();
    let newdate = document.getElementById("date").innerHTML += m + "/" + d + "/" + y;
    this.setState({ sal_mon: newdate });
    let length = 5;
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.setState({ slip_id: text })
    let pramerter = qurryString.parse(window.location.search)
    axios.post("/Salary/getEmployeeRecord", {
      id: pramerter.id
    })
      .then(res => {
        this.setState(this.state.data = res.data)
        for (let i in this.state.data) {
          obj = this.state.data[i];
        };
        this.setState({ emp_id: pramerter.id })
        this.setState({ emp_name: obj.fullName })
        this.setState({ emp_depart: obj.department })
        this.setState({ emp_desig: obj.designation })
        this.setState({ emp_phone: obj.phone })
        if (this.state.emp_depart === 'Development') {
          document.getElementById('development_deis').style.display = 'block'
          document.getElementById('seo_deis').style.display = 'none'
          document.getElementById('designing_deis').style.display = 'none'
          document.getElementById('marketing_deis').style.display = 'none'
        }
        else if (this.state.emp_depart === 'SEO') {
          document.getElementById('development_deis').style.display = 'none'
          document.getElementById('seo_deis').style.display = 'block'
          document.getElementById('designing_deis').style.display = 'none'
          document.getElementById('marketing_deis').style.display = 'none'
        }
        else if (this.state.emp_depart === 'Designing') {
          document.getElementById('development_deis').style.display = 'none'
          document.getElementById('seo_deis').style.display = 'none'
          document.getElementById('designing_deis').style.display = 'block'
          document.getElementById('marketing_deis').style.display = 'none'
        }
        else if (this.state.emp_depart === 'Marketing') {
          document.getElementById('development_deis').style.display = 'none'
          document.getElementById('seo_deis').style.display = 'none'
          document.getElementById('designing_deis').style.display = 'none'
          document.getElementById('marketing_deis').style.display = 'block'
        }
      })
      .catch(error => { console.log(error) });
  }
  render() {
    return (
      <div id='generate_slip'>
        <form>
          <div className='row'>
            <div className='col-xs-2 offset-xs-5 col-sm-1 offset-sm-4 mt-5 col-md-4 offset-md-5 col-lg-4 offset-lg-5'>
              <img src={logo} alt='WPMS Logo' className='generate_slip_logo' />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6 offset-sm-3 mt-2 text-center '>
              <p className='mr-4'><b>Address:</b> p-29 street no 3 people colony no 2 Faisalabad </p>
            </div>
          </div>
          <hr />
          <table class="table table-borderless table-responsive-sm">
            <thead></thead>
            <tbody>
              <tr>
                <th>Phone#</th>
                <td className='text-left pl-5'>+92 304 0519392</td>
                <th></th>
                <td></td>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th>Email#</th>
                <td className='text-left pl-5'>info@wampdo.com</td>
                <th></th>
                <td></td>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th>Slip Id:</th>
                <td className='text-left pl-5'>{this.state.slip_id}</td>
                <th></th>
                <td></td>
                <th></th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className='row table-heading-style'>
            <div className='col-md-12 col-lg-12 col-md-12 text-white mt-1'>
              <h2>Employee Details</h2>
            </div>
          </div>
          <br />
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="employeeName" class="col-md-5 col-sm-12 col-xs-12 col-form-label">Employee Name</label>
              <div class="col-md-7 col-sm-12 col-xs-12">
                <input type='text' placeholder='Enter Employee Name' id='emp_name' readOnly onFocus={() => this.myfocus('emp_name')} value={this.state.emp_name} onChange={this.handleEmpName} />
              </div>
            </div>
            <div class="form-group row col-md-6">
              <label for="employeeDepartment" class="col-md-5 col-form-label">Employee Department</label>
              <div class="col-md-7">
                <select id='emp_depart' disabled value={this.state.emp_depart} onChange={this.handleEmpDepart} readOnly>
                  <option value="Select Department" selected>Select Department</option>
                  <option value="Development">Development</option>
                  <option value="Designing">Designing</option>
                  <option value="SEO">SEO</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="employeeDesignation" class="col-md-5 col-form-label">Designation</label>
              <div class="col-md-7" id='development_deis' style={{ display: 'none' }}>
                <select id="_designation" name='designation' disabled onFocus={() => this.myfocus('_designation')} value={this.state.emp_desig} onChange={this.handleEmpDesig} title='Select Designation' >
                  <option value='Select Designation' selected>Select Designation</option>
                  <option value='Web Development'>Web Development</option>
                  <option value='. Net Developer'>. Net Developer</option>
                  <option value='WordPress Developer'>WordPress Developer</option>
                  <option value='Android Developer'>Android Developer</option>
                </select>
              </div>
              <div class="col-md-7" id='marketing_deis' style={{ display: 'none' }}>
                <select class="form-control" id="_designation" disabled name='designation' onFocus={() => this.myfocus('_designation')} value={this.state.emp_desig} onChange={this.handleEmpDesig} title='Select Designation' >
                  <option value='Select Designation' selected>Select Designation</option>
                  <option value='Content Marketing Manager'>Content Marketing Manager</option>
                  <option value='Digital Marketing Manager'>Digital Marketing Manager</option>
                </select>
              </div>
              <div class="col-md-7" id='seo_deis' style={{ display: 'none' }}>
                <select class="form-control" id="_designation" disabled name='designation' onFocus={() => this.myfocus('_designation')} value={this.state.emp_desig} onChange={this.handleEmpDesig} title='Select Designation' >
                  <option value='Select Designation' selected>Select Designation</option>
                  <option value='SEO Analyst'>SEO Analyst</option>
                  <option value='SEO Consultant'>SEO Consultant</option>
                  <option value='SEO Project Manager'>SEO Project Manager</option>
                </select>
              </div>
              <div class="col-md-7" id='designing_deis' style={{ display: 'none' }}>
                <select class="form-control" id="_designation" disabled name='designation' onFocus={() => this.myfocus('_designation')} value={this.state.emp_desig} onChange={this.handleEmpDesig} title='Select Designation' >
                  <option value='Select Designation' selected>Select Designation</option>
                  <option value='Web Designer'>Web Designer</option>
                  <option value='Graphic Designer'>Graphic Designer</option>
                  <option value='UI/UX Designer'>UI/UX Designer</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="salrymonth" class="col-md-5 col-form-label">Salary Month</label>
              <div class="col-md-7">
                <label id='date'>{this.state.sal_mon}</label>
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="phone" class="col-md-5 col-form-label">Phone</label>
              <div class="col-md-7 col-xs-12 col-sm-12">
                <input type='text' placeholder='Enter Phone No' id='emp_phone' readOnly onFocus={() => this.myfocus('emp_phone')} value={this.state.emp_phone} onChange={this.handleEmpPhone} />
              </div>
            </div>
          </div>
          <hr /><br />
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="cpmments" class="col-md-5 col-form-label">Comments</label>
              <div class="col-md-7">
                <textarea id='comments' placeholder='Comments' onFocus={() => this.myfocus('comments')} value={this.state.comments} onChange={this.handleEmpComments}></textarea>
              </div>
            </div>
          </div>
          <div className='row table-heading-style ml-1'>
            <div className='col-sm-12 col-md-12 col-lg-12  text-white mt-1'>
              <h2>Salary Detail</h2>
            </div>
          </div><br />
          <div className='form-row ml-1'>
            <div className='form-group col-md-3 text-center'>
              <label for="Particulars" id="particularlbl">Particulars</label>
              <select id='particluars' value={this.state.particluar} onChange={this.handleEmpParticular}>
                <option value="Particular" selected>Particular</option>
                <option value='Per Project'>Per Project</option>
                <option value='Monthly'>Monthly</option>
              </select>
            </div>
            <div className='form-group col-md-3 text-center'>
              <label for="advance" id="advancelbl">Advance</label>
              <input type='text' placeholder='Enter Advance'maxlength="7" id='_advance' onFocus={() => this.myfocus('_advance')} value={this.state.advance} onChange={this.handleEmpAdvance} />
            </div>
            <div className='form-group col-md-3 text-center'>
              <label for="amount" id="amountlbl">Amount</label>
              <input type='text' placeholder='Enter Amount' maxlength="7" id='_amount' onFocus={() => this.myfocus('_amount')} value={this.state.amount} onChange={this.handleEmpAmount} />
            </div>
            <div className='form-group col-md-3 text-center'>
              <label for="tax" id="taxlbl">Tax (%)</label>
              <input type='text' placeholder='Enter Tax in %' maxlength="2" id='_tax' onFocus={() => this.myfocus('_tax')} value={this.state.tax} onChange={this.handleTax} />
            </div>
          </div>
          <div className='row table-heading-style ml-1 text-white'>
            <div className='col-sm-12 col-md-12 col-lg-12   mt-1'>
              <div className='row'>
                <div className='col-sm-2'>
                  <h2>SubTotals</h2>
                </div>
                <div className='col-sm-10 text-right'>
                  <span className='text-right text-white' id='sub_totals'>
                    {this.state.netsalary}
                  </span>
                </div>
              </div>

            </div>
          </div><br />
          <div className='row table-heading-style ml-1'>
            <div className='col-sm-12 col-md-12 col-lg-12  text-white mt-1'>
              <div className='row'>
                <div className='col-sm-2'>
                  <h2>Net Salary</h2>
                </div>
                <div className='col-sm-10 text-right'>
                  <span className='text-right text-white' id='sub_totals'>
                    {this.state.netsalary}
                  </span>
                </div>

              </div>
            </div>
          </div><br />
          <div className='row mt-5'><br />
            <div className='col-sm-4 offset-sm-2'>
              <h3 className='signature'>Employer's Signature:</h3>
            </div>
            <div className='col-sm-4 offset-sm-2'>
              <h3 className='signature'>Employee's Signature:</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-2 offset-sm-5'>
              <input type="submit" class="btn btn-primary" className='submitbtn' onClick={this.handleSubmit} value='Print' id='_print' name='print' title='Print' />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default GenerateSlips;