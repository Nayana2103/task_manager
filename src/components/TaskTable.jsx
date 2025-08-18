import React, { useState } from "react";
import "./TaskTable.css";
import TaskForm from "./TaskForm"; // import TaskForm

const TaskTable = () => {
  const [activeTab, setActiveTab] = useState("Open");
  const [showForm, setShowForm] = useState(false); // toggle form

  const tabs = [
    { name: "Open", count: 0 },
    { name: "Pending", count: 2 },
    { name: "In Progress", count: 1 },
    { name: "Completed", count: 1 },
  ];

  return (
    <div className="task-card">
      {/* Header */}
      <div className="task-header">
        <h2>Tasks</h2>
        <p>Manage your tasks.</p>
        <button className="create-btn" onClick={() => setShowForm(true)}>
          + Create
        </button>
      </div>

      {/* Show Form if button clicked */}
      {showForm ? (
        <div className="form-container">
          <TaskForm />
          <button
            className="btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          {/* Filter Row */}
          <div className="filter-row">
            <select>
              <option>Select Column</option>
              <option>Task Id</option>
              <option>Priority</option>
            </select>
            <input type="text" placeholder="Type to search" />
            <button className="filter-btn">Filter</button>
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
                  <th>Task Id</th>
                  <th>Priority</th>
                  <th>Created By</th>
                  <th>Type</th>
                  <th>Sub Type</th>
                  <th>Task Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="no-records">
                    <i> No record found to display. </i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="table-footer">
            <span>Total Records: 0</span>
            <div>
              <button className="footer-btn">⟳ Refresh</button>
              <button className="footer-btn">⬇ Export to CSV</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskTable;
