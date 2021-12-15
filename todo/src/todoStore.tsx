import { makeObservable, observable, action, computed } from 'mobx';

interface todoItem {
    id:number;
    title: string;
    completed: boolean;
}

export class todoStore {
    constructor(){
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            toggleTodo: action,
            status: computed
        })
    }

    todos:todoItem[] = []

    addTodo(title:string) {
        const item: todoItem = {
            id: +Math.random().toFixed(4),
            title,
            completed: false
        }
        this.todos.push(item)
    }

    toggleTodo(id:number) {
        const index = this.todos.findIndex(item => item.id === id)
        if (index > -1) { //if the index is a valid index then do something
            this.todos[index].completed = !this.todos[index].completed
        }
    }

    get status() {
        let completed = 0, remaining = 0
        this.todos.forEach((todo)=>{
            if (todo.completed){
                completed++
            }else {
                remaining++
            }
        })
        return {completed,remaining}
    }
}

// create a single instance | singleton
export const myTodos = new todoStore()