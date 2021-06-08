import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Redirect} from "react-router-dom"
import API_URL from "../Constants"

function TodoItemForm(props){
    const [redirectUrl, updateRedirectUrl] = useState("");
    const [item, updateItem] = useState(
        {
            title: "", 
            description: "",
            isCompleted: false,
            dueDate: "",
            id: 0
        });

    const processData = (item)=>{
        let {id, title, desc: description, is_completed: isCompleted, due_date: dueDate} = item;
        return {id, title, description, isCompleted, dueDate};
    }

    useEffect(()=>{
        if(props.id){
            fetch(API_URL+props.id)
            .then(res=> res.json()) //res is promise object with headers, status code, ... 
            .then(jsonData => updateItem(processData(jsonData))) 
            .catch(err => console.log(err))
        }
    }, [props.id]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        let apiUrl = API_URL;
        let method = "POST";
        if(item.id){
            apiUrl += item.id+"/";
            method = "PUT";
        }

        fetch(apiUrl,
        {
            "method": method,
            "body": JSON.stringify(item),
            "headers": {"Content-type": "application/json; charset=UTF-8"}
        }).then(res => res.json())
        .then(jsonData => redirectToHome())
        .catch(err => console.log(err));
    }

    const handleChange = (e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.type === "checkbox"? target.checked: target.value;

        // keep other key-value as is, just update the changed one
        updateItem({...item, [name]: value});

    }

    const redirectToHome = ()=>{
        updateRedirectUrl("/home");
    }

    const getTitle = ()=>{
        if(item.id){
            return "Edit Todo Item";
        }
        else{
            return "Create Todo Item";
        }
    }

    if(redirectUrl){
        return <Redirect to={redirectUrl}/>
    }
    else{
        let {title, description, isCompleted, dueDate} = item;
        return ( 
            <React.Fragment>
                <h3>{getTitle()}</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" value={title} name="title" className="form-control" id="title" placeholder="Enter title" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea id="desc" name="description" value={description} className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" name="dueDate" value={dueDate} className="form-control" id="dueDate" onChange={handleChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" checked={isCompleted} name="isCompleted" className="form-check-input" id="completed" onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="completed">Completed</label>
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default TodoItemForm;