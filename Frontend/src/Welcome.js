import React, { Component } from "react";
import renderHTML from 'react-render-html';
import inputFields from './inputFields';
import SubmitButton from './submitButton';
import UserStorage from './stores/UserStorage';
import { Link, Redirect } from 'react-router-dom';
import Register from './Register';
import './App.css';
import InputFields from './inputFields';

class Welcome extends Component {
    constructor(props){
        super(props);
        this.state={
            username : '',
            password : '',
            buttonDisabled : false
        }}

doLogout(){
    UserStorage.username='';
    this.props.history.push("/Login");
}
render() {

    if (UserStorage.username !== null) {
       console.log ("username "+ UserStorage.username);
    }
    return (
     
<div className ="container">
<div className= "header">
<div className="navigationclass row">
        <ul className="navbar-nav" id="navg">
            <li className="nav-item">
            <Link to="/RegisterInfo" className="nav-link register" id="reg" >Register
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/Login"className="nav-link" id="log" >Login
            </Link>
            </li>
            <li className="nav-item">
                <a className="nav-link active" id="hom" >Home</a>
            </li>
            <li className="nav-item">
                <a className="brand">Electronic</a>
            </li>
            <li className="nav-item">
                <a className="colorb">Ballot</a>
            </li>
        </ul>
    </div>
   
</div>
<div className="nav-item" className="nav-link active" id="hom">
Welcome {UserStorage.username}
</div>
                <SubmitButton
                    text = {'Log Out'}
                     disabled = {false} onClick={()=> this.doLogout()} />

</div>
      );
    }
  }
  //Export The Main Component
  export default Welcome;