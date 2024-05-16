import './TodoList.css'
import { useEffect, useState } from 'react';

function TodoList ()  {
    const [todos, setTodoList] = useState(() => {
        const storedTodos = localStorage.getItem('todos')
        return storedTodos ? JSON.parse(storedTodos) : []
    })

    const [newTodo, setNewTodo] = useState('')
    const [completedTodos, setCompletedTodos] = useState([]);
    const [uncompletedTodos, setUncompletedTodos] = useState([]);
    const newTodoItem = { text: newTodo, completed: false };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodoList(prevTodos => [...prevTodos, newTodoItem])
            setUncompletedTodos(prevUncompletedTodos => [...prevUncompletedTodos, newTodoItem])
        }
    }

    const handleCompleted = (index) => {
        const updatedTodos = [...todos ]
        updatedTodos[index].completed = !updatedTodos [index].completed
        setTodoList(updatedTodos)
        if(updatedTodos[index].completed) {
            const completedTodo = updatedTodos.splice(index,1)[0]
            setUncompletedTodos(updatedTodos)
            setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, completedTodo])
        } else {
            const uncompletedTodo = updatedTodos.splice(index, 1)[0]
            setUncompletedTodos(updatedTodos)
            setUncompletedTodos(prevUncompletedTodos => [...prevUncompletedTodos, uncompletedTodo])
        }
    }

    const handleDelete = (index, isCompleted) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodoList(updatedTodos);
        if (isCompleted) {
            setCompletedTodos(prevCompletedTodos =>
                prevCompletedTodos.filter((_, i) => i !== index)
            );
        } else {
            setUncompletedTodos(prevUncompletedTodos =>
                prevUncompletedTodos.filter((_, i) => i !== index)
            );
        }
    };
    

    return (
        <>
        <div className='todo-list-container'>
            <div className='add-todo'>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <div className='todos'>
            <div className='completed-list bg-slate-500 mb-3 border-spacing-2'>
                    <h3>Completed</h3>
                    <ul>
                        {completedTodos.map((todo, index) => (
                            <li key={index}>
                                <span>{todo.text}</span>
                                <button onClick={() => handleDelete(index, true)}>❌</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='uncompleted-list bg-neutral-400'>
                    <h3>Uncompleted</h3>
                    <ul>
                        {uncompletedTodos.map((todo, index) => (
                            <li key={index}>
                                <span>{todo.text}</span>
                                <button onClick={() => handleCompleted(index)}>✅</button>
                                <button onClick={() => handleDelete(index, false)}>❌</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}

export default TodoList