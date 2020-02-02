// below we import modules for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { Delete } from "@material-ui/icons";
// below we create and export component class
export default class Invoices extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to store data in state
        this.state = {
            projects: [],
        };
    }
    // below we create method which will call when the componet will load
    componentDidMount() {
        // below we send request to the server to get the invoices from the database
        axios.post('/Invoices/getInvlices')
            .then(res => {
                // below we store the data from database in the state
                this.setState({ projects: res.data });
            })
            // below we console the error in case of error occur
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method that will delete the recod
    deleteRecord = (id) => {
        let pramerter = id;
        console.log(pramerter)
        // below we send the request to the server to delete the record
        axios.post('/Invoices/deleteInvoice/', {
            id: pramerter
        })
            .then((res) => {
                // below if the record delete successfully than we will  replace the location
                console.log('Record Deleted Successfully');
                window.location.replace('/dashboard/invoices');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // below is the function of style the MUI datatables which is defaul by library
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
    // below is the main render method
    render() {
        // below we create the table heading
        const columns = ["ID", "Project Name", "Client Name", "Total Amount", "Paid", "Payment Type", "Update", "Delete"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRowsOnClick: false,
            selectableRows: 'single',
        };
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12'  style={{position:'sticky'}}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Client Invoices"}
                                data={this.state.projects.map(record => {
                                    return [
                                        record.slip_id,
                                        record.projectName.substr(0, 20),
                                        record.clientName.substr(0, 15),
                                        record.project_amount.toString().substr(0, 6),
                                        record.paid,
                                        record.paymentType,
                                        <Link to={'/dashboard/update-invoice?id=' + record.slip_id}>
                                            <IconButton >
                                                <EditIcon />
                                            </IconButton>,
                                        </Link>,
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
