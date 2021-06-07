import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Redirect} from "react-router-dom"
import API_URL from "../Constants"

class TodoItemForm extends React.Component {
    state = { 
        redirect: false,
        title: "",
        desc: "",
        is_completed: false,
        due_date: ""
    }
    
    componentDidMount(){
        if(this.props.id){
            fetch(API_URL+this.props.id)
            .then(res=> res.json()) //res is promise object with headers, status code, ... 
            .then(jsonData => this.setState(jsonData)) //json response sent by the server
            .catch(err => console.log(err))
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("On handle submit", this.state);
        let {redirect, ...data} = this.state;

        let apiUrl = API_URL;
        let method = "POST";
        if(data.id){
            apiUrl += data.id+"/";
            method = "PUT";
        }

        fetch(apiUrl,
        {
            "method": method,
            "body": JSON.stringify(data),
            "headers": {"Content-type": "application/json; charset=UTF-8"}
        }).then(res => res.json())
        .then(jsonData => this.redirectToHome())
        .catch(err => console.log(err));
    }

    handleChange = (e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.type === "checkbox"? target.checked: target.value;
        let state = {
            [name]: value
        }
        this.setState(state);

    }

    redirectToHome = ()=>{
        this.setState({redirect: true})
    }

    getRedirectElem = ()=>{
        if(this.state.redirect){
            return <Redirect to="/home"/>
        }
    }

    getTitle(){
        if(this.state.id){
            return "Edit Todo Item";
        }
        else{
            return "Create Todo Item";
        }
    }

    render() { 
        let {title, desc, is_completed, due_date} = this.state;
        return ( 
            <React.Fragment>
                {this.getRedirectElem()}
                <h3>{this.getTitle()}</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" value={title} name="title" className="form-control" id="title" placeholder="Enter title" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea id="desc" name="desc" value={desc} className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" name="due_date" value={due_date} className="form-control" id="dueDate" onChange={this.handleChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" checked={is_completed} name="is_completed" className="form-check-input" id="completed" onChange={this.handleChange}/>
                        <label className="form-check-label" htmlFor="completed">Completed</label>
                    </div>
                    <button className="btn btn-primary" onClick={(e) => {this.handleSubmit(e, this.state)}}>Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default TodoItemForm;