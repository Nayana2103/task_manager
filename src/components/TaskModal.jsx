import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import "../styles/TaskForm.css";

const TaskModal = ({ isOpen, onClose }) => {
  const [priority, setPriority] = useState("Medium");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const onSubmit = (data) => {
    console.log("✅ Form Submitted:", data);
    reset();
    onClose();
  };

  return (
    <Modal
      title="Create Task"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      closable={true}
      transitionName=""
      maskTransitionName=""
    >
      <div className="task-form">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" className="btn-secondary" onClick={() => { reset(); onClose(); }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
