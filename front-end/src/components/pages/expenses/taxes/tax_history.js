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
class TaxHistory extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to handle data
        this.state = {
        taxHistory: [],
        };
    }
    // below we create method that will call when the component will laod
    componentDidMount() {
        // below we send request to the server to get Tax history
        axios.post('/Taxes/getTaxeHistory')
            .then(res => {
                // below we set state with data commming from server
                this.setState({ taxHistory: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete the record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete the tax history
        axios.post('/Taxes/deleteTaxHistory',{
          id: pramerter
        })
        .then((res) =>{
            // below we redirect to new url
          window.location.replace('/dashboard/tax-history');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // below we create method to update the record
    updateRecord = (taxId, taxName, taxPercentage, taxDate,taxAmount) => {
        let pramerter = taxId;
        // below we send request to the server to update tax history
        axios.post('/Taxes/updateTaxHistory/', {
            taxId: taxId,
            taxName: taxName,
            taxPercentage: taxPercentage,
            taxDate: taxDate,
            taxAmount: taxAmount
        })
            .then((res) => {
                window.location.replace('/dashboard/tax-history');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // below we create method for the style of datatables
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
        // below we create columns for datatable
        const columns = ["ID", "Tax Name", "Tax Percentage","Tax Date","Tax Amount", "Revert", "Delete"];
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
                                title={"Tax History"}
                                data={this.state.taxHistory.map(record => {
                                    return [
                                        record.taxId,
                                        record.taxName.substr(0, 20),
                                        record.taxPercentage.substr(0, 20),
                                        record.taxDate,
                                        record.taxAmount.substr(0, 7),
                                        // <Link to={'/dashboard/update-slip?id=' + record.clientId}>
                                            <IconButton >
                                            <RestoreIcon title="Revert" onClick={() => this.updateRecord(record.taxId, record.taxName, record.taxPercentage, record.taxDate,
                                                record.taxAmount)}/>
                                        </IconButton>,
                                        // </Link>,
                                        <IconButton onClick={() => this.deleteRecord(record.taxId)}>
                                            <Delete />
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
// below we export component
export default TaxHistory;