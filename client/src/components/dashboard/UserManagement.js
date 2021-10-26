import React, { Component, useState } from "react";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../layout/Navbar";
import Topbar from "../layout/Topbar";

const reports = [];

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
        authority:'0'
      }
    }
  
    componentDidMount() {
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
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
    }
  
    categorySelect=(e)=>{
      var cate = document.getElementById("category");
      this.setState({Value:cate.value});
      
      if(cate.value == "1"){
        this.setState({showPerson:false});
        this.setState({fieldName:"User Name"})
        this.find_date();
      }
      else{ 
        this.setState({fieldName:"Reg Date"})     
        this.setState({showPerson:true});
        this.find_name();
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

      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      
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

      if (Reg_Date != Cur_Date || decoded.authority == "1"){
        this.setState({showAddButton:false});
      }
      else{
        this.setState({showAddButton:true});
      }
    }

    onEndDateChange=(date)=>{
      if (this.state.startDate > date) return;
      this.setState({endDate:date});         
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

      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);    
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

    render(){
      const nameOptions  = this.state.users.map((users,id) => (
          <option value={users.name} key={id}> {users.name} </option>
       ));
      const reports  = this.state.reports.map((reports, id) => {
        var temp = reports.Main_Content;
        var temp_main_content = temp.slice(0, 20);
        temp_main_content += '...';
        console.log(temp_main_content)
        return(
          <tr key = {id}>         
            <td width="15%" align="center"><button type="button" class="btn" data-toggle="modal" data-target={"#M" + reports._id}>{reports.Reg_Date}</button></td>
            <td width="10%" align="center"><button type="button" class="btn" data-toggle="modal" data-target={"#M" + reports._id}>{reports.UserName}</button></td>
            <td width="300px" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"330px", textAlign:"left"}}></div></td>
            <td width="300px" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"300px", textAlign:"left"}}>{reports.Other}</div></td>
            <td width="10%" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", textAlign:"center"}} >{reports.Deposit_Amount}</div></td>
            <td width="200px" ><div className="Main-content"  style={{ margin:"5px 5px 5px 5px", width:"200px", textAlign:"left"}}>{reports.Issue_to_Raise}</div></td>
          </tr>
        )
      });
      const modals  = this.state.reports.map((reports, id) => (  
      <div class="modal fade" id={"M" + reports._id} tabIndex="-1" key={id}  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header" >
                    <div style={{textAlign:"center", display:"flex"}}>
                    <div style={{width:"650px"}}><h2  id="exampleModalLongTitle">{reports.UserName + " : " + reports.Reg_Date}</h2></div>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" align="left">
                  <div class="form-group" style={{paddingBottom:"20px"}}>
                    <h5 class="modal-title" className="blue-text" htmlFor="Main_Content">Current Project:</h5>
                    <textarea class="form-control input-main-content" name="Main_Content" value={reports.Main_Content} />
                  </div>
                  <div class="form-group" style={{paddingBottom:"20px"}}>
                    <h5 class="modal-title" className="blue-text" htmlFor="Main_Content">Other Works:&nbsp;</h5>
                    <textarea class="form-control input-main-issue" name="Other" value={reports.Other}/>
                  </div>
                  <div class="form-group" style={{paddingBottom:"20px"}}>
                    <h5 class="modal-title" className="blue-text" htmlFor="Main_Content">Today Deposit Amount:&nbsp;</h5>
                    <input type="text" class="form-control" name="Deposit_Amount" value={reports.Deposit_Amount} />
                  </div> 
                  <div class="form-group">
                    <h5 class="modal-title" className="blue-text" htmlFor="Main_Content">Issue to Raise:&nbsp;</h5>
                    <textarea class="form-control input-main-issue" name="Issue_to_Raise" value={reports.Issue_to_Raise}/>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <Button type="button" class="btn btn-secondary" data-dismiss="modal">Close</Button>
                  </div>
                </div>
              </div>
            </div>          
      ));    
      return (
          <div>
            <div><Navbar /></div>
            <div><Topbar /></div>
            <div>
            <div className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed toolbar-tablet-and-mobile-fixed aside-enabled aside-fixed wrapper d-flex flex-column flex-row-fluid">
		          <div className="content d-flex flex-column flex-column-fluid">
                <div className="toolbar"  style={{height:"55px", paddingLeft:"30px"}}>
                  <div className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                    <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">User Management </h1>
                    <span class="h-20px border-gray-200 border-start mx-4"></span>
                  </div>
                  <div style={{display:"flex"}}>
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
                    {this.state.showPerson && 
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
                    {this.state.showPerson && <span> &nbsp;&nbsp;&nbsp; From: &nbsp;</span>}
                      <DatePicker style={{height:"100px !important"}} id="sDate" selected={this.state.startDate} onChange={this.onStartDateChange} dateFormat="yyyy-MM-dd" />
                    </div>  
                    {this.state.showPerson && <div>
                      <span> &nbsp;&nbsp;&nbsp; To: &nbsp;</span>
                      <DatePicker id="eDate" selected={this.state.endDate} onChange={this.onEndDateChange}  dateFormat="yyyy-MM-dd" className = "m-l-10"/>
                    </div> }           
                    {this.state.showAddButton && <div className="m-l-10" style={{position:"absolute", right:"30px"}}><Link to='/create'><Button color="primary">Add</Button></Link></div>}
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
                      <th width="50px" class="w-10px pe-2 sorting_disabled"><input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" /></th>
                      <th width="15%" class="w-10px pe-2 sorting_disabled">Name</th>
                      <th width="30%" class="w-10px pe-2 sorting_disabled">Email</th>
                      <th width="300px" class="w-10px pe-2 sorting_disabled">Password</th>
                      <th width="300px" class="w-10px pe-2 sorting_disabled">RegDate</th>    
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
export default Dashboard;
