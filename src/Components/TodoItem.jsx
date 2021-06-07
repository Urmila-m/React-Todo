import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

class TodoItem extends React.Component {
    state = {}

    titleColorStyle = {}

    hasDueDateExceed(){
        let currentDate = new Date().getTime();
        let dueDate = Date.parse(this.state.dueDate);

        if (currentDate> dueDate){
            this.titleColorStyle.color = "red";
        }
        else{
            this.titleColorStyle.color = "black"
        }

    }

    constructor(props){
        super(props);
        this.state = props.item;
        this.hasDueDateExceed();
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
            if(this.titleColorStyle.color === 'red'){
                return (
                    <h6 style={this.titleColorStyle}>{this.state.title}(Past Due Date!)</h6>
                );
            }
            return (
                <h6 style={this.titleColorStyle}>{this.state.title}</h6>
            );
        }
    }

    render() { 
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
                            <button className="btn btn-primary" style={{margin:5}} onClick={e => {this.props.onEdit(e, this.state.id)}}>Edit</button>
                            <button className="btn btn-danger"style={{margin:5}} onClick={e => {this.props.onDelete(e, this.state.id)}}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default TodoItem;