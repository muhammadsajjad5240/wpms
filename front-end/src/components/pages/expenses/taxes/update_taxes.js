// below we import some modules for component
import React, { Component } from 'react';
import $ from 'jquery';
import jsPDF from 'jspdf';
var converter = require('number-to-words');
let axios = require('axios');
let obj, taxHistory;
const qurryString = require("query-string");
// below we create some css
const lableStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '700'
};
const inputStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ced4da'
};
// beow we create compoennt class
class UpdateTaxes extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we bind all the function
        this.handleTaxName = this.handleTaxName.bind(this);
        this.handlepercentage = this.handlepercentage.bind(this);
        this.handleTaxDate = this.handleTaxDate.bind(this);
        this.handleTaxAmount = this.handleTaxAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // below we create state to store data
        this.state = {
            tax: [],
            projects: [],
            tax_id: '',
            tax_name: '',
            tax_percentage: '',
            tax_date: '',
            tax_amount: '',
            month: ''
        }
    }
    // below we create method to check validaito and hande Tax Name
    handleTaxName = (e) => {
        this.setState({ tax_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let tax_name = document.getElementById('tax_name').value;
        if (!letters.test(tax_name)) {
            document.getElementById('tax_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('tax_name').style.border = '1px solid grey';
        }
    }
    // below we create method to check validaito and hande Tax Percentage
    handlepercentage = (e) => {
        this.setState({ tax_percentage: e.target.value });
        let letters = /^[0-9]+$/;
        let tax_percentage = document.getElementById('tax_percentage').value;
        if (!letters.test(tax_percentage)) {
            document.getElementById('tax_percentage').style.border = '1px solid red';
        }
        else {
            document.getElementById('tax_percentage').style.border = '1px solid grey';
        }
    }
    // below we create method to check validaito and hande Tax Date
    handleTaxDate = (e) => {
        this.setState({ tax_date: e.target.value });
        let tax_date = document.getElementById('tax_date').value;
        if (tax_date === "") {
            document.getElementById('tax_date').style.border = '1px solid red';
        }
        else {
            document.getElementById('tax_date').style.border = '1px solid grey';
        }
    }
    // below we create method to check validaito and hande Tax Amount
    handleTaxAmount = (e) => {
        this.setState({ tax_amount: e.target.value });
        let letters = /^[0-9]+$/;
        let tax_amount = document.getElementById('tax_amount').value;
        if (!letters.test(tax_amount)) {
            document.getElementById('tax_amount').style.border = '1px solid red';
        }
        else {
            document.getElementById('tax_amount').style.border = '1px solid grey';
        }
    }
    // below we create method that will run when the component will load
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
        // below we send request to the server that will get the specufic slip from database
        axios.post("/Taxes/getSpecificTax", {
            id: pramerter.id
        })
            .then(res => {
                // below we set state which data is comming from server
                this.setState({ tax: res.data })
                for (let i in this.state.tax) {
                    obj = this.state.tax[i];
                };
                this.setState({ tax_name: obj.taxName })
                this.setState({ tax_id: obj.taxId })
                this.setState({ tax_percentage: obj.taxPercentage })
                this.setState({ tax_date: obj.taxDate })
                this.setState({ tax_amount: obj.taxAmount })
                // below we create object in which previouse history will save
                taxHistory = {
                    taxId: obj.taxId,
                    taxName: obj.taxName,
                    taxPercentage: obj.taxPercentage,
                    taxDate: obj.taxDate,
                    taxAmount: obj.taxAmount
                }
            })
            // below we console the error in case of error
            .catch(error => { console.log(error) });
    }
    // below we create method to check valdation and submit data to database
    handleSubmit = (e) => {
        // below we prevent form to reload
        e.preventDefault();
        // below we send request to the server to get the employee names
        axios.post('/Employee/getEmployeeNames')
            .then(res => {
                // below we set the state with data which is comming from the server
                this.setState({ purchased_by_names: res.data });
            });
        let tax_name = document.getElementById('tax_name').value;
        let tax_percentage = document.getElementById('tax_percentage').value;
        let tax_date = new Date(document.getElementById('tax_date').value);
        let tax_amount = document.getElementById('tax_amount').value;
        let taxNamePattern = /^[a-zA-Z ]+$/;
        let letters = /^[0-9]+$/;
        let n = new Date();
        if (!taxNamePattern.test(tax_name)) {
            document.getElementById('tax_name').style.border = '1px solid red';
            document.getElementById('taxNamelable').innerText = 'Tax Name *';
            document.getElementById('taxNamelable').style.color = 'red'
        }
        else if (!letters.test(tax_percentage)) {
            document.getElementById('tax_percentage').style.border = '1px solid red';
            document.getElementById('percentageFrom').innerText += 'tax Percentage *'
            document.getElementById('percentageFrom').style.color = 'red';
        }
        else if (tax_date === "") {
            document.getElementById('tax_date').style.border = '1px solid red';
            document.getElementById('taxDate').innerText = 'Purchase Date *'
            document.getElementById('taxDate').style.color = 'red';
        }
        else if (tax_amount === "") {
            document.getElementById('tax_amount').style.border = '1px solid red';
            document.getElementById('amountlbl').innerText += 'Amount *'
            document.getElementById('amountlbl').style.color = 'red';
        }

        else {
            // below we send request to update the record
            axios.post('/Taxes/updateTax', {
                taxId: this.state.tax_id,
                taxName: this.state.tax_name,
                taxPercentage: this.state.tax_percentage,
                taxDate: this.state.tax_date,
                taxAmount: this.state.tax_amount
            })
                .then(res => {
                    let a = res.statusText
                    if (a === "OK") {
                        // below we send request to the server to save tax history
                        axios.post('/Taxes/addTaxHistory', taxHistory)
                        document.getElementById('success_alert').style.display = 'block';
                        let salary_words = converter.toWords(Number(this.state.tax_amount)); // => “thirteen”
                        // this.setState({ salaryWords: salary_words });
                        // below we set state empty 
                        // Below is start of create and view the pdf which create and view . This can also be download.
                        var doc = new jsPDF('p', 'pt');
                        // start of main heading 
                        doc.setFontSize(20)
                        doc.setTextColor('#000000')
                        doc.text(200, 60, 'PAYSLIP FOR ' + this.state.tax_name + ' Tax');
                        // End of main heading 
                        // start of Slip ID heading 
                        doc.setFontSize(12)
                        doc.setTextColor('#000')
                        doc.text(480, 140, 'PAYSLIP # ' + this.state.tax_id)
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
                        doc.setFontType("bold");
                        doc.setFontSize(12)
                        doc.setTextColor('#000')
                        doc.text(20, 220, 'Tax Details')
                        // End of basic salary
                        // starto of Home Allowance
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.text(20, 260, 'Tax Name')
                        doc.setFontSize(10)
                        doc.setFontType("normal");
                        doc.setTextColor('#000')
                        doc.text(500, 260, this.state.tax_name)
                        // End of Home Allowance
                        // Start of conyance
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.setFontType("bold");
                        doc.text(20, 300, 'Tax Percentage')
                        doc.setFontType("normal");
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.text(500, 300, String(this.state.tax_percentage))
                        // End of conyance
                        // start of other allowance
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.setFontType("bold");
                        doc.text(20, 340, 'Tax Date')
                        doc.setFontType("normal");
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.text(500, 340, this.state.tax_date)
                        // End of other allowance
                        // start of Total Earnings
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.setFontType("bold");
                        doc.text(20, 380, 'Tax Amount')
                        doc.setFontType("normal");
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.text(500, 380, this.state.tax_amount)
                        // End of Total Earnings

                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.setFontType("bold");
                        doc.text(20, 440, 'Total Amount')
                        doc.setFontType("normal");
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.text(110, 440, '(' + String(salary_words) + ')')

                        // start of employeer signature
                        doc.setFontSize(10)
                        doc.setTextColor('#000')
                        doc.setFontType("normal");
                        doc.text(280, 500, 'CEO Signature')
                        // End of employeer signature
                        // Save the Data
                        // doc.save('Generated'.pdf);
                        // window.open(doc.output('Generated'.pdf));
                        // doc.autoPrint();
                        // Below we create function which will print pdf in new browser window which is called blob.
                        window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=2480 ,height=1400");
                        window.location.replace('/dashboard/taxes');
                    }
                }
                )
        }
    }
    // below we create methid that will run when the user focus on input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid grey";
    }
    // below is our main render method
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h1 className="mr-1 mt-2" style={{ fontSize: '20px', color: '#000', fontWeight: '600', textAlign: 'center' }}>Update Bill</h1>
                    </div>
                </div>
                <form id='add_emp_form'>
                    <div class="form-row">
                        <div className="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="taxName" style={lableStyle} id="taxNamelable">Tax Name</label>
                            <input type="text" class="form-control" maxLength='10' id="tax_name" style={inputStyle} name='taxName' onFocus={() => this.myfocus('tax_name')} value={this.state.tax_name} onChange={this.handleTaxName} placeholder="Tax Name" title='Tax Name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="percentage" style={lableStyle} id="percentageFrom">Tax ID</label>
                            <input type="text" class="form-control" id="tax_id" readOnly style={inputStyle} name='taxId' onFocus={() => this.myfocus('tax_id')} value={this.state.tax_id} placeholder="Tax Percentage" title='Tax ID' />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div className="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="percentage" style={lableStyle} id="percentageFrom">Tax Percentage</label>
                            <input type="text" class="form-control" id="tax_percentage" style={inputStyle} name='taxPercentage' onFocus={() => this.myfocus('tax_percentage')} value={this.state.tax_percentage} onChange={this.handlepercentage} placeholder="Tax Percentage" title='Tax Percentage' />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="taxDate" style={lableStyle} id="taxDate">Tax Date</label>
                            <input type="date" class="form-control" id="tax_date" style={inputStyle} name='taxdate' onFocus={() => this.myfocus('tax_date')} value={this.state.tax_date} onChange={this.handleTaxDate} placeholder="Tax Date" title='Tax Date' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                        <strong>Client Record Updated Successfully</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                        </button>
                    </div>
                    <div class="form-row mb-3">
                        <div className="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="padiBy" style={lableStyle} id="padiBylbl">Tax Amount</label>
                            <input type="text" class="form-control" id="tax_amount" style={inputStyle} name='taxamount' onFocus={() => this.myfocus('tax_amount')} value={this.state.tax_amount} onChange={this.handleTaxAmount} title="Tax Amount" />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-5'>
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Update Tax</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default UpdateTaxes;