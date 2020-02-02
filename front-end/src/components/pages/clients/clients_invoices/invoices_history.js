// below we import modules for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from '@material-ui/icons/Restore';
import { Delete } from "@material-ui/icons";
// below we create component class
class InvoiceHistory extends Component {
    // below we create constructo
    constructor(props) {
        super(props)
        // below we create state to save data
        this.state = {
            invoiceHistory: [],
        };
    }
    // below we create method that will call when the component will load
    componentDidMount() {
        // below  we send request to the server to get invoices history from database
        axios.post('/Invoices/getInvliceHistory')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ invoiceHistory: res.data });
            })
            // below we console the error in case of error occur
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete the record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete the record
        axios.post('/Invoices/deleteSlip/',{
          id: pramerter
        })
        .then((res) =>{
            // below we redirect to new url!
          window.location.replace('/dashboard/salary-report');
        })
        // below we console the error in case of error occur
        .catch((err)=>{
            console.log(err)
        })
    }
    // below is function for datatable style
    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MUIDataTable: {
                    responsiveScroll: { maxWidth: "100%" },
                    root: {
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
        // below we create columns for the datatables
        const columns = ["ID", "Name", "Email", "Phone", "Address", "Gender", "Revert", "Delete"];
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
                <div className='row'>
                    <div className='col-sm-12 col-lg-12'>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Invoice History"}
                                data={this.state.invoiceHistory.map(record => {
                                    return [
                                        record.clientId,
                                        record.fullName,
                                        record.email,
                                        record.phone,
                                        record.address,
                                        record.gender,
                                        <Link to={'/dashboard/update-slip?id=' + record.clientId}><IconButton >
                                            <RestoreIcon title="Revert" />
                                        </IconButton></Link>,
                                        <IconButton >
                                            <Delete />
                                            {/* onClick={() => this.deleteRecord(record.slip_id)} */}
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
export default InvoiceHistory;