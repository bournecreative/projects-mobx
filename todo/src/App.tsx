import React from 'react'
import {Todo} from "./Todo"
import { myTodos } from './todoStore';

function App() {
  return (
    <Todo todoStore={myTodos}/>
  );
}

export default App;
