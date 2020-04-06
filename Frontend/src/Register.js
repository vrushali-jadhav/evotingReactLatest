import React, { Component } from "react";
import renderHTML from 'react-render-html';
import { Link, Redirect } from 'react-router-dom';
import './Register.css';

class Register extends Component {
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

<div className="row registerimage">
    <div className="overlayingreg col-md-6">
        <div className="regimage " id="reg"> </div>
        <div className="qoute">
            <div className ="h3" className="since-title"> Help us help you
                    <br></br>
                    Security & Trust
            </div>
        </div>
        <div className="voterid">
            <input type="text" className= "voterclass" id="voterid_" placeholder="Please provide your voter ID" required>
            </input>
            <br></br>
            <Link to="/RegisterInfo">
            {/* <button className="sb" id="submit" onClick="location.href='registerInfo.html';">Submit</button> */}
            <button className="sb" id="submit" >Submit</button> 
            </Link>
        </div>
     </div>
</div>


<div className= "row">
    < div className ="reviews">

            <div className="reviewtitle">
                    <div className=" h3 titlemessage"> Straight from the horses mouth! </div>
                        <span></span>
                    <p>ElectronicBallot has been rated 4.8 out of 5 stars with 430000+ reviews</p>
            </div>
            <div className="col-md-4 customer">
                <div className="photoandstar">
                    <div className="custname">Vrushali</div>
                    <div className="custphoto1"></div>
                    <div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="review">
                    When nothing else worked, ElectronicBallot came to the rescue.
                </div>
            </div>
            <div className="col-md-4 customer">
                <div className="photoandstar">
                    <div className="custname">Nistha</div>
                    <div className="custphoto2"></div>
                    <div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="review">
                    Easy and hassle free.
                </div>
            </div>
            <div className="col-md-4 customer">
                <div className="photoandstar">
                    <div className="custname">Aditya</div>
                    <div className="custphoto3"></div>
                    <div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="review">
                    ElectronicBallot has reduced the voting time by 90%.
                </div>
            </div>
            </div>
    </div>

        </div>
      );
    }
  }
  //Export The Main Component
  export default Register;
  