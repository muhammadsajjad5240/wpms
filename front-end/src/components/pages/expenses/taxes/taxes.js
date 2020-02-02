// below we import modules for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { Delete } from "@material-ui/icons";
import AddTax from './add_taxes';
import './taxes.css';
// below we create and export component class
export default class Taxes extends Component {
    //  below we create constructor
    constructor(props) {
        super(props)
        // below we create state to handle data
        this.state = {
            taxes: [],
        };
    }
    // belwo we create method that will call when the component will load
    componentDidMount() {
        // blow we send requst to get taxes from database
        axios.post('/Taxes/gettaxes')
            .then(res => {
                // below we set state with data comming from database
                this.setState({ taxes: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to delete recrod
        axios.post('/Taxes/deleteTax/', {
            id: pramerter
        })
            .then((res) => {
                // below we redirect to new url
                window.location.replace('/dashboard/taxes');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // below we create method to style the datatable which is default
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
        // below we create column for datatables
        const columns = ["Tax Id", "Tax Name", "Tax Percentage", "Tax Amount", "Edit", "Delete"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRows: 'single',
            selectableRowsOnClick: false,

        };
        return (
            <div id="_taxes">
                <br />
                <div className='row'>
                    <div className='col-sm-9'></div>
                    <dv className='col-sm-2'>
                        <button type='button' className='btn add_employee ml-5' data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}><i class="fas fa-plus mr-2"></i>Add Tax</button>
                    </dv>
                </div>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{position:'sticky'}}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Taxes"}
                                data={this.state.taxes.map(record => {
                                    return [
                                        record.taxId,
                                        record.taxName.substr(0, 20),
                                        record.taxPercentage,
                                        record.taxAmount,
                                        <Link to={'/dashboard/update-tax?id=' + record.taxId}><IconButton >
                                            <EditIcon />
                                        </IconButton></Link>,
                                        <IconButton >
                                            <Delete onClick={() => this.deleteRecord(record.taxId)} />
                                        </IconButton>
                                    ]
                                })}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider> <br /> <br />
                    </div>
                </div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header" style={{ backgroundColor: 'rgb(244, 59, 72)' }}>
                                <h1 class="modal-title text-center text-white" id="exampleModalLongTitle">Add Tax</h1>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AddTax />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
