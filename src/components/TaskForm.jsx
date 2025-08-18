import React from "react";
import "../styles/TaskForm.css";

function TaskForm() {
  return (
    <div className="task-form">
      <h2 className="form-title">Create Task</h2>

      <div className="form-grid">
        <div className="form-group full">
          <label>Task Name</label>
          <input type="text" placeholder="Enter Task Name" />
        </div>

        <div className="form-group half">
          <label>Task Type</label>
          <select>
            <option>Select Type</option>
          </select>
        </div>

        <div className="form-group full">
          <label>Task Details</label>
          <textarea placeholder="Enter Details"></textarea>
        </div>

        <div className="form-group half">
          <label>Created By</label>
          <input type="text" value="Mohamed Rifthy" disabled />
        </div>

        <div className="form-group half">
          <label>Assigned To</label>
          <select>
            <option>Select Agent</option>
          </select>
        </div>

        <div className="form-group half">
          <label>Priority</label>
          <select defaultValue="Medium">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="form-group half">
          <label>Status</label>
          <select defaultValue="Open">
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="form-group half">
          <label>Engagement</label>
          <input type="text" placeholder="Enter Task Type" />
        </div>

        <div className="form-group half">
          <label>Start Date</label>
          <input type="date" />
        </div>

        <div className="form-group half">
          <label>End Date</label>
          <input type="date" />
        </div>

        <div className="form-group full">
          <label>Remarks</label>
          <textarea placeholder="Enter Remarks"></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Save
        </button>
        <button type="button" className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
