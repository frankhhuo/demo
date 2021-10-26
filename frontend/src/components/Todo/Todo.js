import React, { Component } from 'react';
import './Todo.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Modal from './Modal';


export default class Todo extends Component{

  constructor(props){
    super(props);
    this.state={
      viewCompleted:false,
      todoList:[],
      modal:false,
      activeitem:{
        title:'',
        desc:'',
        completed: false,
        last_modified_on:''
      },
    };

  }
  get_token = ()=>{
    let token = localStorage.getItem('token');
    if (token === null) {
      console.log("No credentials found, redirecting...");
      window.location = "/login";
      return [];
    }
     token = localStorage.getItem('token');
    return token;
  }

  refreshList = ()=>{
    const token = this.get_token();

    fetch(
      `https://127.0.0.1:8000/api/todos/`,
      {
          method: 'GET',
          headers: {
              'Content-Type': 'Application/JSON',
              'Authorization': `Bearer ${token}`,
          }
      }
    ).then( (res)=>res.json())
    .then( (json)=> {  this.setState({todoList:json})} )
    .catch((err)=>console.log(err));
    
  };

  componentDidMount(){
    this.refreshList();
  }

  toggle = ()=>{
    this.setState({modal:!this.state.modal})
  };
  handleDelete = (item)=>{
    const token = localStorage.getItem('token');
    if (item.id){ // updating a exist post

      fetch(
        `https://127.0.0.1:8000/api/todos/${item.id}/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Bearer ${token}`,
            }
        }
      ).then((res)=>this.refreshList()).catch((err)=>console.log(err));

      return 

    }
  }
  handleSubmit = (item)=>{
    this.toggle();
    const token = localStorage.getItem('token');
 

    if (item.id){ // updating a exist post

      console.log(item);
      fetch(
        `https://127.0.0.1:8000/api/todos/${item.id}/`,
        {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Bearer ${token}`,
            }
        }
      ).then((res)=>{ if(!res.ok){ alert('The item was changed outside this session, please try again!')}; this.refreshList();}).catch((err)=>console.log(err));

      return 

    }
    // creat new
    fetch(
      `https://127.0.0.1:8000/api/todos/`,
      {
          method: 'POST',
          body: JSON.stringify(item),
          headers: {
              'Content-Type': 'Application/JSON',
              'Authorization': `Bearer ${token}`,
          }
      }
    ).then((res)=>this.refreshList()).catch((err)=>console.log(err));
  };

  createItem=()=>{
    const item = {'title':'', desc:'', completed:false};
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  editItem = (item)=>{
    this.setState({activeItem:item, modal:!this.state.modal});
  };

  displayCompleted = (status)=>{
    if(status){
      return this.setState({viewCompleted:true});
    }
    return this.setState({viewCompleted:false});
  };

  renderTabList = ()=>{
    return (
      <div className = "nav nav-tabs">
        <span 
          onClick = {()=>this.displayCompleted(true)}
          className = {this.state.viewCompleted? 'nav-link active':'nav-link'}
        > 
          Complete  
        </span>
        <span
          onClick = {()=>this.displayCompleted(false)}
          className = {this.state.viewCompleted? 'nav-link':'nav-link active'}
        >
          Incomplete
        </span>
      </div>
    )
  }

renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );
 

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={ item.title }
        >
          {item.title}
        </span>
        <span
          className={`todo-desc mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={ item.desc }
        >
          {item.desc}
        </span>


        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}

          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}


