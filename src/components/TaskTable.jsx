import React, { useState } from "react";
import "./TaskTable.css";
import { useNavigate } from "react-router-dom";
import { FaSort, FaCalendarAlt } from "react-icons/fa";

const TaskTable = () => {
  const [activeTab, setActiveTab] = useState("Open");
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const navigate = useNavigate();

  const tabs = [
    { name: "Open", count: 1 },
    { name: "Pending", count: 1 },
    { name: "In Progress", count: 1 },
    { name: "Completed", count: 1 },
  ];

  const allTasks = [
    {
      id: "T-101",
      priority: "High",
      createdBy: "Alice",
      type: "Bug",
      subType: "UI",
      name: "Fix header alignment",
      status: "Open",
    },
    {
      id: "T-102",
      priority: "Medium",
      createdBy: "Bob",
      type: "Feature",
      subType: "Backend",
      name: "Add API endpoint",
      status: "Pending",
    },
    {
      id: "T-103",
      priority: "Low",
      createdBy: "Charlie",
      type: "Task",
      subType: "Docs",
      name: "Update README",
      status: "In Progress",
    },
    {
      id: "T-104",
      priority: "High",
      createdBy: "Diana",
      type: "Bug",
      subType: "API",
      name: "Fix login issue",
      status: "Completed",
    },
  ];

  const filteredTasks = allTasks.filter((task) => {
    const matchesTab = task.status === activeTab;

    if (search.trim() === "") return matchesTab;

    if (selectedColumn === "all") {
      return (
        matchesTab &&
        Object.values(task)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    } else if (selectedColumn) {
      const value = String(task[selectedColumn])?.toLowerCase();
      return matchesTab && value.includes(search.toLowerCase());
    }

    return matchesTab;
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
        <button className="create-btn" onClick={() => navigate("/create")}>
          + Create
        </button>
      </div>

      {/* ===== Second White Box ===== */}
      <div className="task-body-box">
        {/* === Filter Heading === */}
        <h3 className="filter-heading">Filter:</h3>

        {/* Filter Row */}
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
            <button className="filter-btn">Filter</button>
          </div>

          <div className="side-buttons">
            <button className="footer-btn">⟳ Refresh</button>
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
              {tab.name}{" "}
              {tab.count > 0 && <span className="count">{tab.count}</span>}
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
