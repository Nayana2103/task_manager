import React, { useState, useEffect } from "react";
import "./TaskTable.css";
import { FaSort, FaCalendarAlt } from "react-icons/fa";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import "../styles/TaskForm.css";

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
  const [priority, setPriority] = useState("Medium");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const onSubmit = (data) => {
    console.log("✅ Form Submitted:", data);
    reset();
    setIsModalOpen(false);
  };

  const getPriorityClass = () => {
    switch (priority) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-orange-500";
      case "High":
        return "text-red-600";
      default:
        return "";
    }
  };

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

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Create
        </Button>
      </div>

      {/* ===== Task Form Modal (Form Inside) ===== */}
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
        <div className="task-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ---------------- Guest Details ---------------- */}
            <h3 className="section-title">Guest Details</h3>
            <div className="form-grid">
              <div className="form-group half">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              <div className="form-group half">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <div className="form-group half">
                <label>Created By</label>
                <input type="text" value="Mohamed Rifthy" disabled />
              </div>

              <div className="form-group half">
                <label>Assigned To</label>
                <select
                  {...register("assignedTo", { required: "Please select an agent" })}
                >
                  <option value="">Select Agent</option>
                  <option value="Agent A">Agent A</option>
                  <option value="Agent B">Agent B</option>
                </select>
                {errors.assignedTo && <p className="error">{errors.assignedTo.message}</p>}
              </div>
            </div>

            <hr className="form-divider" />

            {/* ---------------- Task Details ---------------- */}
            <h3 className="section-title">Task Details</h3>
            <div className="form-grid">
              <div className="form-group full">
                <label>Task Name</label>
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  {...register("taskName", { required: "Task name is required" })}
                />
                {errors.taskName && <p className="error">{errors.taskName.message}</p>}
              </div>

              <div className="form-group full">
                <label>Task Type</label>
                <select {...register("taskType", { required: "Task type is required" })}>
                  <option value="">Select Type</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Improvement">Improvement</option>
                </select>
                {errors.taskType && <p className="error">{errors.taskType.message}</p>}
              </div>

              <div className="form-group full">
                <label>Task Details</label>
                <textarea
                  placeholder="Enter Details"
                  {...register("details", { required: "Task details are required" })}
                ></textarea>
                {errors.details && <p className="error">{errors.details.message}</p>}
              </div>

              <div className="form-group half">
                <label>Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  {...register("priority", { required: "Priority is required" })}
                  className={`${getPriorityClass()} font-semibold`}
                >
                  <option value="Low" className="text-green-600">Low</option>
                  <option value="Medium" className="text-orange-500">Medium</option>
                  <option value="High" className="text-red-600">High</option>
                </select>
                {errors.priority && <p className="error">{errors.priority.message}</p>}
              </div>

              <div className="form-group half">
                <label>Status</label>
                <select defaultValue="Open" {...register("status")}>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Engagement</label>
                <input type="text" placeholder="Enter Engagement" {...register("engagement")} />
              </div>

              <div className="form-group half">
                <label>Start Date</label>
                <input type="date" {...register("startDate")} />
              </div>
              <div className="form-group half">
                <label>End Date</label>
                <input type="date" {...register("endDate")} />
              </div>

              <div className="form-group full">
                <label>Remarks</label>
                <textarea placeholder="Enter Remarks" {...register("remarks")}></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save</button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  reset();
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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

        {/* Tabs */}
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

        {/* Table */}
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

        {/* Footer */}
        <div className="table-footer">
          <span>Total Records: {currentTasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
