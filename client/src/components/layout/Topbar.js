import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";

class Topbar extends Component {
  
	constructor(props){
		super(props);
		this.state = {
        showPersonSetting:false
      } 
	}
	
	onPhotoClick = () => {		
		this.setState({showPersonSetting:!this.state.showPersonSetting});		
	}
	onLogoutClick = () => {
		this.props.logoutUser();
	};

	render() {
		
    const { user } = this.props.auth; 
	var token = localStorage.jwtToken;
    const decoded = jwt_decode(token);    
    const name = decoded.name;
	const email= decoded.email;

    return (
		<div className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed aside-enabled aside-fixed wrapper d-flex flex-column flex-row-fluid">
			<div id="kt_header" class="header align-items-stretch">
				<div className="container-fluid d-flex align-items-stretch justify-content-between">
					<div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
						<div className="d-flex align-items-stretch">
							
						</div>
					</div>
				</div>
				<div className="d-flex align-items-stretch flex-shrink-0">
					<div className="d-flex align-items-stretch flex-shrink-0">
						<div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch">
							<div  className="menu-item me-lg-1">
							<button  type="button" class="btn menu-link py-3" onClick={this.onPhotoClick}><img src="./photo.png" width="40px" height="40px" style={{borderRadius: ".475rem"}}></img> </button>					
							</div>
						</div>
					</div>
				</div>

				{this.state.showPersonSetting && 
				<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px show" data-kt-menu="true" style={{zIndex: "105", position: "fixed", inset: "0px auto auto 0px", margin: "0px", transform: "translate3d(calc(84.5vw), 65px, 0px)"}} data-popper-placement="bottom-end">
					<div class="menu-item px-3" style={{textAlign:"center"}}>
						<div class="menu-content d-flex align-items-center px-3">
							<div class="symbol symbol-50px me-5">
								<img alt="Logo" src="./photo.png"></img>
							</div>
							<div class="d-flex flex-column">
								<div class="fw-bolder d-flex align-items-center fs-5">{name}</div>
								<a href="#" class="fw-bold text-muted text-hover-primary fs-7">{email}</a>
							</div>
						</div>
						<div style={{display:"flex", textAlign:"center"}}>
							<button  type="button" class="btn menu-link py-3" onClick={this.onLogoutClick}> Sign Out</button>					
						</div> 
					</div>    					  
				</div>	
				}
			</div>					
		</div>
    );
  }
}


Topbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Topbar);