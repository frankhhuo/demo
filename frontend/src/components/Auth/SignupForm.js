import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    handle_change = e=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate=>{
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    render(){
        return (
            <form onSubmit = {(e)=>this.props.handle_signup(e,this.state)}>
                <h4> Sign Up</h4>
                <label htmlFor="username"> Username </label>
                <input 
                    type="text"
                    name="username"
                    value={this.state.usernme}
                    onChange = {this.handle_change}
                />
                <label htmlFor='password'>Password</label>
                <input 
                    type='password'
                    name='password'
                    value={this.props.password}
                    onChange={this.handle_change}
                />
                <input type='submit'/>
            </form>
        );
    }

}
export default SignupForm;

SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
};