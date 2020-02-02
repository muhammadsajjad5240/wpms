// import moduel from component
import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { Delete } from "@material-ui/icons";
import AddBill from './add_bill';
import './bills.css';
// below we create and export compnent class
export default class Bills extends Component{
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to handle data
        this.state = {
            bills: [],
        };
    }
    // below we create method that will calll when the component will laod
    componentDidMount() {
        // below we send request to the server to get bills
        axios.post('/Bills/getBills')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ bills: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete recrod
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete the record
        axios.post('/Salary/deleteSlip/',{
          id: pramerter
        })
        .then((res) =>{
            // below we redirect to new url
          window.location.replace('/dashboard/bills');
        })
        // below we console the error in case of error
        .catch((err)=>{
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
    render(){
        // belwo we create columns for datatable
        const columns = ["Bill ID", "Item Name", "Purchase From", "Amount", "Paid By", "Edit", "Delete"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRows: 'single',
            selectableRowsOnClick: false,

        };
        return(
            <div id="_bills">
                <br />
                <div className='row'>
                    <div className='col-sm-9'></div>
                    <dv className='col-sm-2'>
                        <button type='button' className='btn add_employee ml-5' data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}><i class="fas fa-plus mr-2"></i>Add Bills</button>
                    </dv>
                </div>
                <br />
                 <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{position:'sticky'}}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Bills"}
                                data={this.state.bills.map(record => {
                                    return [
                                        record.billId,
                                        record.itemName.substr(0, 20),
                                        record.purchaseFrom.substr(0, 20),
                                        record.amount,
                                        record.paidBy,
                                        <Link to={'/dashboard/update-bill?id=' + record.billId}><IconButton >
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
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header" style={{backgroundColor:'rgb(244, 59, 72)'}}>
                                <h1 class="modal-title text-center text-white" id="exampleModalLongTitle">Add Bill</h1>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AddBill />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}