import React from 'react';
import Userstorage from './stores/UserStorage'
import './App.css';
import LoginFrom from './loginForm';
import Main from './Main';
import inputFields from './inputFields';
import SubmitButton from './submitButton';
import { BrowserRouter } from 'react-router-dom';
import {observer} from 'mobx-react'

class App extends React.Component {

  async componentDidMount(){
    try{
      let res = await fetch('http://localhost:3002/isLoggedIn',  {
        method: 'post',
        headers: {
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      });

      let result = await res.json();

      if(result && result.success){
        Userstorage.loading = false;
        Userstorage.isLoggedIn = true;
        Userstorage.username = result.username; 
      }
      else{
        Userstorage.loading = false;
        Userstorage.isLoggedIn = false;
      }
    }
    catch(e){
      Userstorage.loading = false;
      Userstorage.isLoggedIn = false;
    }
  }
  render() {
    if(Userstorage.loading){
      return ( 
            <div className="app">
                <div className = "container">
                    Loading. Please wait..
                </div>
            </div>
      );
    }
    else{
      // if(Userstorage.isLoggedIn){
      //   return ( 
      //     <div className="app">
      //         <div className = "container">
      //             Welcome {Userstorage.username}
      //             <SubmitButton>
      //               text = {'Log Out'}
      //               disabled = {false}
      //               onClick = {() => this.doLogout()}  
      //             </SubmitButton>
      //         </div>

      //     </div>
      //   );
      // }
      return (
        <BrowserRouter>
        
          <div className="app">
             {/* <div className = 'container'>  */}
              
              {/* <LoginFrom></LoginFrom> */}
            {/* </div>  */}
            <Main/>
          </div>
          </BrowserRouter>
      );
    }
  }
}

export default observer(App);
