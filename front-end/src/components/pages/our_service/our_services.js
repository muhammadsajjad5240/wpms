// below we import modules for component
import React, { Component } from 'react';
import './our_services.css';
import customize from '../../../assets/images/customize.png';
import secure from '../../../assets/images/secure.png';
import responsive_design from '../../../assets/images/responsive_design.png';
// below we create and export component class
export default class OurServices extends Component {
    // below is our main render method
    render() {
        return (
            <div id="our_services">
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h1 className="text-center pt-3 pb-3">Our Services</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <i class="fa fa-code service_icons" style={{color:'#033557'}}></i>
                                <h4 className="text-center mt-4">Expert Coder</h4>
                                <p className='text-center'>will have to make sure the prototype looks finished by inserting text or photo.make sure the prototype looks finished by.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <i class="fa fa-camera-retro service_icons" style={{color:'#232b38'}}></i>
                                <h4 className="text-center mt-4">Creative Designer</h4>
                                <p className='text-center'>Creative design has an equal importance in marketing as the heart possesses in humans. A good design influences the choices.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <i class="fab fa-wordpress service_icons"></i>
                                <h4 className="text-center mt-4">Wordpress Developer</h4>
                                <p className='text-center'>We are a team of dedicated website developers having vast experience of designing and developing mobile responsive websites for businesses.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <i class="fa fa-camera-retro service_icons" style={{color:'#bd1c5c'}}></i>
                                <h4 className="text-center mt-4">Social Marketer </h4>
                                <p  className='text-center'>We develop custom cms platforms for your business because we understand every business has its own needs.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <i class="far fa-chart-bar service_icons" style={{color:'#20800d'}}></i>
                                <h4 className="text-center mt-4">Seo Expart</h4>
                                <p className='text-center'>Professional SEO services bring more traffic to your website which is highly targeted and generates the required results effectively.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <i class="fas fa-ticket-alt service_icons" style={{color:'#a88711'}}></i>
                                <h4 className="text-center mt-4">24/7 Support</h4>
                                <p className='text-center'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={customize} alt='Highly Customizable' />
                                <h4 className="text-center mt-4">Highly Customizable</h4>
                                <p className='text-center'>WordPress themes can be customized in several ways depending on the extent to which you are wanting to change your themes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={responsive_design} alt='Responsive Design' />
                                <h4 className="text-center mt-4">Responsive Design</h4>
                                <p className='text-center'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={secure} alt='Secure' />
                                <h4 className="text-center mt-4">Secure</h4>
                                <p className='text-center'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
