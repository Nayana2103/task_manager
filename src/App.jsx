import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import "./styles/style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskTable />} />
        <Route path="/create" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
