//below import moduls for compoennt
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from '@material-ui/icons/Restore';
import { Delete } from "@material-ui/icons";
//below create component class
class ClientHistory extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // belwo we create state to handle data
        this.state = {
            clientHistory: [],
        };
    }
    // below we create method that will call when the component will load
    componentDidMount() {
        // below we send requst to the server to get client history
        axios.post('/Client/getClientHistory')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ clientHistory: res.data });
            })
            // below we console the error in case of error occur
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete recrod
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to server delelte clietn history
        axios.post('/Client/deleteClientHistory/', {
            id: pramerter
        })
            .then((res) => {
                // below we redirect to new url
                window.location.replace('/dashboard/client-history');
            })
            // below we conslose the error in case of error
            .catch((err) => {
                console.log(err)
            })
    }
    // below we uodate the record 
    updateRecord = (id, fullName, userName, email, phone, address, gender) => {
        let pramerter = id;
        // below we send request to the server to update the history
        axios.post('/Client/updateClientFromHistory/', {
            id: id,
            fullName: fullName,
            userName: userName,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        })
            .then((res) => {
                // below we redirect to new url
                window.location.replace('/dashboard/client-history');
            })
            // below we console the error
            .catch((err) => {
                console.log(err)
            })
    }
    // below we create methodd to style the datatabele which is default
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
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{ position: 'sticky' }}>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Client History"}
                                data={this.state.clientHistory.map(record => {
                                    return [
                                        record.clientId,
                                        record.fullName.substr(0, 20),
                                        record.email.substr(0, 20),
                                        record.phone,
                                        record.address.substr(0, 20),
                                        record.gender,
                                        // <Link to={'/dashboard/update-slip?id=' + record.clientId}>
                                        <IconButton >
                                            <RestoreIcon title="Revert" onClick={() => this.updateRecord(record.clientId, record.fullName, record.userName, record.email,
                                                record.phone, record.address, record.gender)} />
                                        </IconButton>,
                                        // </Link>,
                                        <IconButton >
                                            <Delete onClick={() => this.deleteRecord(record.clientId)} />
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
// below we exprot the component
export default ClientHistory;