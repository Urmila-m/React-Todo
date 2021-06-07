import TodoItem from "./TodoItem"
import React from "react"
import { Link, Redirect } from "react-router-dom"
import API_URL from "../Constants";

class TodoList extends React.Component {
    state = {
        items:[],
        redirect: false
    }

    componentDidMount(){
        fetch(API_URL)
        .then(res => res.json())
        .then(jsonData =>{
                let state = { items: []}
                jsonData.forEach(element => {
                    let {id, title, desc: description, is_completed: isCompleted, due_date: dueDate} = element;
                    state.items.push({id, title, description, isCompleted, dueDate})
                });
                this.setState(state);
            }
        );
    }
    
    componentWillUnmount(){
        console.log("unmount called");
    }

    onEdit = (e, id)=>{
        let redirectRoute = "/edit-todo-item/" + id;
        this.setState({redirect: redirectRoute});
    }

    onDelete = (e, id)=>{
        fetch(API_URL+id+"/",
        {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => {
            // delete successful
            if(res.status === 204){
                let items = this.state.items
                let deletedItemIndex = items.indexOf(items.find(item => item.id === id));
                items.splice(deletedItemIndex, 1);
                this.setState(items);
            }
            else{
                console.log("Something went wrong!")
            }
        })
    }

    isRedirect = ()=>{
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
    }

    render() { 
        return (  
            <React.Fragment>
                {this.isRedirect()}
                <Link to="/create-todo-item" className="btn btn-primary" style={{"marginLeft":30, "marginTop":10}}>Create new</Link>
                <ul>
                    {this.state.items.map((todoItem)=>{
                        return <li key={todoItem.id} style={{"listStyle":"none"}}><TodoItem item={todoItem} onEdit={this.onEdit} onDelete={this.onDelete}/></li>
                    })}
                </ul>
            </React.Fragment>
        );
    }
}
 
export default TodoList;