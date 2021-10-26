import React, {Component} from 'react';
//import Modal from "./components/Modal";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Nav from './Nav';
import './Auth.css';
//import axios from "axios";


class Auth extends Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('token'));
    this.state = {
        displayed_form: '',
        logged_in: localStorage.getItem('token') !=='undefined' && localStorage.getItem('token')?true:false,
        username:localStorage.getItem('username')
      };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (this.state.logged_in){

      fetch(
        `https://127.0.0.1:8000/user/users/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Bearer ${token}`,
            }
        }
      ).then(res=>res.json())
        .then(json=>{console.log(json, json.username,this.state); 
          this.setState({username:json.username});
   
        });
    }
  }

  handle_login = (e, data)=>{
    e.preventDefault();
    fetch('https://127.0.0.1:8000/api/token/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res=>res.json())
      .then(json=>{
        localStorage.setItem('token',json.access);
        localStorage.setItem('username',data.username);
        const token = json.access;

        
        

        this.setState({
          logged_in:true,
          display_form:'',
          username:data.username
        });

      });
  };

  handle_signup=(e,data)=>{
    e.preventDefault();
    fetch('https://127.0.0.1:8000/user/users/',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res=>res.json())
      .then(json=>{
        localStorage.setItem('token',json.token);
        this.setState({
          logged_in: true,
          displayed_form:'',
          username:json.username
        });
      });
  };

  handle_logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username')
    this.setState({
      logged_in: false, 
      username:''
    });
  };

  display_form=form=>{
    this.setState({
      displayed_form: form
    });
  };

  render(){
    let form;
    console.log(this.state.displayed_form);
    switch(this.state.displayed_form){
      case 'login':
        form = <LoginForm logged_in={this.state.logged_in} handle_login={this.handle_login}/>;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form=null;
    }
    console.log(this.state.logged_in, this.state.username,'username')
    return (
      <div className="accounts">
        <Nav 
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in? "Hello,"+ this.state.username : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

  
export default Auth;

  


