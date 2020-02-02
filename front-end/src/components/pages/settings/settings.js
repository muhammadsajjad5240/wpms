import React, { Component } from 'react';
import PropTypes from 'prop-types';
let axios = require('axios');
let battreycharging, batteryLevel, batteryChrTime, batteryDisChrTime;
const Repo = ({ repo, index }) =>
    <tr>
        <td>{index + 1}</td>
        <td className="repo-name">{repo.name}</td>
        <td>{repo.stargazers_count} Stars</td>
    </tr>;

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        navigator.getBattery().then(function (battery) {
            function updateAllBatteryInfo() {
                updateChargeInfo();
                updateLevelInfo();
                updateChargingInfo();
                updateDischargingInfo();
            }
            updateAllBatteryInfo();

            battery.addEventListener('chargingchange', function () {
                updateChargeInfo();
            });
            function updateChargeInfo() {
                console.log("Battery charging? "
                    + (battery.charging ? "Yes" : "No"));
                battreycharging = battery.charging;
            }

            battery.addEventListener('levelchange', function () {
                updateLevelInfo();
            });
            function updateLevelInfo() {
                console.log("Battery level: "
                    + battery.level * 100 + "%");
                batteryLevel = battery.level * 100 + "%";
            }

            battery.addEventListener('chargingtimechange', function () {
                updateChargingInfo();
            });
            function updateChargingInfo() {
                console.log("Battery charging time: "
                    + battery.chargingTime + " seconds");
                batteryChrTime = battery.chargingTime + " seconds";
            }

            battery.addEventListener('dischargingtimechange', function () {
                updateDischargingInfo();
            });
            function updateDischargingInfo() {
                console.log("Battery discharging time: "
                    + battery.dischargingTime + " seconds");
                batteryDisChrTime = battery.dischargingTime + " seconds";
            }
        });
        axios
            .get(
                window.encodeURI(
                    `https://api.github.com/search/repositories?q=stars:>1+language:php&sort=stars&order=desc&type=Repositories`,
                ),
            )
            .then(response => {
                const repos = response.data.items;
                this.setState({
                    repos,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                });
            });
    }
    renderLoading() {
        return (
            <div>
                Loading...
          </div>
        );
    }

    renderError() {
        return (
            <div>
                <div>
                    Sorry, an error ocurred: {this.state.error.response.data.message}
                </div>
            </div>
        );
    }

    renderList() {
        const { error, repos } = this.state;

        if (error) {
            console.log(error);
            return this.renderError();
        }

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Repo Name</th>
                            <th>Stars Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((repo, index) =>
                            <Repo repo={repo} index={index} key={repo.id} />,
                        )}
                    </tbody>
                </table>
                <h2 className='text-center'>Please Refresh Your Page to see Battery Information.</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Battery charging</th>
                            <th>Battery level</th>
                            <th>Battery charging time</th>
                            <th>Battery discharging time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>1</td>
                        <td>{battreycharging}</td>
                        <td>{batteryLevel}</td>
                        <td>{batteryChrTime}</td>
                        <td>{batteryDisChrTime}</td>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}

//     render(){
//         return(
//             <div>
//                 <h1>Settings</h1>
//             </div>
//         );
//     }
// }
