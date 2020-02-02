import axios from 'axios'
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Delete } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from "@material-ui/core/styles";
const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
  deleteIcon: {
    color:"red",
    fontSize:"24px"
  },
  updateIcon: {
      color: "blue",
    fontSize:"24px"
  }
};


class SalaryTolbar extends React.Component {
  DeleteOrder =()=>
  {
    let rowindex = this.props.selectedRows.data;
    let deleteindex = [], deletedata = [], i = 0;
    rowindex.map(index => {

      console.log(index.dataIndex)
      deleteindex[i] = index.dataIndex
      i++;
    })//map funcation for filter deleted index

    let j = 0;
    this.props.Data.map(data => {
      // console.log(data.data)
      for (i = 0; i < deleteindex.length; i++) {
        if (data.dataIndex === deleteindex[i]) {
          deletedata[j] = data.data;
          j++;
        }
      }
    })
    // map funcation for row data against indexes
    for (i = 0; i < deletedata.length; i++) {
        axios.post('/Admin/delete-completed-order', {id: deletedata[i][0]})
          .then(responce => {
            // console.log(responce.data);
            // let a = responce.statusText;
            // console.log(deletedata.length+""+i+1);
            if (responce.data.success===true) {
              window.location.reload();
            }

          })
          .catch(error => { alert(error) })
  }
}
updateSLip = () =>{
  let rowindex = this.props.selectedRows.data;
  console.log(rowindex)
    let deleteindex = [], deletedata = [], i = 0;
    rowindex.map(index => {
      console.log(index.dataIndex)
      deleteindex[i] = index.dataIndex
      i++;
    })//map funcation for filter deleted index
    let j = 0;
    this.props.Data.map(data => {
      for (i = 0; i < deleteindex.length; i++) {
        if (data.dataIndex === deleteindex[i]) {
          deletedata[j] = data.data;
          j++;
        }
      }
    })
    // if(deletedata[0][8]!=="In Process")
    // {
    window.location= "/dashboard/update-slip?id=" + deletedata[0][0]
     
    // }
    // else{
    //     alert('Mechanic Already Assign')
    // }
    console.log(deleteindex);
    console.log(deletedata);
  // window.location= "/dashboard/update-slip?id=" + qurryString.parse(window.location.search).id + "&User=" + qurryString.parse(window.location.search).User
    // + "&category=" + deletedata[0][6] + "&service=" + deletedata[0][5] + "&CName=" + deletedata[0][0]
}
  render() {
    const { classes } = this.props;

    return (

      <div className={classes.iconContainer}>

        <Tooltip title={"Delete"}>
          <IconButton id='delete' className={classes.iconButton, classes.deleteIcon} onClick={this.DeleteOrder}>
            <Delete className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Update"}>
          <IconButton className={classes.iconButton}  >
            <EditIcon className={classes.icon, classes.updateIcon} onClick={this.updateSLip}/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "SalaryTolbar" })(SalaryTolbar);