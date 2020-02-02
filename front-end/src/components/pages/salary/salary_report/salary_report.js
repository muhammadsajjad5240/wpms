// below we import modules for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { Delete } from "@material-ui/icons";
// Below we create component class
class SalaryReport extends Component {
    // below we create constructor to create state
    constructor(props) {
        super(props)
        this.state = {
            // below we create state to store all salary slips data receive from server
            salaryReport: [],
        };
    }
    // below we create function which wil call when the component will load
    componentDidMount() {
        // below we send request to the server when the component load  a request to server goes to receive slips from 
        // database 
        axios.post('/Salary/getSlipReport')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ salaryReport: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // belowe we create fucntion deleteRecord which is use to delete record from server
    deleteRecord = (id) => {
        let pramerter = id;
        console.log(pramerter)
        // below we send request to the server to delete record from database
        axios.post('/Salary/deleteSlip/',{
          id: pramerter
        })
        .then((res) =>{
          console.log('Record Deleted Successfully');
        //   below we replace location after delete the record
          window.location.replace('/dashboard/salary-report');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // below is function to create theme for the MUI datatables which is defalut by React
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
        // below is out main render component
    render() {
        // below we create table heading for the data table
        const columns = ["ID", "Name", "Department", "Designation", "Salary", "Tax", "Advance", "Date", "Update", "Delete"];
        // below is some option for the style of datatable
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
                    <div className='col-sm-12 col-lg-12'  style={{position:'sticky'}}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Salary Report"}
                                data={this.state.salaryReport.map(record => {
                                    return [
                                        record.slip_id,
                                        record.emp_name,
                                        record.emp_depart,
                                        record.emp_designation,
                                        record.amount,
                                        record.tax,
                                        record.advance,
                                        record.date,
                                        <Link to={'/dashboard/update-slip?id=' + record.slip_id}><IconButton >
                                            <EditIcon />
                                        </IconButton></Link>,
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
export default SalaryReport;