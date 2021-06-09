import TodoItem from "./TodoItem"
import React from "react"
import { Link } from "react-router-dom"
import API_URL from "../Constants";

class TodoList extends React.Component {
    state = {
        items:[],
    }

    processData = (item)=>{
        let {id, title, desc: description, is_completed: isCompleted, due_date: dueDate} = item;
        return {id, title, description, isCompleted, dueDate};
    }

    componentDidMount(){
        fetch(API_URL)
        .then(res => res.json())
        .then(jsonData => this.setState({items: jsonData.map(this.processData)}));
    }

    componentWillUnmount(){
        console.log("unmount called");
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

    render() {
        return (  
            <React.Fragment>
                <Link to="/create-todo-item" className="btn btn-primary" style={{marginLeft:30, marginTop:10}}>Create new</Link>
                <ul>
                    {this.state.items.map((todoItem)=>{
                        return <li key={todoItem.id} style={{listStyle:"none"}}><TodoItem item={todoItem} onDelete={this.onDelete}/></li>
                    })}
                </ul>

            </React.Fragment>
        );
    }
}
 
export default TodoList;