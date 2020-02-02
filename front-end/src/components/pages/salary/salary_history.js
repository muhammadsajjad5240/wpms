// below we import moduels for the component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from '@material-ui/icons/Restore';
import { Delete } from "@material-ui/icons";
// below we create component class
class SalaryHistory extends Component {
    // below we create constructor to create the state
    constructor(props) {
        super(props)
        // below we create state as a array to store the data comming from the server
        this.state = {
        salaryHistory: [],
        };
    }
    // below we create method which will call when the component will load
    componentDidMount() {
        // below we send request to the server to get slip history from the server
        axios.post('/Salary/getSlipHistory')
            .then(res => {
                // below we set salary History with data comming from the server
                this.setState({ salaryHistory: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method with parameter to delete record from the server
    deleteRecord = (id) => {
        let pramerter = id;
        console.log(pramerter)
        // below we send request to the server to delete the specif record from the database
        axios.post('/Salary/deleteSalryHistory/',{
          id: pramerter
        })
        .then((res) =>{
          console.log('Record Deleted Successfully');
        //   below we replace the locaiton if data delete successfully
          window.location.replace('/dashboard/salary-history');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // below we create method to update the record from history which will replace the record with preevious recod
    updateRecord = (emp_name, emp_depart, emp_designation, emp_phone,date, comments, particular,advance,amount,tax,netsalary,subtotals,slip_id) => {
        let pramerter = slip_id;
        console.log(pramerter)
        // below we send request to the server to revert the record
        axios.post('/Salary/updateSalaryFromHistory/', {
            slip_id: slip_id,
            emp_name: emp_name,
            emp_depart: emp_depart,
            emp_designation: emp_designation,
            emp_phone: emp_phone,
            date: date,
            comments: comments,
            particular: particular,
            advance: advance,
            amount: amount,
            tax: tax,
            netsalary: netsalary,
            subtotals: subtotals
        })
            .then((res) => {
                // below we replace the location
                window.location.replace('/dashboard/salary-history');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // below is method of styling of MUI datatables
    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MUIDataTable: {
                    responsiveScroll: { maxWidth: "100%" },
                    root: {
                        // backgroundColor: "#FF000",
                    },
                    paper: {
                        boxShadow: "none"
                    }
                },
                MUIDataTableBodyCell: {
                    root: {
                        fontSize: '0.9em',
                        fontWeight: '600'
                    }
                }
            }
        });
        // below is our main render method
    render() {
        // below we create table heading
        const columns = ["ID", "Employee Name", "Designation", "Phone","Particular", "Amount","Tax","Net Salary", "Revert", "Delete"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRows: 'single',
            selectableRowsOnClick: false,
        };
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{position:'sticky'}}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Salary History"}
                                data={this.state.salaryHistory.map(record => {
                                    return [
                                        record.slip_id,
                                        record.emp_name.substr(0, 20),
                                        record.emp_designation,
                                        record.emp_phone,
                                        record.particular,
                                        record.amount,
                                        record.tax,
                                        record.netsalary,
                                            <IconButton >
                                            <RestoreIcon title="Revert" onClick={() => this.updateRecord(record.emp_name, record.emp_depart, record.emp_designation, record.emp_phone,
                                                record.date, record.comments, record.particular,record.advance,record.amount,
                                                record.tax,record.netsalary,record.subtotals,record.slip_id)}/>
                                        </IconButton>,
                                        <IconButton >
                                            <Delete onClick={() => this.deleteRecord(record.slip_id)} />
                                        </IconButton>
                                    ]
                                })}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider> <br /> <br />
                    </div>
                </div>
            </div>
        );
    }
}
export default SalaryHistory;