import { HashRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
=======
import TaskTable from "./components/TaskTable";

>>>>>>> origin/nayana1
import "./styles/style.css";

function App() {
  return (
    <Router basename="/task_manager/dist">
      <Routes>
        <Route path="/" element={<TaskTable />} />
<<<<<<< HEAD
        <Route path="/create" element={<TaskForm />} />

       
        <Route path="/index.html" element={<Navigate to="/" replace />} />
=======
        
>>>>>>> origin/nayana1
      </Routes>
    </Router>
  );
}

export default App;
