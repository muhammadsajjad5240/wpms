import React, {Component} from 'react';

class UserPanel extends Component {
    render() {
        return (
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-50 rounded-circle" src={require("./../../../assets/images/user/1.jpg")} alt="#" />
                </div>
                <h6 className="mt-3 f-12">Johan Deo</h6>
                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
        );
    }
}

export default UserPanel