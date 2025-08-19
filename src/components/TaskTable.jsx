import React, { useState, useEffect } from "react";
import "./TaskTable.css";
import { FaSort, FaCalendarAlt } from "react-icons/fa";
import TaskModal from "./TaskModal";

const TaskTable = () => {
  const [activeTab, setActiveTab] = useState("Open");
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [openTasks, setOpenTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loadedTabs, setLoadedTabs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { name: "Open" },
    { name: "Pending" },
    { name: "In Progress" },
    { name: "Completed" },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (loadedTabs[activeTab]) return;

        let response = await fetch(
          `/api/tasks?status=${activeTab}&column=${selectedColumn}&search=${search}`
        );
        let data = await response.json();

        if (activeTab === "Open") setOpenTasks(data);
        else if (activeTab === "Pending") setPendingTasks(data);
        else if (activeTab === "In Progress") setInProgressTasks(data);
        else if (activeTab === "Completed") setCompletedTasks(data);

        setLoadedTabs((prev) => ({ ...prev, [activeTab]: true }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [activeTab, loadedTabs, search, selectedColumn]);

  const currentTasks =
    activeTab === "Open"
      ? openTasks
      : activeTab === "Pending"
      ? pendingTasks
      : activeTab === "In Progress"
      ? inProgressTasks
      : completedTasks;

  return (
    <div className="task-container">
      <div className="task-header-box">
        <div>
          <h2 className="task-title">Tasks</h2>
          <p className="task-desc">
            <FaCalendarAlt className="calendar-icon" />
            Manage your tasks.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Create
        </button>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="task-body-box">
        <h3 className="filter-heading">Filter:</h3>
        <div className="filter-row-wrapper">
          <div className="filter-row">
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              <option value="">Select Column</option>
              <option value="all">All Columns</option>
              <option value="id">Task Id</option>
              <option value="priority">Priority</option>
              <option value="createdBy">Created By</option>
              <option value="type">Type</option>
              <option value="subType">Sub Type</option>
              <option value="name">Task Name</option>
            </select>
            <input
              type="text"
              placeholder="Type to search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="filter-btn"
              onClick={() =>
                setLoadedTabs((prev) => ({ ...prev, [activeTab]: false }))
              }
            >
              Filter
            </button>
          </div>
          <div className="side-buttons">
            <button
              className="footer-btn"
              onClick={() =>
                setLoadedTabs((prev) => ({ ...prev, [activeTab]: false }))
              }
            >
              ⟳ Refresh
            </button>
            <button className="footer-btn">Export to CSV</button>
          </div>
        </div>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`tab ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.name);
                setLoadedTabs((prev) => ({ ...prev, [tab.name]: false }));
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Task Id <FaSort /></th>
                <th>Priority <FaSort /></th>
                <th>Created By <FaSort /></th>
                <th>Type <FaSort /></th>
                <th>Sub Type <FaSort /></th>
                <th>Task Name <FaSort /></th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task, idx) => (
                  <tr key={idx}>
                    <td><button>⋮</button></td>
                    <td>{task.id}</td>
                    <td>{task.priority}</td>
                    <td>{task.createdBy}</td>
                    <td>{task.type}</td>
                    <td>{task.subType}</td>
                    <td>{task.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-records">
                    <i>No record found to display.</i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Total Records: {currentTasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
