import React, { useState } from "react";
import "../styles/TaskForm.css";

function TaskForm() {
  const [priority, setPriority] = useState("Medium");

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
    <div className="task-form-container">
      <div className="task-form">
        <h2 className="form-title">Create Task</h2>

        <div className="form-grid">
          {/* Name */}
          <div className="form-group half">
            <label>Name</label>
            <input type="text" placeholder="Enter Name" />
          </div>

          {/* Email */}
          <div className="form-group half">
            <label>Email</label>
            <input type="email" placeholder="Enter Email" />
          </div>
        </div>

        {/* Divider */}
        <hr className="form-divider" />

        <div className="form-grid">
          {/* Task Name */}
          <div className="form-group full">
            <label>Task Name</label>
            <input type="text" placeholder="Enter Task Name" />
          </div>

          {/* Task Type */}
          <div className="form-group full">
            <label>Task Type</label>
            <select>
              <option>Select Type</option>
            </select>
          </div>

          {/* Task Details */}
          <div className="form-group full">
            <label>Task Details</label>
            <textarea placeholder="Enter Details"></textarea>
          </div>

          {/* Created By */}
          <div className="form-group half">
            <label>Created By</label>
            <input type="text" value="Mohamed Rifthy" disabled />
          </div>

          {/* Assigned To */}
          <div className="form-group half">
            <label>Assigned To</label>
            <select>
              <option>Select Agent</option>
            </select>
          </div>

          {/* Priority */}
          <div className="form-group half">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`${getPriorityClass()} font-semibold`}
            >
              <option value="Low" className="text-green-600">Low</option>
              <option value="Medium" className="text-orange-500">Medium</option>
              <option value="High" className="text-red-600">High</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group half">
            <label>Status</label>
            <select defaultValue="Open">
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Engagement */}
          <div className="form-group full">
            <label>Engagement</label>
            <input type="text" placeholder="Enter Engagement" />
          </div>

          {/* Dates */}
          <div className="form-group half">
            <label>Start Date</label>
            <input type="date" />
          </div>
          <div className="form-group half">
            <label>End Date</label>
            <input type="date" />
          </div>

          {/* Remarks */}
          <div className="form-group full">
            <label>Remarks</label>
            <textarea placeholder="Enter Remarks"></textarea>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save
          </button>
          <button type="button" className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
