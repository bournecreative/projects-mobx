import React, {useState} from 'react';
import {todoStore} from './todoStore'
import {observer} from 'mobx-react';

interface todoListProps{
    todoStore: todoStore
}

export const Todo: React.FC<todoListProps> = observer(({todoStore})=> {
    const [task, setTask] = useState<string>('')

    return (
        <div>
            <input onChange={(e)=>setTask(e.target.value)} value={task}type="text"/>
            <button onClick={()=>{
                if (task === ""){
                    return
                }
                setTask("")
                todoStore.addTodo(task)}}>Add Todo</button>
                <h3>Tasks Completed {todoStore.status.completed} of {todoStore.status.completed+todoStore.status.remaining}</h3>
            <ul>
                {todoStore.todos.map((item) =>{
                    return <li onClick={()=>todoStore.toggleTodo(item.id)}>{item.title} | [{item.completed ? 'complete' : 'open'}]</li>
                })}
            </ul>
        </div>
    )
})
