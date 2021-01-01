import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function Todos() {  

  const [todos, setTodos] = useState(null);  

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetch('http://localhost:4000');
      const data = await items.json();   
      setTodos(data);
    };

    fetchItems();      
  }, []);

  /// update to DB
  const postData = async (data, url, id) => {    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    // update the local data
    const index = todos.findIndex((ele) => ele._id === id);    
    if (index >= 0) {
      let newTodos = [...todos];
      newTodos[index] = data;
      setTodos(newTodos);
      
    }
    return await response.json();
  };

  const onUpdate = (data, id) => {     
    const url = `http://localhost:4000/${id}`;
    // Send the data to server    
    postData(data, url, id);     
  };

  const onComplete = (data, id) => {    
    const url = `http://localhost:4000/${id}`;
    // Find the to do with id and mark it as complete
    postData(data, url, id);  
  };

  const removeItem = async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  };

  const onRemove = (id) => {
    const url = `http://localhost:4000/${id}`;
    // Find the to do with id and remove it from the list
    removeItem(url);
    const index = todos.findIndex((ele) => ele._id === id);     
    if (index >= 0) {
      let newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  return (
    <div>
      <h1>Todo Items</h1>
        <div>
          { todos?.map((item, index) => (
            <Todo key={index} title={item.title} completed={item.completed} id={item._id} 
              onUpdate={onUpdate} onComplete={onComplete} onRemove={onRemove} />)
            )
          }
        </div>
    </div>
  )
}

export default Todos;
