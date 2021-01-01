import React, { useState, useEffect } from 'react';

function Todo({id, title, completed, onUpdate, onComplete, onRemove}) {

  const [todo, setTodo] = useState("");  

  useEffect(() => {
    setTodo(title);
  }, [title]);

  const onUpdateTodo = () => {    
    if (todo && todo !== "") {
      // Send the data to server
      const data = {
        title: todo,
        completed: completed
      };      
      onUpdate(data, id);            
    }
  };


  const onCompleteTodo = () => {
    // Find the to do with id and mark it as complete
    if (todo && todo !== "") {
      // Send the data to server
      const data = {
        title: todo,
        completed: true
      };
      completed = true;
      onComplete(data, id);                  
    }
  };

  const onRemoveTodo = () => {
    onRemove (id);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Something clever.." value={todo} disabled={completed} onChange={(e) => {setTodo(e.target.value)}} />
        {
          !completed && (            
            <div className="input-group-append">
              <button className={completed ? "btn disabled" : "btn btn-info"} type="button" disabled={completed} onClick={onUpdateTodo}>Update</button>
              <button className={completed ? "btn btn-success disabled" : "btn btn-primary"} type="button" disabled={completed} onClick={onCompleteTodo}>Complete</button>
              <button className={completed ? "btn disabled" : "btn btn-danger"} type="button" disabled={completed} onClick={onRemoveTodo}>Remove</button>
            </div>
          )
        }        
      </div>
    </div>
  )
}

export default Todo;
