import TodoItem from "./TodoItem"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API_URL from "../Constants";

function TodoList(){
    const [items, setItems] = useState([]);

    // equivalent to componentDidMount, mind 2nd parameter []
    useEffect(()=> {
        fetch(API_URL)
        .then(res => res.json())
        .then(jsonData => setItems(jsonData.map(processData)));

        // equivalent to componentWillUnmount
        return ()=>{
            console.log("unmount called");
        }
    }, []);

    const processData = (item)=>{
        let {id, title, desc: description, is_completed: isCompleted, due_date: dueDate} = item;
        return {id, title, description, isCompleted, dueDate};
    }

    const onDelete = (e, id)=>{
        fetch(API_URL+id+"/",
        {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => {
            // delete successful
            if(res.status === 204){
                let deletedItemIndex = items.indexOf(items.find(item => item.id === id));
                let remainingItems = [...items];
                remainingItems.splice(deletedItemIndex, 1);
                setItems(remainingItems);
            }
            else{
                console.log("Something went wrong!")
            }
        })
    }

    return (  
        <React.Fragment>
            <Link to="/create-todo-item" className="btn btn-primary" style={{marginLeft:30, marginTop:10}}>Create new</Link>
            <ul>
                {items.map((todoItem)=>{
                    return <li key={todoItem.id} style={{listStyle:"none"}}><TodoItem item={todoItem} onDelete={onDelete}/></li>
                })}
            </ul>

        </React.Fragment>
    );
}
 
export default TodoList;