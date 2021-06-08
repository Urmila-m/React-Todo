import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from "react-router-dom";

class TodoItem extends React.Component {
    state = {
        redirect: false
    }

    hasDueDateExceed(){
        let currentDate = new Date().getTime();
        let dueDate = Date.parse(this.state.dueDate);

        if (currentDate> dueDate){
            return true;
        }
        else{
            return false;
        }

    }

    handleEdit = ()=>{
        let redirectRoute = "/edit-todo-item/" + this.state.id;
        this.setState({redirect: redirectRoute});
    }

    constructor(props){
        super(props);
        this.state = {...props.item};
    }

    getTitleElem(){
        if(this.state.isCompleted){
            return (
                <del>
                    <h6>{this.state.title}</h6>
                </del>
            );
        }
        else{
            if(this.hasDueDateExceed()){
                return (
                    <h6 style={{color: "red"}}>{this.state.title}(Past Due Date!)</h6>
                );
            }
            return (
                <h6 style={{color: "black"}}>{this.state.title}</h6>
            );
        }
    }

    render() { 
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
        else{
            return ( 
                <div style={{ "marginTop":"10px"}}>
                    <div  className="card">
                        <div className="card-body">
                            <div className="card-title" style={{"display": "flex"}}>
                                {this.getTitleElem()}
                                <input style={{"marginLeft": "auto"}} type="checkbox" defaultChecked={this.state.isCompleted}/>
                            </div>
                            <p className="card-text">{this.state.description}</p>
                            <p className="card-text">Due Date: {this.state.dueDate}</p>
                            
                            <div style={{display: "flex"}}> 
                                <button className="btn btn-primary" style={{margin:5}} onClick={this.handleEdit}>Edit</button>
                                <button className="btn btn-danger"style={{margin:5}} onClick={e => {this.props.onDelete(e, this.state.id)}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
 
export default TodoItem;