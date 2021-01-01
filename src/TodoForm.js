import React, { useState } from 'react';

function TodoForm() {
  const [todo, setTodo] = useState("");   

  const onSubmitNew = (e) => {
    const postData = async (data) => {
      const url = 'http://localhost:4000/addTodo';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return response.json();
    };


    e.preventDefault();    
    if (todo && todo !== "") {
      // Send the data to server
      const data = {
        title: todo,
        completed: false
      };
      postData(data);      
      // Clear the current todo text in the input field
      setTodo("");
    } else {
      alert("Todo should not be empty");
    }    
  };

  return (
    <form onSubmit={onSubmitNew}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Something Important..." value={todo} onChange={(e) => setTodo(e.target.value)} />
        <div className="input-group-append">
          <button className="btn btn-success" type="submit">Add New Todo</button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm;
