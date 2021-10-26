import React, { Component, useState } from "react";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/custom.css";
import "../../assets/css/material.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../layout/Navbar";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import Topbar from "../layout/Topbar";
import { session } from "passport";
import { decode } from "jsonwebtoken";
import $ from 'jquery';

import { isEmpty } from "is-empty";

var clickPhoto = true;

class Dashboard extends Component {
  
    constructor(props){
      super(props);
      this.state = {
        startDate:new Date(),
        endDate:new Date(),
        value:'1',
        nameValue:'',
        reports:[],
        users:[],
        show:false,
        showEndDate:false,
        showPerson:false,
        categoryActions:[
          {label:"By Date", value:"1"},
          {label:"By Person", value:"2"}
        ],
        fieldName: 'User Name',
        authority:'0',
        showPersonSetting:false,
        name:'',
        email:''        
      }

      // 
    }   

    componentDidMount() {
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      this.setState({name: decoded.name});
      this.setState({email: decoded.email});

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var Reg_Date = year * 10000 + month * 100 + day;

      this.setState({authority: decoded.authority});

      if (decoded.authority == "1"){
        axios.get('/api/report/date/' + Reg_Date)
          .then(res => {
            this.setState({ reports: res.data });
          });
      }
      else{
        axios.get('/api/report/' + decoded.name + "/" + Reg_Date)
          .then(res => {
            this.setState({ reports: res.data });
          });
      }

      this.setState({showAddButton:true});

      if (decoded.authority == "1"){
        this.setState({showAddButton:false});
      }

      axios.get('/api/users/data')
        .then(res => {
          this.setState({ users: res.data });
      });   

      document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }
    
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    handleClickOutside(event) {     
      if (event.target.id=="logout"){
        event.preventDefault();
        return;
      }   

      if(event.target.id=="avatar"){
        this.setState({showPersonSetting: !this.state.showPersonSetting});	
      }
      else  
        this.setState({showPersonSetting:false});	    

    }
  
    categorySelect=(e)=>{
      var cate = document.getElementById("category");
      this.setState({Value:cate.value});
      
      switch(cate.value){
      case "1":{
        this.setState({showPerson:false});
        this.find_date();
        break;
      }
      case "2":{    
        this.setState({showPerson:true});
        this.find_name();
        break;
      } 
      case "3":{
        this.setState({showPerson:false});
        this.find_date_user();
        break;
      }
      case "4":{     
        this.setState({showPerson:true});
        this.find_name_user();
        break;
      }       
    }
  }

    find_date=()=>{
      var startDate = this.state.startDate;
      var year = startDate.getFullYear();
      var month = startDate.getMonth()+1;
      var day = startDate.getDate();
      var Reg_Date = year * 10000 + month * 100 + day;
          
      axios.get('/api/report/date/' + Reg_Date)
          .then(res => {
            this.setState({ reports: res.data });
          });
    }

    find_name=()=>{
      if (!this.state.users[0]) return;
      var name = this.state.users[0].name;

      var startDate = this.state.startDate;
      var year1 = startDate.getFullYear();
      var month1 = startDate.getMonth()+1;
      var day1 = startDate.getDate();
      var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

      var endDate = this.state.endDate;
      var year2 = endDate.getFullYear();
      var month2 = endDate.getMonth()+1;
      var day2 = endDate.getDate();
      var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
          
      axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
        .then(res => {          
          
          this.setState({ reports: res.data });
        });
    }

    find_date_user=()=>{
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      var name = decoded.name;
      var startDate = this.state.startDate;
      var year = startDate.getFullYear();
      var month = startDate.getMonth()+1;
      var day = startDate.getDate();
      var Reg_Date = year * 10000 + month * 100 + day;
          
      axios.get('/api/report/' + name + "/" + Reg_Date)
          .then(res => {
            this.setState({ reports: res.data });
          });
    }

    find_name_user=()=>{
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      var name = decoded.name;

      var startDate = this.state.startDate;
      var year1 = startDate.getFullYear();
      var month1 = startDate.getMonth()+1;
      var day1 = startDate.getDate();
      var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

      var endDate = this.state.endDate;
      var year2 = endDate.getFullYear();
      var month2 = endDate.getMonth()+1;
      var day2 = endDate.getDate();
      var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
          
      axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
        .then(res => {          
          this.setState({ reports: res.data });
        });
    }

    nameSelect=(e)=>{
      var nameTag = document.getElementById("names");
      var name = nameTag.value;

      var startDate = this.state.startDate;
      var year1 = startDate.getFullYear();
      var month1 = startDate.getMonth()+1;
      var day1 = startDate.getDate();
      var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

      var endDate = this.state.endDate;
      var year2 = endDate.getFullYear();
      var month2 = endDate.getMonth()+1;
      var day2 = endDate.getDate();
      var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
      
      axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
        .then(res => {          
          this.setState({ reports: res.data });
        });
    }
       
    onStartDateChange=(date)=>{
      if (this.state.endDate < date) return;

      this.setState({startDate:date});      
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);   

      if (this.state.Value == "2"){
        var nameTag = document.getElementById("names");
        var name = nameTag.value;

        var startDate = date;
        var year1 = startDate.getFullYear();
        var month1 = startDate.getMonth()+1;
        var day1 = startDate.getDate();
        var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

        var endDate = this.state.endDate;
        var year2 = endDate.getFullYear();
        var month2 = endDate.getMonth()+1;
        var day2 = endDate.getDate();
        var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
        
        var nameTag = document.getElementById("names");
        var name = nameTag.value;
        
        axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
          .then(res => {          
            this.setState({ reports: res.data });
          });
        return;
      }
      else if (this.state.Value == "4"){        
        var name = decoded.name;

        var startDate = date;
        var year1 = startDate.getFullYear();
        var month1 = startDate.getMonth()+1;
        var day1 = startDate.getDate();
        var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

        var endDate = this.state.endDate;
        var year2 = endDate.getFullYear();
        var month2 = endDate.getMonth()+1;
        var day2 = endDate.getDate();
        var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
          
        axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
          .then(res => {          
            this.setState({ reports: res.data });
          });
        return;
      }
      
      var year = date.getFullYear();
      var month = (date.getMonth()+1 < 10) ? "0" + (date.getMonth()+1) : date.getMonth()+1;
      var day = date.getDate();
      var Reg_Date = year * 10000 + month * 100 + day;
   
      if (decoded.authority == "1" ){        
        axios.get('/api/report/date/' + Reg_Date)
          .then(res => {
            this.setState({ reports: res.data });
          });
      }
      else{
        axios.get('/api/report/' + decoded.name + '/' + Reg_Date)
        .then(res => {
          this.setState({ reports: res.data });
        });
      }

      var curDate = new Date();
      var curYear = curDate.getFullYear();
      var curMonth = (curDate.getMonth()+1 < 10) ? "0" + (curDate.getMonth()+1) : curDate.getMonth()+1;
      var curDay = curDate.getDate();
      var Cur_Date = curYear * 10000 +  curMonth * 100 + curDay;

      // if (Reg_Date != Cur_Date || decoded.authority == "1"){
      //   this.setState({showAddButton:false});
      // }
      // else{
      //   this.setState({showAddButton:true});
      // }
    }

    onEndDateChange=(date)=>{
      if (this.state.startDate > date) return;
      this.setState({endDate:date});         
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token); 

      if (this.state.Value == "2"){
        var nameTag = document.getElementById("names");
        var name = nameTag.value;

        var startDate = this.state.startDate;
        var year1 = startDate.getFullYear();
        var month1 = startDate.getMonth()+1;
        var day1 = startDate.getDate();
        var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

        var endDate = date;
        var year2 = endDate.getFullYear();
        var month2 = endDate.getMonth()+1;
        var day2 = endDate.getDate();
        var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
        
        var nameTag = document.getElementById("names");
        var name = nameTag.value;
        
        axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
          .then(res => {          
            this.setState({ reports: res.data });
          });
        return;
      }
      else if (this.state.Value == "4"){        
        var name = decoded.name;

        var startDate = this.state.startDate;
        var year1 = startDate.getFullYear();
        var month1 = startDate.getMonth()+1;
        var day1 = startDate.getDate();
        var Reg_Date1 = year1 * 10000 + month1 * 100 + day1;

        var endDate = date;
        var year2 = endDate.getFullYear();
        var month2 = endDate.getMonth()+1;
        var day2 = endDate.getDate();
        var Reg_Date2 = year2 * 10000 + month2 * 100 + day2;
          
        axios.get('/api/report/' + name + '/' + Reg_Date1 + "/" + Reg_Date2)
          .then(res => {          
            this.setState({ reports: res.data });
          });
        return;
      }
         
      this.setState({endDate:date});
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var Reg_Date = year * 10000 + month * 100 + day;

      if (decoded.authority == "1"){
        axios.get('/api/report/date/' + Reg_Date)
          .then(res => {
            this.setState({ reports: res.data });
          });
      }
      else{
        axios.get('/api/report/' + decoded.name + '/' + Reg_Date)
        .then(res => {
          this.setState({ reports: res.data });
        });
      }
    }
  
    onPhotoClick = () => {	
      if (!clickPhoto)	
        this.setState({showPersonSetting:true});
      else
        this.setState({showPersonSetting:false});
      clickPhoto = !clickPhoto;
    }
    onLogoutClick = () => {      
      this.props.logoutUser();
    };

    render(){
      const nameOptions  = this.state.users.map((users,id) => (
        <option value={users.name} key={id}> {users.name} </option>
      ));

      const reports  = this.state.reports.map((reports, id) => {
        var temp = reports.Main_Content + " ";
        var main_content = (temp.length > 70)? temp.slice(0, 70) + "..." : temp;
            temp = reports.Other + " ";
        var other_content = (temp.length > 70)? temp.slice(0, 70) + "..." : temp;
            temp = reports.Issue_to_Raise + " ";
        var issue_content = (temp.length > 40)? temp.slice(0, 40) + "..." : temp;
        // temp_main_content += '...';
        return(
          <tr key = {id}>         
            <td width="10%" align="center"><button type="button" className="btn" data-toggle="modal" data-target={"#M" + reports._id}>{reports.Reg_Date}</button></td>
            <td width="10%" align="center"><button type="button" className="btn" data-toggle="modal" data-target={"#M" + reports._id}>{reports.UserName}</button></td>
            <td width="30%" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"30%", textAlign:"left"}}>{main_content}</div></td>
            <td width="20%" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"20%", textAlign:"left"}}>{other_content}</div></td>
            <td width="10%" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"10%", textAlign:"center"}} >{reports.Deposit_Amount}</div></td>
            <td width="20%" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"20%", textAlign:"left"}}>{issue_content}</div></td>
          </tr>
        )
      });
      const modals  = this.state.reports.map((reports, id) => (  
      <div className="modal fade" id={"M" + reports._id} tabIndex="-1" key={id}  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header" >
                  <div style={{textAlign:"center", display:"flex"}}>
                  <div style={{width:"650px"}}><h2  id="exampleModalLongTitle">{reports.UserName + " : " + reports.Reg_Date}</h2></div>
                  </div>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" align="left">
                <div className="form-group" style={{paddingBottom:"20px"}}>
                  <h5 className="modal-title" className="blue-text" htmlFor="Main_Content">Current Project:</h5>
                  <textarea className="form-control input-main-content" name="Main_Content" value={reports.Main_Content} />
                </div>
                <div className="form-group" style={{paddingBottom:"20px"}}>
                  <h5 className="modal-title" className="blue-text" htmlFor="Main_Content">Other Works:&nbsp;</h5>
                  <textarea className="form-control input-main-issue" name="Other" value={reports.Other}/>
                </div>
                <div className="form-group" style={{paddingBottom:"20px"}}>
                  <h5 className="modal-title" className="blue-text" htmlFor="Main_Content">Today Deposit Amount:&nbsp;</h5>
                  <input type="text" className="form-control" name="Deposit_Amount" value={reports.Deposit_Amount} />
                </div> 
                <div className="form-group">
                  <h5 className="modal-title" className="blue-text" htmlFor="Main_Content">Issue to Raise:&nbsp;</h5>
                  <textarea className="form-control input-main-issue" name="Issue_to_Raise" value={reports.Issue_to_Raise}/>
                </div>
                </div>
                <div className="modal-footer">
                  <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                </div>
              </div>
            </div>
          </div>          
      ));       
      return (
          <div>
            <div><Navbar /></div>
            <div className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed aside-enabled aside-fixed wrapper d-flex flex-column flex-row-fluid">
            <div id="kt_header" class="header align-items-stretch">
              <div className="container-fluid d-flex align-items-stretch justify-content-between">
                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                  <div className="d-flex align-items-stretch">
                    <div className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                      <h1 className="d-flex align-items-center text-dark fw-bolder my-1 fs-3">Dailly Report </h1>                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-stretch flex-shrink-0">
                <div className="d-flex align-items-stretch flex-shrink-0">
                  <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch">
                    <div  className="menu-item me-lg-1">
                      <button  type="button" class="btn menu-link py-3" id="avatar"> <img id="avatar" src="./photo.png" width="40px" height="40px" style={{borderRadius: ".475rem"}}></img> </button>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.showPersonSetting && 
              <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px show" data-kt-menu="true" style={{zIndex: "105",  margin: "0px", transform: "translate3d(0, 65px, 0px)", position:"absolute", right:"5px"}} data-popper-placement="bottom-end">
                <div class="menu-item px-3" style={{textAlign:"center"}}>
                  <div class="menu-content d-flex align-items-center px-3">
                    <div class="symbol symbol-50px me-5">
                      <img alt="Logo" src="./photo.png"></img>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="fw-bolder d-flex align-items-center fs-5">{this.state.name}</div>
                      <a href="#" class="fw-bold text-muted text-hover-primary fs-7">{this.state.email}</a>
                    </div>
                  </div>
                  <div style={{display:"flex", textAlign:"center"}}>
                    <button id="logout" type="button" class="btn menu-link py-3" onClick={this.onLogoutClick}> Sign Out</button>					
                  </div> 
                </div>    					  
              </div>	
              }
            </div>					
          </div>
            <div>
            <div className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed aside-enabled aside-fixed wrapper d-flex flex-column flex-row-fluid">
		          <div className="content d-flex flex-column flex-column-fluid">
                <div className="toolbar"  style={{height:"55px", paddingLeft:"30px"}}>                  
                  <div style={{display:"flex"}}>
                  {this.state.authority == "0" &&
                    <div style={{display:"flex", alignItems:"center"}}>
                      <span> Look at &nbsp;</span>  
                      <div style={{width:'150px'}}>
                        <select id="category" className="form-select" onChange={this.categorySelect} >
                          <option value="3"> One-day </option>  
                          <option value="4"> Several days </option>                                     
                        </select>                    
                      </div>
                    </div>
                    }
                    {this.state.authority == "1" &&
                    <div style={{display:"flex", alignItems:"center"}}>
                      <span> Category &nbsp;</span>  
                      <div style={{width:'150px'}}>
                        <select id="category" className="form-select" onChange={this.categorySelect} >
                          <option value="1"> By Date </option>  
                          <option value="2"> By Person </option>                                     
                        </select>                    
                      </div>
                    </div>
                    }
                    {this.state.showPerson && this.state.authority == "1" &&
                      <div style={{display:"flex", alignItems:"center"}}>
                        <span> &nbsp;&nbsp;&nbsp;Name &nbsp;</span>
                        <div style={{width:'250px'}}>
                          <select id="names" className="form-select" onChange={this.nameSelect} >
                            {nameOptions}                                           
                          </select>
                        </div>
                      </div>
                    }
                    
                    <div style={{display:"flex", alignItems:"center"}}>
                    <span> &nbsp;&nbsp;&nbsp;Date Setting &nbsp;</span>
                    <div>
                    {/*<DatePickerComponent id="datepicker"  value={this.state.startDate} format='yyyy-MM-dd' placeholder='Enter date' />*/}
                    {this.state.showPerson && <span> &nbsp;&nbsp;&nbsp; From: &nbsp;</span>}
                      <DatePicker style={{height:"100px !important"}} id="sDate" selected={this.state.startDate} onChange={this.onStartDateChange} dateFormat="yyyy-MM-dd" />
                    </div> 
                    {this.state.showPerson && <div>
                      <span> &nbsp;&nbsp;&nbsp; To: &nbsp;</span>
                      <DatePicker id="eDate" selected={this.state.endDate} onChange={this.onEndDateChange}  dateFormat="yyyy-MM-dd" className = "m-l-10"/>
                    </div> }           
                    {this.state.showAddButton && <div className="m-l-10" style={{position:'absolute', right:'30px'}}><Link to='/create' className="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder">Add </Link></div>}
                    </div>          
                  </div>  
                </div>
              </div>
             </div> 
              <div style={{paddingTop:"100px", marginLeft:"220px", textAlign:"center"}}>
              <div className="container" >
              <div className="container w-lg-1100px bg-body rounded shadow-sm p-10 mx-auto" >
                <table className="table table-bordered table-striped table-hover fs-6 gy-5 ">
                  <thead>
                    <tr align='center' height='60px'>
                      <th style={{width:"10%"}} className="pe-2 sorting_disabled">Date</th>
                      <th style={{width:"10%"}} className="pe-2 sorting_disabled">User</th>
                      <th style={{width:"30%"}} className="pe-2 sorting_disabled">Current Project</th>
                      <th style={{width:"20%"}} className="pe-2 sorting_disabled">Other Works</th>    
                      <th style={{width:"10%"}} className="pe-2 sorting_disabled">Today's Deposit</th>                       
                      <th style={{width:"20%"}} className="pe-2 sorting_disabled">Issue</th>   
                    </tr>
                  </thead>
                  <tbody>                  
                    {reports}                
                  </tbody>
                </table>
                {modals} 
                </div>   
                </div>  
                </div>   
                </div>     
                </div>         
      );
    }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
