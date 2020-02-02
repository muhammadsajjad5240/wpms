// below we import some modules for component
import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import CountUp from 'react-countup';
import './home.css';
// below we require canvasjs.react for creating graphs
let CanvasJSReact = require('./canvasjs.react').default;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let axios = require('axios');
let totalBill, totalTax, earnings;
const graphHeading = {
    color: '#000000',
    fontSize: '16px',
    fontWeight: '700'
}
// below we create and export component class
export default class Home extends Component {
    // below we create state to handle data
    state = {
        totalProjects: '',
        totalCompleteProjects: '',
        totalRuningProjects: '',
        totalClients: '',
        webProjects: '',
        androidProjects: '',
        desktopProjects: '',
        designingEmployee: '',
        marketingEmployee: '',
        developmentEmployee: '',
        seoEmployee: '',
        employees: '',
        ourEarnings: '',
        ourbills: '',
        ourTaxes: '',
        ourExpenses: '',
        totalSalaries: ''
    }
    // below we create method that will call when the component will load
    componentDidMount = () => {
        // below we send request to get count of total project
        axios.post('/Projects/countProjects', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ totalProjects: res.data });
            })
        // below we send request to get count of total complete project
        axios.post('/Projects/countCompleteProjects', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ totalCompleteProjects: res.data });
            })
        // below we send request to get count of total runing project
        axios.post('/Projects/countRuningProjects', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ totalRuningProjects: res.data });
            })
        // below we send request to get count of total clients
        axios.post('/Client/countClients', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ totalClients: res.data });
            })
        // below we send request to get count of total web project
        axios.post('/Projects/countWebProjects', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ webProjects: res.data });
            })
        // below we send request to get count of total android project
        axios.post('/Projects/countAndroidProjects', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ androidProjects: res.data });
            })
        // below we send request to get count of total project
        axios.post('/Projects/countDesktopProjects', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ desktopProjects: res.data });
            })
        // below we send request to get count of total designing employee
        axios.post('/Employee/countDesigningEmployee', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ designingEmployee: res.data });
            })
        // below we send request to get count of total marketing employee
        axios.post('/Employee/countMarketingEmployee', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ marketingEmployee: res.data });
            })
        // below we send request to get count of total development employee
        axios.post('/Employee/countDevelopmentEmployee', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ developmentEmployee: res.data });
            })
        // below we send request to get count of total seo employee
        axios.post('/Employee/countSeoEmployee', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ seoEmployee: res.data });
            })
        // below we send request to get count of total Employee
        axios.post('/Employee/countEmployee', {})
            .then((res) => {
                // below we set state with data comming from server
                    this.setState({ employees: res.data });
            })
        // below we send request to get sum of Earnings
        axios.post('/Projects/sumEaraning', {})
            .then((res) => {
                // below we set state with data comming from server
                // this.setState({ ourEarnings: res.data[0].total });
                if (!res.data.length == 0) {
                    earnings = res.data[0].total;
                }
            })
        // // below we send request to get sum of Bills
        axios.post('/Bills/sumBills', {})
            .then((res) => {
                // below we set state with data comming from server
                if (!res.data.length == 0) {
                    this.setState({ ourbills: res.data[0].total });
                    totalBill = this.state.ourbills;
                }
            })
        axios.post('/Salary/sumSalaries', {})
            .then((res) => {
                // below we set state with data comming from server
                if (!res.data.length == 0) {
                    this.setState({ totalSalaries: res.data[0].total });
                }
            })
        // // below we send request to get sum of Taxes
        axios.post('/Taxes/sumTaxes', {})
            .then((res) => {
                // below we set state with data comming from server
                if (!res.data.length == 0) {
                    this.setState({ ourTaxes: res.data[0].total });
                }
                totalTax = this.state.ourTaxes;
                this.setState({ ourExpenses: this.state.ourbills + this.state.ourTaxes + this.state.totalSalaries })
                // alert(this.state.ourExpenses);
                earnings = earnings - this.state.ourExpenses;
                this.setState({ ourEarnings: earnings })
            })

    }
    // alert(this.state.ourTaxes +  '' + this.state.ourbills);
    // below is ou main render method
    render() {
        // below we create option for charts
        const options = {
            title: {
                text: "Brief Summary of Our Completed Projects",
                fontWeight: 400,
                fontSize: 15
            },
            data: [{
                type: "column",
                dataPoints: [
                    { label: "web", y: this.state.webProjects },
                    { label: "Android", y: this.state.androidProjects },
                    { label: "Desktop", y: this.state.desktopProjects }
                ]
            }]
        }
        const options2 = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2", // "light1", "dark1", "dark2"
            title: {
                text: "Brief Summary of Our Employees",
                fontWeight: 400,
                fontSize: 15
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}",
                startAngle: -90,
                dataPoints: [
                    { y: this.state.designingEmployee, label: "Designing" },
                    { y: this.state.marketingEmployee, label: "Marketing" },
                    { y: this.state.seoEmployee, label: "SEO" },
                    { y: this.state.developmentEmployee, label: "Development" }
                ]
            }]
        }
        return (
            <div>
                <br />
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <span className="dash-widget-icon"><i class="fa fa-cubes" style={{ float: 'left' }}></i></span>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.totalProjects} /></h4>
                                            <span style={graphHeading}>Total projects</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <span className="dash-widget-icon"><i class="fas fa-check" style={{ color: '#f43b48', fontSize: '30px', float: 'left' }}></i></span>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.totalCompleteProjects} /></h4>
                                            <span style={graphHeading}>Complete projects</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <span className="dash-widget-icon"><i class="fa fa-project-diagram"></i></span>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.totalRuningProjects} /></h4>
                                            <span style={graphHeading}>Runing projects</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <i class="fa fa-user"></i>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.totalClients} /></h4>
                                            <span style={graphHeading}>Our Client</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <i class="fa fa-user"></i>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.employees} /></h4>
                                            <span style={graphHeading}>Our Employees</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <i class="fas fa-dollar-sign"></i>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.ourEarnings} /></h4>
                                            <span style={graphHeading}>Our Earnings</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <i class="fas fa-dollar-sign"></i>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.ourExpenses} /></h4>
                                            <span style={graphHeading}>Our Expenses</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <i class="fas fa-dollar-sign"></i>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.ourTaxes} /></h4>
                                            <span style={graphHeading}>Taxes Paid</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="stat-widget-dashboard">
                                    <div className="media">
                                        <div className="media-body text-right">
                                            <i class="fas fa-dollar-sign"></i>
                                            <h4 className="mt-0"><CountUp className="font-primary" end={this.state.totalSalaries} /></h4>
                                            <span style={graphHeading}>Salaries Paid</span>
                                        </div>
                                    </div>
                                    <div className="dashboard-chart-container-small">
                                        <Sparklines data={[25, 50, 30, 40, 60, 21, 20, 10, 4, 13, 0, 10, 30, 40, 10, 15, 20]} >
                                            <SparklinesLine color="#bca0ee" />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-6'>
                        <CanvasJSChart options={options} /><br />
                    </div>
                    <div className='col-sm-6'>
                        <CanvasJSChart options={options2} />
                    </div>
                </div>
            </div>
        )
    }
}