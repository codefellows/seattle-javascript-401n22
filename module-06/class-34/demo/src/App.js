import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth.jsx';
import Login from './auth/Login.jsx';
import axios from 'axios';
import './app.css'

import LoginContext from './auth/context.jsx';

function App() {

  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const getTodoItems = async function() {
    let url = `${process.env.REACT_APP_API}/api/v1/todo`
    const response = await axios.get(url);
    setItems( response.data.results)
  }

  const handleAddItem = async (e) => {
    e.preventDefault();
    let todoItem = {
      text: text,
      difficulty: 3,
      assignee: "John",
      complete: false,
    }
    const url = `${process.env.REACT_APP_API}/api/v1/todo`;

    try {
    const response = await axios.post(url, todoItem)
    setItems( [...items, response.data]);
    } catch (e) {
      console.error( e.message)
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect( () => {
    getTodoItems();
  }, [])

  return (
    <LoginContext>
      <header>
        <Login />
      </header>



      <section>
        <div>All Users can see this</div>

        <Auth>
          <ul>
            {
              items.map(item =>
                <li key={item._Id}>{item.text}</li>
              )
            }
          </ul>
        </Auth>

        <Auth capability="create">
            <form onSubmit={handleAddItem}>
              <input name="text" placeholder="Add Item" onChange={handleChange} />
            </form>
        </Auth>


        <Auth capability="update">
          <div>If you are logged in and have "update" permissions, you can see this</div>
        </Auth>

        <Auth capability="delete">
          <div>If you are logged in and have "delete" permissions, you can see this</div>
        </Auth>
      </section>
    </LoginContext>
  );
}

export default App;
