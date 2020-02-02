// below we import modules for component
import React, { Component } from 'react';
import './client_slip.css';
import logo from '../../../../assets/images/wpms_images/logo.png';
import jsPDF from 'jspdf';
var converter = require('number-to-words');
let axios = require('axios');
let obj, projectId,totalAmount;
const qurryString = require("query-string");
// below we create component class
class ClientSlip extends Component {
  // below we create constructor to create class
  constructor(props) {
    super(props);
    // below we create state to save data
    this.state = {
      project: [],
      slip_id: '',
      proj_name: '',
      client_name: '',
      proj_desc: '',
      proj_strt_date: '',
      proj_end_date: '',
      proj_amount: '',
      paid: '',
      paymentType: '',
      type: '',
      technology: '',
      fireRedirect: false,
      month: ''
    }
  }
  // below we create method to handle project Name
  handleProjectName = (e) => {
    this.setState({ proj_name: e.target.value });
  }
  handlePaymentType = (e) => {
    this.setState({ paymentType: e.target.value });
    let paymentType = document.getElementById('amount_type').value;
    let projectAmount = document.getElementById('proj_amount').value;
    if (paymentType === "Payment Type") {
      document.getElementById('amount_type').style.border = '1px solid red';
      document.getElementById('paid_amount').value = "";
    }
    else {
      document.getElementById('amount_type').style.border = '1px solid grey';
    }
    if (paymentType === "Installment") {
      // document.getElementById('paid_amount').value = projectAmount / 2;
      let padiAmount = projectAmount / 2;
      this.setState({ paid: padiAmount });
    }
    else if (paymentType === "Full") {
      // document.getElementById('paid_amount').value = projectAmount;
      this.setState({ paid: projectAmount });
    }
  }
  handlePayment = (e) => {
    this.setState({ paid: e.target.value });
    let namePattern = /^[0-9]+$/;
    let paidAmount = document.getElementById('paid_amount').value;
    if (!namePattern.test(paidAmount) || paidAmount === "") {
      document.getElementById('paid_amount').style.border = '1px solid red';
    }
    else {
      document.getElementById('paid_amount').style.border = '1px solid grey';
    }
  }
  // below we create method which will call when the component will load
  componentDidMount = () => {
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();
    let date = m + "/" + d + "/" + y;
    this.setState({ month: date })
    let length = 5;
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.setState({ slip_id: text })
    let pramerter = qurryString.parse(window.location.search)
    projectId = pramerter.id;
    axios.post("/Client/getSlipProject", {
      id: pramerter.id
    })
      .then(res => {
        this.setState({ project: res.data })
        for (let i in this.state.project) {
          obj = this.state.project[i];
        };
        this.setState({ proj_name: obj[0].projectName })
        this.setState({ client_name: obj[0].clientName })
        this.setState({ proj_desc: obj[0].projectDesc })
        this.setState({ proj_strt_date: obj[0].projectStrtDate })
        this.setState({ proj_end_date: obj[0].projectDeadline })
        this.setState({ proj_amount: obj[0].projectAmount })
        this.setState({ type: obj[0].projectType })
        this.setState({ technology: obj[0].technology })
        totalAmount = obj[0].paid;
        if (obj[0].paid == obj[0].projectAmount) {
          this.setState({ paymentType: "Full" });
          this.setState({ paid: obj[0].paid });
          document.getElementById('amount_type').disabled = true
        }
        if(obj[0].paymentType === "Installment"){
          this.setState({ paymentType: "Installment" });
          document.getElementById('amount_type').disabled = true
        }
        if(obj[0].paymentType === "Full"){
          this.setState({ paymentType: "Full" });
          document.getElementById('amount_type').disabled = true
        }
        if(obj[0].projectAmount > 0){
          this.setState({ paid: obj[0].paid });
        }
      })
      .catch(error => { console.log(error) });
  }
  // below is method will will call when the form will submit
  handleSubmit = (e) => {
    e.preventDefault();
    let projectName = document.getElementById('proj_name').value;
    let ClientName = document.getElementById('client_name').value;
    let projectDescription = document.getElementById('proj_description').value;
    let projectStrDate = document.getElementById('strt_date').value;
    let projectendDate = document.getElementById('end_date').value;
    let projectAmount = document.getElementById('proj_amount').value;
    let projecttype = document.getElementById('proj_type').value;
    let projectTechnology = document.getElementById('proj_technology').value;
    let paymentType = document.getElementById('amount_type').value;
    let paidAmount = document.getElementById('paid_amount').value;
    let paymentPattern = /^[0-9]+$/;
    let namePattern = /^[a-zA-Z0-9 ]+$/;
    if (!namePattern.test(projectName) || projectName === "") {
      document.getElementById('proj_name').style.border = '1px solid red';
    }
    else if (!namePattern.test(ClientName) || ClientName === "") {
      document.getElementById('client_name').style.border = '1px solid red';
    }
    else if (projectDescription === "") {
      document.getElementById('proj_description').style.border = '1px solid red';
    }
    else if (projectStrDate === "") {
      document.getElementById('strt_date').style.border = '1px solid red';
    }
    else if (projectendDate === "") {
      document.getElementById('end_date').style.border = '1px solid red';
    }
    else if (projectAmount === '') {
      document.getElementById('proj_amount').style.border = '1px solid red';
    }
    else if (projecttype === "") {
      document.getElementById('proj_type').style.border = '1px solid red';
    }
    else if (projectTechnology === "") {
      document.getElementById('proj_technology').style.border = '1px solid red';
    }
    else if (paymentType === "Payment Type") {
      document.getElementById('amount_type').style.border = '1px solid red';
    }
    else if (!paymentPattern.test(paidAmount) || paidAmount === "") {
      document.getElementById('paid_amount').style.border = '1px solid red';
    }
    else {
      // below we create object that will send to the server when the request send to the server
      let newInvoice = {
        slip_id: this.state.slip_id,
        projectId:projectId,
        projectName: this.state.proj_name,
        clientName: this.state.client_name,
        project_description: this.state.proj_desc,
        project_start_date: this.state.proj_strt_date,
        project_end_date: this.state.proj_end_date,
        project_amount: this.state.proj_amount,
        paid: this.state.paid,
        paymentType: this.state.paymentType,
        project_type: this.state.type,
        project_technoloy: this.state.technology,
      }
      // below we send request to the server to store data
      axios.post('/Invoices/newInvoice', newInvoice)
        .then(res =>
          console.log(res.data)
        )
        let totalPayment = Number(totalAmount) + Number(this.state.paid);
      axios.post('/Projects/updateProjectAmount', {
        projectId: projectId,
        paid: totalPayment,
        paymentType: this.state.paymentType
      })
        .then(res =>
          console.log(res.data)
        )
      let salary_words = converter.toWords(this.state.paid); // => “thirteen”
      // this.setState({ salaryWords: salary_words });
      // below we set state empty 
      // Below is start of create and view the pdf which create and view . This can also be download.
      var doc = new jsPDF('p', 'pt');
      // start of main heading 
      doc.setFontSize(20)
      doc.setTextColor('#000000')
      doc.text(90, 60, 'PAYSLIP FOR PROJECT ' + this.state.proj_name.substr(0, 20));
      // End of main heading 
      // start of Slip ID heading 
      doc.setFontSize(12)
      doc.setTextColor('#000')
      doc.text(480, 140, 'PAYSLIP # ' + this.state.slip_id)
      // End of Slip ID heading 
      doc.setFontSize(12)
      doc.setTextColor('#000000')
      doc.text(480, 180, 'Month: ' + this.state.month)
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
      doc.text(20, 220, 'Client Name :')
      doc.setFontType("normal")
      doc.text(120, 220, this.state.client_name)
      // start of totla Earnings
      doc.setFontSize(12)
      doc.setFontType("bold")
      doc.setTextColor('#000')
      doc.text(20, 260, 'Project Desription')
      // End of Basic Salary
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal")
      doc.text(20, 280, this.state.proj_desc);
      doc.setFontType("bold");
      doc.setFontSize(12)
      doc.setTextColor('#000')
      doc.text(20, 320, 'Project Details')
      // End of basic salary
      // starto of Home Allowance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(20, 360, 'Project Name')
      doc.setFontSize(10)
      doc.setFontType("normal");
      doc.setTextColor('#000')
      doc.text(450, 360, this.state.proj_name.substr(0, 20))
      // End of Home Allowance
      // Start of conyance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 400, 'Project Deadline')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 400, this.state.proj_end_date)
      // End of conyance
      // start of other allowance
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 440, 'Project Amount')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 440, String(this.state.proj_amount))
      // End of other allowance
      // start of Total Earnings
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 480, 'Project Type')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 480, this.state.type)
      // End of Total Earnings
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 520, 'Project Technology')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 520, this.state.technology)
      
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 560, 'Payment Type')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 560, this.state.paymentType)
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 600, 'Payment Paid')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 600, String(this.state.paid))
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 640, 'Payment Remaining')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(450, 640, String(this.state.proj_amount - this.state.paid))
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("bold");
      doc.text(20, 700, 'Total Amount')
      doc.setFontType("normal");
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.text(100, 700, String(this.state.paid)+' ('+salary_words+')')
      // start of employeer signature
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal")
      doc.text(100, 760, 'Employer Signature')
      // End of employeer signature
      // start of employeer signature
      doc.setFontSize(10)
      doc.setTextColor('#000')
      doc.setFontType("normal");
      doc.text(360, 760, 'CEO Signature')
      // End of employeer signature
      // Save the Data
      // doc.save('Generated'.pdf);
      // window.open(doc.output('Generated'.pdf));
      // doc.autoPrint();
      // Below we create function which will print pdf in new browser window which is called blob.
      window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=2480 ,height=1400");
      window.location.replace('/dashboard/invoices');
      this.setState({
        slip_id: '',
        proj_name: '',
        client_name: '',
        proj_desc: '',
        proj_strt_date: '',
        proj_end_date: '',
        proj_amount: '',
        type: '',
        technology: ''
      })
      // below we replace the location
    }
  }
  // below we create fucntion which will call when the use will focus on input field
  myfocus = (a) => {
    document.getElementById(a).style.border = "1px solid grey";
  }
  // below is our main render method
  render() {
    return (
      <div id='client_slip'>
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
              <h2>Project Details</h2>
            </div>
          </div>
          <br />
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="projectName" class="col-md-5 col-sm-12 col-xs-12 col-form-label">Project Name</label>
              <div class="col-md-7 col-sm-12 col-xs-12">
                <input type='text' placeholder='Enter Project Name' id='proj_name' onFocus={() => this.myfocus('proj_name')} value={this.state.proj_name} onChange={this.handleProjectName} />
              </div>
            </div>
            <div class="form-group row col-md-6">
              <label for="clientName" class="col-md-5 col-form-label">Client Name</label>
              <div class="col-md-7 col-sm-12 col-xs-12">
                <input type='text' placeholder='Enter Client Name' id='client_name' onFocus={() => this.myfocus('client_name')} value={this.state.client_name} />
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-12">
              <label for="projDescription" class="col-md-3 col-form-label">Project Description</label>
              <div class="col-md-9 col-sm-12 col-xs-12">
                <textarea id='proj_description' placeholder='Project Description' onFocus={() => this.myfocus('proj_description')} style={{ width: "102%", marginLeft: "-6%" }} value={this.state.proj_desc}></textarea>
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="strtDate" class="col-md-5 col-form-label">Project Start Date</label>
              <div class="col-md-7 col-sm-12 col-xs-12">
                <input type="date" class="form-control" id="strt_date" name='StrtDate' onFocus={() => this.myfocus('strt_date')} value={this.state.proj_strt_date} />
              </div>
            </div>
            <div class="form-group row col-md-6">
              <label for="endDate" class="col-md-5 col-form-label">Project End Date</label>
              <div class="col-md-7 col-sm-12 col-xs-12">
                <input type="date" class="form-control" id="end_date" name='endDate' onFocus={() => this.myfocus('end_date')} value={this.state.proj_end_date} />
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="type" class="col-md-5 col-form-label">Project Type</label>
              <div class="col-md-7 col-xs-12 col-sm-12">
                <input type='text' placeholder='Enter Project Type' id='proj_type' onFocus={() => this.myfocus('proj_type')} value={this.state.type} />
              </div>
            </div>
            <div class="form-group row col-md-6">
              <label for="technology" class="col-md-5 col-form-label">Project Technology</label>
              <div class="col-md-7 col-xs-12 col-sm-12">
                <input type='text' placeholder='Enter Project Technology' id='proj_technology' onFocus={() => this.myfocus('proj_technology')} value={this.state.technology} />
              </div>
            </div>
          </div>
          <div className='form-row ml-1'>
            <div class="form-group row col-md-6">
              <label for="amount" class="col-md-5 col-form-label">Project Amount</label>
              <div class="col-md-7 col-xs-12 col-sm-12">
                <input type='text' placeholder='Enter Project Amount' id='proj_amount' onFocus={() => this.myfocus('proj_amount')} value={this.state.proj_amount} />
              </div>
            </div>
            <div class="form-group row col-md-6">
              <label for="amount" class="col-md-5 col-form-label">Payment Type</label>
              <div class="col-md-7 col-xs-12 col-sm-12">
                <select id="inputState" class="form-control" id='amount_type' onFocus={() => this.myfocus('amount_type')} value={this.state.paymentType} onChange={this.handlePaymentType}>
                  <option>Payment Type</option>
                  <option value="Installment">Installment</option>
                  <option value="Full">Full</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-row ml-1 mt-1'>
            <div class="form-group row col-md-6">
              <label for="amount" class="col-md-5 col-form-label">Amount</label>
              <div class="col-md-7 col-xs-12 col-sm-12">
                <input type='text' placeholder='Enter Paid Amount' id='paid_amount' readOnly onFocus={() => this.myfocus('paid_amount')} value={this.state.paid} onChange={this.handlePayment} />
              </div>
            </div>
          </div>
          <div className="row ml-1">
            <div className="col-sm-8">
              <p style={{ fontSize: '12px', fontWeight: '700', color: 'red' }}>We Provide only two installments if in case of Installment Select</p>
            </div>
          </div>
          <hr /><br />
          <div className='row mt-5'><br />
            <div className='col-sm-4 offset-sm-2'>
              <h3 className='signature'>Client Signature:</h3>
            </div>
            <div className='col-sm-4 offset-sm-2'>
              <h3 className='signature'>Employee Signature:</h3>
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
export default ClientSlip;