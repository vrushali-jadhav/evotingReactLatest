import React, { Component } from "react";
import axios from 'axios';
import renderHTML from 'react-render-html';
import { Link, Redirect } from 'react-router-dom';
import UserStorage from "./stores/UserStorage";
import './Register.css';
import swal from "sweetalert2";
import './takephoto.css';

class TakePhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: UserStorage.username      
          }
        this.captureImage = this.captureImage.bind(this);
    }
    async captureImage() {
        console.log('in capture image ')
        // if (!this.state.username)
        // return;

        try{
        console.log('in capture image ');
        
        var data = {}
        data.username= this.state.username
        const response = await axios.post('http://localhost:5000/api/predict',data)

        console.log(" response.data" + response)
        console.log(" response.data" + JSON.stringify(response.data))

        let result = response.data.success;

            if (result) {
                console.log("image verification success");
                swal.fire({
                    icon: 'success',
                    title: 'Congrats!! Image Taken!',
                    text: 'You have successfully verified yourself',
                    confirmButtonText: "OK"
                });

                this.props.history.push("/welcome");
            }else{
                console.log("image verification failed");
                swal.fire({
                    icon: 'error',
                    title: 'Image Verification Failed!',
                    text: 'You have failed image verification Try again',
                    confirmButtonText: "OK"
                });
                this.props.history.push("/Login");
            }
        }
        catch(e){}
    }


    render() {
      return (
       
 <div className ="container">
        <div className= "header">
                <ul className="navbar-nav" id="navg">
                    <li className="nav-item">
                    <Link to="/RegisterInfo" className="nav-link reg" id="log"> Register
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/Login" className="nav-link" id="log"> Login
                    </Link>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link active" id="hom" >Home</a>
                    </li> */}
                    <li className="nav-item">
                        <a className=" brand">Electronic</a>
                    </li>
                    <li className="nav-item">
                        <a className=" colorb">Ballot</a>
                    </li>
                </ul>
        </div>
        <div className="row">
            <div className="pitchline" id="pitch">
                <div id="Main">Online election perfection!</div>
                <div id="about">Our E-Voting solution is here for you.</div>
            </div>
        </div> 

        <div className="row">
            <div className="information" >
                <div className="registerimagever col-md-6"></div>
                <div className="qoutetakephoto">
                    <div className ="h3" className="since-title"> Helping People Connect
                        <br></br>Since 2020
                        <p>Security & Trust</p>
                    </div>
            </div>
            </div>
            <div className="canvasphoto" id="canvas" >
                    <div>Photo:</div>
                    <video className="videoclass" id="videoForImage" autoPlay width="250px" height="200px"></video>
                    <div></div>
                    <button className="btn" id="capture" onClick={this.captureImage}>Capture</button>
            </div>
    </div>
 </div>
      );
    }
  }
  //Export The Main Component
  export default TakePhoto;
  