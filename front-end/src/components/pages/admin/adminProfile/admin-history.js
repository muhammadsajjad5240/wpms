// below we import modules for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from '@material-ui/icons/Restore';
import { Delete } from "@material-ui/icons";
// below we create compoennt class
class AdminHistory extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to handle data
        this.state = {
            adminHistory: [],
        };
    }
    // below we create method that will call when the component will load
    componentDidMount() {
        // below we send request to the server to get employee history
        axios.post('/Admin/getAdminHistory')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ adminHistory: res.data });
            })
            // below we console the error in case of error
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete the record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete employee history
        axios.post('/Admin/deleteAdminHistory/',{
          id: pramerter
        })
        .then((res) =>{
            // below we redirect to new url
          window.location.replace('/dashboard/admin-history');
        })
        // belwo we console the error in case of error
        .catch((err)=>{
            console.log(err)
        })
    }
    // below we create method to update the record
    updateRecord = (adminId,fullName,email,phone, joiningDate, address,userName,password,gender) => {
        let pramerter = adminId;
        // below we send requset to the server to update the record
        axios.post('/Admin/updateAdminFromHistory/', {
            adminId: adminId,
            fullName: fullName,
            userName: userName,
            password: password,
            email: email,
            phone: phone,
            joiningDate: joiningDate,
            address: address,
            gender: gender
        })
            .then((res) => {
                window.location.replace('/dashboard/admin-history');
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
        // below we create columns for datatable
        const columns = ["ID", "Name","email", "Phone", "Joining Date","Address", "Revert", "Delete"];
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
                                title={"Admin History"}
                                data={this.state.adminHistory.map(record => {
                                    return [
                                        record.adminId,
                                        record.fullName.substr(0, 20),
                                        record.email,
                                        record.phone,
                                        record.joiningDate,
                                        record.address,
                                        // <Link to={'/dashboard/update-slip?id=' + record.empId}>
                                            <IconButton >
                                            <RestoreIcon onClick={() => this.updateRecord(record.adminId,record.fullName,record.email,record.phone, record.joiningDate, record.address,record.userName,record.password, record.gender)} title="Revert" />
                                        </IconButton>,
                                        // </Link>,
                                        <IconButton >
                                            <Delete onClick={() => this.deleteRecord(record.adminId)} />
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
// below we exprot component
export default AdminHistory;