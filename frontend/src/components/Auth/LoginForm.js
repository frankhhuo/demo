import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state =  {
            username:'',
            password:''
        };
        console.log(this.props.handle_change,this.props.handle_login);
    }
    

    handle_change = e=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate =>{
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });

    };

    
    render(){
        if(this.props.logged_in){
            return null;
        }
        return (
            <form onSubmit = { e=> this.props.handle_login(e, this.state)}>
                <h4> Login </h4>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handle_change}
                />

                <label htmlFor="password">Password</label>
                <input
                    type = "password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                />
                <input type="submit"/>
            </form>
        );
    }
}

export default LoginForm;
LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
};