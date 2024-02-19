import { useState, useEffect, useRef } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const todoText = useRef();

  useEffect (() => {
    if (typeof window !== 'undefined') {
      const existingTodos = localStorage.getItem( 'todos');
      setTodos (existingTodos ? JSON. parse(existingTodos) : []);
    }
  }, [])
  
  useEffect (() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem( 'todos', JSON. stringify( todos) );
    }
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const trimmedText = todoText.current.value.trim(); // Remove leading/trailing spaces
    if (trimmedText) {
      const next = [...todos, { text: trimmedText, completed: false }];
      setTodos(next);
      todoText.current.value = ""; // Clear the input field
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-slate-800">
    <div className="h-screen flex justify-end items-center flex-col bg-slate-800 overflow-hidden mx-3">
      
          {todos.map((todo, index) => (
            <div key={index} className="flex w-full  justify-between text-white py-3 px-4 mb-1 bg-slate-700 items-center mx-10">
              <div className="flex justify-center items-center md:flex">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                      className="mr-2"
                    />
              </div>
              <div className="flex justify-center items-center w-full mx-5 md:flex">
                  <p className={`text-white text-3xl flex justify-center items-center ${
                      todo.completed ? "line-through" : ""
                    }`}>{todo.text}</p>
              </div>
              <div className="flex justify-center items-center md:flex">
                        <img 
                      onClick={() => deleteTodo(index)}
                      className="float-right"
                      src="./trash.svg"/>
              </div>
            </div>
          ))}
      
      <form
        className="flex mt-5 rounded-md bg-slate-600 w-full h-[60px] mb-5 mx-10"
        onSubmit={addTodo}
        >
        <input
          className="p-3 bg-slate-600 focus:outline-none text-white flex-grow"
          type="text"
          placeholder="Add Todo..."
          ref={todoText}
        />
        <input
          className="p-3 bg-slate-700 cursor-pointer text-bold text-white ml-3"
          type="submit"
          value="Add Todo"
        />
      </form>
      </div>
      </div>
  );
}

export default App;
