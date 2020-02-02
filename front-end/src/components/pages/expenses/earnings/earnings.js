// below we import moduels for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
// below we create component class
export default class Earnings extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state
        this.state = {
            projects: [],
            ourEarnings: ''
        };
    }
    // below we create method that will call when component will loaf
    componentDidMount() {
        // below we send request to the server to get data
        axios.post('/Projects/getProjectAmount')
            .then(res => {
                // below we set state with data whih is comming from server
                this.setState({ projects: res.data });
            })
            // below we console the error in case of error occur
            .catch(function (error) {
                console.log(error);
            })
        // below we send request to get sum of Earnings
        axios.post('/Projects/sumEaraning', {})
            .then((res) => {
                // below we set state with data comming from server
                if (!res.data.length == 0) {
                    this.setState({ ourEarnings: res.data[0].total });
                }
            })
    }
    // below we creat method to delete the record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete specific record from the database
        axios.post('/Projects/deleteInvoice/', {
            id: pramerter
        })
            .then((res) => {
                // below we redirect to new url 
                window.location.replace('/dashboard/client-invoice');
            })
            // below we console error in case of error
            .catch((err) => {
                console.log(err)
            })
    }
    // below we create method for the style of MUI datatables which is default
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
        // below we create columns for datatables
        const columns = ["Project Name", "Amount", "Payment Type", "Paid",];
        const options = {
            filter: false,
            responsive: "stacked",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRowsOnClick: false,
        };
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{ position: 'sticky' }}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Our Earnings"}
                                data={this.state.projects.map(record => {
                                    return [
                                        record.projectName.substr(0, 20),
                                        record.projectAmount.toString().substr(0, 6),
                                        record.paymentType,
                                        record.paid,
                                    ]
                                })}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider> <br /> <br />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 offset-sm-4'>
                        <h4>Our Earnings: <span className='pl-3'><b>{this.state.ourEarnings}</b></span></h4>
                    </div>
                </div>
            </div>
        );
    }
}