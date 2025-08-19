import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TaskTable from "./components/TaskTable";

import "./styles/style.css";

// 👇 import ToastContainer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskTable />} />
        
      </Routes>
    </Router>
  );
}

export default App;