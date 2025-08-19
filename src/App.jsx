import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import "./styles/style.css";

// 👇 import ToastContainer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TaskTable />} />
          <Route path="/create" element={<TaskForm />} />
        </Routes>

        {/* 👇 Toast container should be added only once */}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
