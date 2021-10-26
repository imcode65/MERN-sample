import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Navbar extends Component {
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
	  return (
		<div id="kt_aside" class="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
			<div className="aside-logo flex-column-auto">
				<img src="./logo_side.png"></img>
			</div>
			<div className="aside-menu flex-column-fluid">
				<div className="hover-scroll-overlay-y my-5 my-lg-5" style={{height:"31px"}}>
					<div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
						<div className="menu-item">
							<a class="menu-link" href="/dashboard">
								<span className="menu-icon">
									<span className="svg-icon svg-icon-2">										
									</span>
									<span className="menu-title">
										Dailly Report
									</span>
								</span>
							</a>
						</div>
					</div>
				</div>
				<div className="hover-scroll-overlay-y my-5 my-lg-5" style={{height:"31px"}}>
					<div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
						<div className="menu-item">
							<a class="menu-link" href="">
								<span className="menu-icon">
									<span className="svg-icon svg-icon-2">
									</span>
									<span className="menu-title">
										Amount Result
									</span>
								</span>
							</a>
						</div>
					</div>
				</div>
				<div className="hover-scroll-overlay-y my-5 my-lg-5" style={{height:"31px"}}>
					<div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
						<div className="menu-item">
							<a class="menu-link" href="/userManagement">
								<span className="menu-icon">
									<span className="svg-icon svg-icon-2">
									</span>
									<span className="menu-title">
										User Management
									</span>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);