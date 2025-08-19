import React, { useState, useEffect } from "react";
import "./TaskTable.css";
import { FaSort, FaCalendarAlt } from "react-icons/fa";
import { Modal, Button } from "antd";
import TaskForm from "./TaskForm"; // ✅ Make sure TaskForm exists

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

  // Fetch tasks when tab changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (loadedTabs[activeTab]) return;

        let response = await fetch(`/api/tasks?status=${activeTab}`);
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
  }, [activeTab, loadedTabs]);

  const currentTasks =
    activeTab === "Open"
      ? openTasks
      : activeTab === "Pending"
      ? pendingTasks
      : activeTab === "In Progress"
      ? inProgressTasks
      : completedTasks;

  const filteredTasks = currentTasks.filter((task) => {
    if (search.trim() === "") return true;

    if (selectedColumn === "all") {
      return Object.values(task)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    } else if (selectedColumn) {
      const value = String(task[selectedColumn])?.toLowerCase();
      return value.includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div className="task-container">
      {/* ===== First White Box ===== */}
      <div className="task-header-box">
        <div>
          <h2 className="task-title">Tasks</h2>
          <p className="task-desc">
            <FaCalendarAlt className="calendar-icon" />
            Manage your tasks.
          </p>
        </div>

        {/* ✅ Open Modal instead of navigate */}
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Create
        </Button>
      </div>

      {/* ===== Task Form Modal ===== */}
<Modal
  title="Create Task"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  width={600}
  centered
  closable={true}
  transitionName=""
  maskTransitionName=""
 
 
>
  <TaskForm onClose={() => setIsModalOpen(false)} />
</Modal>



      {/* ===== Second White Box ===== */}
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
              onClick={() => {
                fetch(
                  `/api/tasks?status=${activeTab}&column=${selectedColumn}&search=${search}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (activeTab === "Open") setOpenTasks(data);
                    else if (activeTab === "Pending") setPendingTasks(data);
                    else if (activeTab === "In Progress")
                      setInProgressTasks(data);
                    else if (activeTab === "Completed")
                      setCompletedTasks(data);
                  });
              }}
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

        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`tab ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Action</th>
                <th className="sortable">
                  Task Id <FaSort />
                </th>
                <th className="sortable">
                  Priority <FaSort />
                </th>
                <th className="sortable">
                  Created By <FaSort />
                </th>
                <th className="sortable">
                  Type <FaSort />
                </th>
                <th className="sortable">
                  Sub Type <FaSort />
                </th>
                <th className="sortable">
                  Task Name <FaSort />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, idx) => (
                  <tr key={idx}>
                    <td>
                      <button>⋮</button>
                    </td>
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

        {/* Footer */}
        <div className="table-footer">
          <span>Total Records: {filteredTasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
