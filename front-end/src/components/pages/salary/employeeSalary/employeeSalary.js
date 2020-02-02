// below we import modules for componentn
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
let axios = require('axios');
// below we create css for generate slip button
const generateSlipBtn = {
    backgroundColor: '#f43b48',
     color: 'white',
      fontWeight: 700
}
// below we create and export component class
export default class EmployeeSalary extends Component {
    // below we create contstructor
    constructor(props) {
        super(props)
        // below we create state to save component state
        this.state = {
            employees: [],
            searchEmployees: [],
            search_emp_id: '',
            search_emp_name: '',
            search_emp_designation: ''
        };
    }
    // below we create method to handle employee id
    handleEmpId = (e) => {
        this.setState({ search_emp_id: e.target.value });
    }
    // below we create method to handle employee name
    handleEmpName = (e) => {
        this.setState({ search_emp_name: e.target.value });
    }
    // below we create method to handle employee designation
    handleEmpDesignation = (e) => {
        this.setState({ search_emp_designation: e.target.value });
    }
    // below we create method that will run when the component load
    componentDidMount() {
        // below we send request to the server to get employees
        axios.post('/Employee/getEmployees')
            .then(res => {
                // below we set state with that data which is comming from the server
                this.setState({ employees: res.data });
            })
            // below we handle error in case of error occur
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method for the styling of MUI datatables which is default by MUI datatable
    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MUIDataTable: {
                    responsiveScroll: { maxWidth: "100%" },
                    root: {
                        backgroundColor: 'red',
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
        // below we create columns for table
        const columns = ["Name", "Id", "Email", "Join Date", "Role", "Pay Slip"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRows: 'single',
            selectableRowsOnClick: false,
        };
        return (
            <div id='all_employes'>
                <br />
                {/* below is our main Datatable where we map the state to display data in table */}
                <MuiThemeProvider theme={this.getMuiTheme()}  style={{position:'sticky'}}>
                    <MUIDataTable
                        title={"Generate Employee Salary Slip"}
                        data={this.state.employees.map(record => {
                            return [
                                record.fullName,
                                record.empId,
                                record.email,
                                record.joiningDate,
                                record.designation,
                                <Link to={'/dashboard/generate-slip?id=' + record.empId}>
                                    <button type='button' style={generateSlipBtn} className='btn generate_slip_btn' >Generate<br />Slip</button>
                                </Link>
                            ]
                        })}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}