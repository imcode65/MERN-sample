import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/bundle.css";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style ={{backgroundImage:"url(./hd.png)", height:"800px"}}>
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 fadeUp">
        <img alt="Logo" src="./logo.png" class="h-50px"/>
        <p>&nbsp;</p>
      <div className="container w-lg-450px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto" >
         <div className="col s8 offset-s2">  
            <form className = "form w-100 fv-plugins-bootstrap5 fv-plugins-framework" noValidate onSubmit={this.onSubmit}>
            <div className="text-center mb-10" >
              <h2>
                <b>Sign In to Dialy Report System</b>
              </h2>
              <div class="text-gray-400 fw-bold fs-4">New Here? 
								<a href="/register" class="link-primary fw-bolder"> Create an Account</a></div>              
            </div>
              <div className="input-field row s12 mb-10">
                <label class="form-label fs-6 fw-bolder text-dark" htmlFor="email">Email or Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="form-control form-control-lg form-control-solid"
                />                
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <p></p>
              <div className="input-field row s12 mb-10">
                <label class="form-label fs-6 fw-bolder text-dark" htmlFor="password">Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="form-control form-control-lg form-control-solid "
                />
                
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>

            <div className="input-field row s12">
              <button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
                <span class="indicator-label">Continue</span>
                <span class="indicator-progress">Please wait... 
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>    
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
