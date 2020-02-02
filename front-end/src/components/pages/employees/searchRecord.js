import emp_1 from '../../../assets/images/employees/emp_1.jpg';
import $ from 'jquery';
import axios from 'axios';
import Employess from './employees';
import React, { Component } from 'react';
// export default class searchFunction extends Component {
const helpers = {
    searchRecord: function(){
        alert('Hello');
let emp_id = document.getElementById('emp_id').value;
let emp_name = document.getElementById('emp_name').value;
let emp_designation = document.getElementById('select_designation').value;
    if (emp_id !== "" && (emp_name === "" || emp_designation === "Select Designation")) {
    $("#card_container").empty();
    axios.post('/api/search/', { emp_id: this.state.search_emp_id })
        .then((res) => {
            this.setState({ searchEmployees: res.data });
            let row = $('<div class="row"></div>');
            for (var i = 0; i <= res.data.length; i++) {
                var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                var cardMenu = $('<div className="col-sm-2"><div class="dropdown profile-action show"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><i class="fas fa-ellipsis-v ml-2 text-right card_menu_icon" title="Menu"></i></a>        <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(-136px, 32px, 0px)" }}>            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i class="fas fa-pencil-alt edit_icon mr-3"></i> Edit</a>                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i class="far fa-trash-alt delete_icon mr-3"></i>Delete</a></div></div></div>');
                var employeesName = $('<h2>' + res.data[i].firstName + ' ' + res.data[i].lastName + '</h2>');
                var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                var images = $('<img />');
                $(employeesName).attr('class', 'text-center mt-4');
                $(employeesDesination).attr('class', 'text-center mt-2');
                $(images).attr("src", emp_1);
                $(images).attr('class', 'mt-4 ml-10 rounded_images');
                $(images).css({ "margin-left": "30%" });
                var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                cardMenu.appendTo(myPanel);
                images.appendTo(myPanel);
                employeesName.appendTo(myPanel);
                employeesDesination.appendTo(myPanel)
                myPanel.appendTo(myCol);
                myCol.appendTo(row);
                row.appendTo('#card_container');
            }
            for (let i = 0; i < res.data.length; i++) {

                document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                document.getElementById("name" + i).innerHTML = res.data[i].firstName + ' ' + res.data[i].lastName;
                document.getElementById("designation" + i).innerHTML = res.data[i].designation;
            }
            console.log(this.state.searchEmployees);
        }).
        catch((err) => {
            console.log(err)
        })
    }
}
}
export default helpers;