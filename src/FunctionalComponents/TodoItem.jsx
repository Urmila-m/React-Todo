import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from "react-router-dom";

function TodoItem(props) {
    const [redirectUrl, updateRedirectUrl] = useState("");
    const [item] = useState({...props.item});

    const hasDueDateExceed = ()=>{
        let currentDate = new Date().getTime();
        let dueDate = Date.parse(item.dueDate);

        if (currentDate> dueDate){
            return true;
        }
        else{
            return false;
        }

    }

    const handleEdit = ()=>{
        let redirectRoute = "/edit-todo-item/" + item.id;
        updateRedirectUrl(redirectRoute);
    }

     const getTitleElem = ()=>{
        if(item.isCompleted){
            return (
                <del>
                    <h6>{item.title}</h6>
                </del>
            );
        }
        else{
            if(hasDueDateExceed()){
                return (
                    <h6 style={{color: "red"}}>{item.title}(Past Due Date!)</h6>
                );
            }
            return (
                <h6 style={{color: "black"}}>{item.title}</h6>
            );
        }
    }

    if(redirectUrl){
        return <Redirect to={redirectUrl}/>
    }
    else{
        return ( 
            <div style={{ "marginTop":"10px"}}>
                <div  className="card">
                    <div className="card-body">
                        <div className="card-title" style={{"display": "flex"}}>
                            {getTitleElem()}
                            <input style={{"marginLeft": "auto"}} type="checkbox" defaultChecked={item.isCompleted}/>
                        </div>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text">Due Date: {item.dueDate}</p>
                        
                        <div style={{display: "flex"}}> 
                            <button className="btn btn-primary" style={{margin:5}} onClick={handleEdit}>Edit</button>
                            <button className="btn btn-danger"style={{margin:5}} onClick={e => {props.onDelete(e, item.id)}}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default TodoItem;