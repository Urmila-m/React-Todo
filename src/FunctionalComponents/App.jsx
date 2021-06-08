import React from "react";
import TodoItemForm from "./TodoItemForm";
import TodoList from "./TodoList";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

function App(){
    return ( 
        <Router>
            <Switch>
                <Route path="/home">
                    <TodoList/>
                </Route>
                <Route path="/create-todo-item">
                    <TodoItemForm/>
                </Route>
                <Route path="/edit-todo-item/:id" render={(props) => <TodoItemForm id={props.match.params.id}/>}/>
            </Switch>
        </Router>
    );
}
 
export default App;