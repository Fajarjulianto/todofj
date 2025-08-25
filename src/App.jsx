import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

// Komponen untuk satu item To-Do
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg shadow-md transition-all duration-300 hover:bg-slate-700">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="form-checkbox h-5 w-5 rounded text-violet-500 bg-slate-700 border-slate-600 focus:ring-violet-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-lg ${
          todo.completed ? "line-through text-slate-500" : "text-slate-100"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-slate-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
        aria-label="Delete todo"
      >
        {/* Perubahan: Gunakan komponen FaTrashAlt */}
        <FaTrashAlt size={18} />
      </button>
    </li>
  );
}

// Komponen utama aplikasi
function App() {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const trimmedText = newTodoText.trim();
    if (trimmedText) {
      const newTodo = { id: Date.now(), text: trimmedText, completed: false };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-violet-400">
            TodoFJ
          </h1>
          <p className="text-slate-400 mt-2">A simple and modern to-do list.</p>
        </header>

        <main>
          <form onSubmit={addTodo} className="flex gap-3 mb-8">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow p-3 bg-slate-800 rounded-lg border-2 border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="flex-shrink-0 flex items-center gap-2 bg-violet-600 font-semibold px-5 py-3 rounded-lg hover:bg-violet-700 transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
              disabled={!newTodoText.trim()}
            >
              <FaPlus size={16} />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-4">
            {todos.length > 0 ? (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 px-4 bg-slate-800 rounded-lg">
                <p className="text-slate-400">
                  🎉 You&apos;re all caught up! 🎉
                </p>
                <p className="text-slate-500 text-sm">
                  Add a new task to get started.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
TodoItem.propTypes = {
  // 'todo' harus berupa objek (shape) dengan struktur tertentu
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired, // id harus angka dan wajib ada
    text: PropTypes.string.isRequired, // text harus string dan wajib ada
    completed: PropTypes.bool.isRequired, // completed harus boolean dan wajib ada
  }).isRequired, // Objek 'todo' itu sendiri juga wajib ada

  // Validasi untuk props lainnya juga
  onToggle: PropTypes.func.isRequired, // onToggle harus fungsi dan wajib ada
  onDelete: PropTypes.func.isRequired, // onDelete harus fungsi dan wajib ada
};

export default App;
