import Todo from './components/Todo';
import Auth from './components/Auth/Auth';
import React from 'react';
import Tic from './components/Tictactoe';
import './App.css';
import LoginRequired from './RouteRequiredLogin';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Home from './Home';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import LoginForm from './components/Auth/LoginForm';
import LogoutForm from './components/Auth/LogoutForm';


 

  function MyNavbar() {
    const authed = localStorage.getItem('username') && localStorage.getItem('username') !== 'undefined' && localStorage.getItem('token') && localStorage.getItem('token') !=='undefined';

    let login=null;
    
         return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">React Django App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
    
                        <Nav.Link href="/todo">Todo</Nav.Link>
                        <Nav.Link href="/Tic-Tac-Toe">Tic</Nav.Link>
                        <Nav.Link href="/auth">Accounts</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
        </Navbar>
        );





    
    
 
  };

export default class App extends React.Component{

    render(){
         const authed = localStorage.getItem('username') && localStorage.getItem('username') !== 'undefined' && localStorage.getItem('token') && localStorage.getItem('token') !=='undefined';
         console.log(authed);
        return (
            
            <div>

                
                <BrowserRouter> 
                <MyNavbar/>
                
                <div> 
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <LoginRequired exact path = "/todo"  component ={Todo}/>
                        <Route exact path = "/Tic-Tac-Toe" component = {Tic}/>
                        <Route exact path="/auth" component ={Auth} />
       
                    </Switch>
                </div>
                </BrowserRouter>
            </div>
            
        );
    }

}