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
class BillHistory extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to handle data
        this.state = {
        billHistory: [],
        };
    }
    // below we create method that will call when the component will load
    componentDidMount() {
        // below we send request to the server to get bill history
        axios.post('/Bills/getBillHistory')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ billHistory: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete the record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete the bill
        axios.post('/Bills/deleteBillHistory',{
          id: pramerter
        })
        .then((res) =>{
            // below we redirect to new url
          window.location.replace('/dashboard/bill-history');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // below we create method to update the record
    updateRecord = (billId, itemName, purchaseFrom, purchaseDate,purchaseBy, amount, paidBy) => {
        let pramerter = billId;
        // below we send request to server to update bill
        axios.post('/Bills/updateBillFromHistory/', {
            billId: billId,
            itemName: itemName,
            purchaseFrom: purchaseFrom,
            purchaseDate: purchaseDate,
            purchaseBy: purchaseBy,
            amount: amount,
            paidBy: paidBy
        })
            .then((res) => {
                window.location.replace('/dashboard/bill-history');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // below we create method to style the data table which is default
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
        // below we create column for datatabels
        const columns = ["ID", "Item Name", "Purchase From","Purchase Date","Purchase By", "Amount","Paid By", "Revert", "Delete"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRows: 'single',
            selectableRowsOnClick: true,

        };
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{position:'sticky'}}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Bill History"}
                                data={this.state.billHistory.map(record => {
                                    return [
                                        record.billId,
                                        record.itemName.substr(0, 20),
                                        record.purchaseFrom.substr(0, 20),
                                        record.purchaseDate,
                                        record.purchaseBy,
                                        record.amount,
                                        record.paidBy,
                                        // <Link to={'/dashboard/update-slip?id=' + record.clientId}>
                                            <IconButton >
                                            <RestoreIcon title="Revert" onClick={() => this.updateRecord(record.billId, record.itemName, record.purchaseFrom, record.purchaseDate,
                                                record.purchaseBy, record.amount, record.paidBy)}/>
                                        </IconButton>,
                                        // </Link>,
                                        <IconButton onClick={() => this.deleteRecord(record.billId)}>
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
// below we export the componetn
export default BillHistory;