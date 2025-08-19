import React, { useState, useEffect } from "react";
import "./TaskTable.css";
import { FaSort, FaCalendarAlt } from "react-icons/fa";
import TaskModal from "./TaskModal";

const TaskTable = () => {
  const [activeTab, setActiveTab] = useState("Open");
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const [openTasks, setOpenTasks] = useState([
    { id: "O1", priority: "High", createdBy: "Alice", type: "Bug", subType: "UI", name: "Fix login issue" },
    { id: "O2", priority: "Medium", createdBy: "Bob", type: "Feature", subType: "Dashboard", name: "Add analytics tab" },
  ]);

  const [pendingTasks, setPendingTasks] = useState([
    { id: "P1", priority: "Low", createdBy: "Charlie", type: "Bug", subType: "API", name: "Check timeout error" },
  ]);

  const [inProgressTasks, setInProgressTasks] = useState([
    { id: "IP1", priority: "High", createdBy: "Diana", type: "Feature", subType: "Auth", name: "Implement OTP login" },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { id: "C1", priority: "Medium", createdBy: "Eve", type: "Bug", subType: "UI", name: "Fix header alignment" },
  ]);

  const [loadedTabs, setLoadedTabs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ ADD COUNTS TO TABS
  const tabs = [
    { name: "Open", count: openTasks.length },
    { name: "Pending", count: pendingTasks.length },
    { name: "In Progress", count: inProgressTasks.length },
    { name: "Completed", count: completedTasks.length },
  ];

  const fetchTasks = async (status = activeTab) => {
    if (loadedTabs[status]) return;
    try {
      const response = await fetch(
        `/api/tasks?status=${status}&column=${selectedColumn}&search=${search}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      if (status === "Open") setOpenTasks(data);
      else if (status === "Pending") setPendingTasks(data);
      else if (status === "In Progress") setInProgressTasks(data);
      else if (status === "Completed") setCompletedTasks(data);

      setLoadedTabs((prev) => ({ ...prev, [status]: true }));
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks(activeTab);
  }, [activeTab, search, selectedColumn]);

  const currentTasks =
    activeTab === "Open"
      ? openTasks
      : activeTab === "Pending"
      ? pendingTasks
      : activeTab === "In Progress"
      ? inProgressTasks
      : completedTasks;

  const handleRefresh = () => {
    setLoadedTabs((prev) => ({ ...prev, [activeTab]: false }));
    fetchTasks(activeTab);
  };

  const handleExportCSV = () => {
    if (!currentTasks.length) {
      alert("No tasks available to export.");
      return;
    }

    const headers = ["Task Id", "Priority", "Created By", "Type", "Sub Type", "Task Name"];
    const rows = currentTasks.map((task) => [
      task.id,
      task.priority,
      task.createdBy,
      task.type,
      task.subType,
      task.name,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${activeTab}_tasks.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      {/* Filters */}
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
            <button className="footer-btn" onClick={handleRefresh}>
              ⟳ Refresh
            </button>
            <button className="footer-btn" onClick={handleExportCSV}>
              Export to CSV
            </button>
          </div>
        </div>

        {/* ✅ Tabs with count */}
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
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>
                  <div className="th-content">
                    <span>Task Id</span>
                    <FaSort className="sort-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Priority</span>
                    <FaSort className="sort-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Created By</span>
                    <FaSort className="sort-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Type</span>
                    <FaSort className="sort-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Sub Type</span>
                    <FaSort className="sort-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Task Name</span>
                    <FaSort className="sort-icon" />
                  </div>
                </th>
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
