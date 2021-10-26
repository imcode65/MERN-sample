import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/custom.css";
import "../../assets/css/material.css";
import Navbar from "../layout/Navbar";
import DatePicker from "react-datepicker";

const reports = [];

class Create extends Component {

  constructor() {
    super();
    this.state = {
      ID:'',
      Reg_Date:'',
      Main_Content: '',
      Issue_to_Raise: '',
      Deposit_Amount: '',
      Other: '',
      Reg_Date_num:0,
      reports: [],
      curDate:new Date()
    };
  }

  componentDidMount() {
    var token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var Reg_Date = year * 10000 + month * 100 + day;

    axios.get('/api/report/' + decoded.name + "/" + Reg_Date)
      .then(res => {
        
        if (res.data[0]){  
        this.setState({ID: res.data[0]._id});  
        this.setState({Main_Content: res.data[0].Main_Content});
        this.setState({Issue_to_Raise: res.data[0].Issue_to_Raise});
        this.setState({Deposit_Amount: res.data[0].Deposit_Amount});
        this.setState({Other: res.data[0].Other});
        }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  cencelClick = (e) => {
    this.props.history.push("/dashboard");
  }

  onSubmit = (e) => {
    e.preventDefault();

    var token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    var UserName = decoded.name;
    var date = this.state.curDate;
    var year = date.getFullYear();
    var month = (date.getMonth()+1 < 10) ? "0" + (date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate();

    this.state.Reg_Date = year + "-" + month + "-" + day;
    var yearNum = date.getFullYear();
    var monthNum =  date.getMonth()+1;
    var dayNum = date.getDate();

    this.state.Reg_Date_num = yearNum * 10000 + monthNum * 100 + dayNum;

    if (this.state.Main_Content == "") this.state.Main_Content = " ";
    if (this.state.Issue_to_Raise == "") this.state.Issue_to_Raise = " ";
    if (this.state.Deposit_Amount == "") this.state.Deposit_Amount = " ";
    if (this.state.Other == "") this.state.Other = " ";

    const { Reg_Date, Main_Content, Issue_to_Raise, Deposit_Amount, Reg_Date_num, Other} = this.state;

    if (this.state.ID == ''){
      axios.post('/api/report', {Reg_Date, UserName, Main_Content, Issue_to_Raise, Deposit_Amount, Reg_Date_num, Other})
        .then((result) => {
          this.props.history.push("/dashboard")
        });
      }
      else{        
        axios.put('/api/report/' + this.state.ID, {Reg_Date, UserName, Main_Content, Issue_to_Raise, Deposit_Amount, Reg_Date_num, Other})
        .then((result) => {
          this.props.history.push("/dashboard")
        });
      }
  }

  onDateChange=(date)=>{
    this.setState({curDate:date});      
    var token = localStorage.jwtToken;
    const decoded = jwt_decode(token);   
    var name = decoded.name;   
    var year = date.getFullYear();
    var month = (date.getMonth()+1 < 10) ? "0" + (date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate();
    var Reg_Date = year * 10000 + month * 100 + day;
  
    axios.get('/api/report/' + decoded.name + "/" + Reg_Date)
      .then(res => {
        
        if (res.data[0]){  
          this.setState({ID: res.data[0]._id});  
          this.setState({Main_Content: res.data[0].Main_Content});
          this.setState({Issue_to_Raise: res.data[0].Issue_to_Raise});
          this.setState({Deposit_Amount: res.data[0].Deposit_Amount});
          this.setState({Other: res.data[0].Other});
        }
        else{
          this.setState({ID: ""});  
          this.setState({Main_Content: ""});
          this.setState({Issue_to_Raise: ""});
          this.setState({Deposit_Amount: ""});
          this.setState({Other: ""});
        }
    });
  }

  onToday=()=>{
    var date = new Date();
    this.setState({curDate: date});
    var token = localStorage.jwtToken;
    const decoded = jwt_decode(token);   
    var name = decoded.name;   
    var year = date.getFullYear();
    var month = (date.getMonth()+1 < 10) ? "0" + (date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate();
    var Reg_Date = year * 10000 + month * 100 + day;
  
    axios.get('/api/report/' + decoded.name + "/" + Reg_Date)
      .then(res => {
        
        if (res.data[0]){  
          this.setState({ID: res.data[0]._id});  
          this.setState({Main_Content: res.data[0].Main_Content});
          this.setState({Issue_to_Raise: res.data[0].Issue_to_Raise});
          this.setState({Deposit_Amount: res.data[0].Deposit_Amount});
          this.setState({Other: res.data[0].Other});
        }
        else{
          this.setState({ID: ""});  
          this.setState({Main_Content: ""});
          this.setState({Issue_to_Raise: ""});
          this.setState({Deposit_Amount: ""});
          this.setState({Other: ""});
        }
    });
  }
  render() {
    return (
      <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style ={{backgroundImage:"url(./hd_create.png)"}}>
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 fadeUp">
        <img alt="Logo" src="./logo.png" class="h-50px"/>
        <p>&nbsp;</p>
        <div className="container w-lg-700px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto" >
         <div className="col s8 offset-s2" >  
            <form onSubmit={this.onSubmit}>
            <div className="text-center mb-10  create-header" >
              <div className="header align-items-stretch">
                <div style={{display:"flex", alignItems:"center"}}>
                  <span> &nbsp;&nbsp;&nbsp;Date Setting &nbsp;</span>
                  <DatePicker style={{height:"100px !important"}} id="sDate" selected={this.state.curDate} onChange={this.onDateChange} dateFormat="yyyy-MM-dd" />
                  &nbsp;&nbsp;
                  <button id="logout" type="button" class="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder" onClick={this.onToday}> Today</button>					
                </div>  
              </div>            
            </div>
            <div style={{height:"60px"}}> &nbsp;
              </div>
            <div style={{height:"600px", overflow:"scroll", marginTop:"30px"}}>
              <div class="form-group">
                <label for="Main_Content">Current Project&nbsp;</label>
                <textarea class="form-control input-main-content" name="Main_Content" value={this.state.Main_Content} onChange={this.onChange} placeholder="Current Project" />
              </div>
              <div class="form-group">
                <label for="Other">Other Works:</label>
                <textarea class="form-control input-main-issue" name="Other" value={this.state.Other} onChange={this.onChange} placeholder="Other Works" />
              </div>
              <div class="form-group">
                <label for="Deposit_Amount">Today Deposit Amount:</label>
                <input type="text" class="form-control" name="Deposit_Amount" value={this.state.Deposit_Amount} onChange={this.onChange} placeholder="Today Deposit Amount" />
              </div> 
              <div class="form-group">
                <label for="Issue_to_Raise">Issue to Raise:</label>
                <textarea class="form-control input-main-issue" name="Issue_to_Raise" value={this.state.Issue_to_Raise} onChange={this.onChange} placeholder="Issue to Raise" />
              </div>     
              <div style={{display:"flex"}}>
                <button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
                  <span class="indicator-label">Submit</span>
                </button>
                &nbsp;
                <Link to="/Dashboard" class="btn btn-lg btn-primary w-100 mb-5">
                  Cancel
                </Link>
              </div>  
             </div>       
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Create;
