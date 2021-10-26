import React from 'react';
import PropTypes from 'prop-types';

class LogoutForm extends React.Component{
    constructor(props){
        super(props);

        console.log(this.props.handle_change,this.props.handle_login);
    }
    

    handle_logout = e=>{
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        console.log('dd');
        window.location = "/";

    };

    
    render(){
 
        return (
            <form onSubmit = { e=> this.handle_logout(e)}>
                <h4> Logout </h4>
                <div> Are you sure you want to logout?</div>
                <input type="submit"/>
            </form>
        );
    }
}

export default LogoutForm;
 