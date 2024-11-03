import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar_05,
  Avatar_08,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  avatar1,
  avatar27,
  avatar28,
} from "../../../routes/ImagePath";

const TicketDetails = () => {
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-4">
                <h3 className="page-title mb-0">Ticket Detail</h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <hr />
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-xxl-3 col-md-6">
                    <div className="ticket-head-card">
                      <span className="ticket-detail-icon">
                        <i className="la la-stop-circle" />
                      </span>
                      <div className="detail-info">
                        <h6>Status</h6>
                        <span className="badge badge-soft-warning">
                          In Progress
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-6">
                    <div className="ticket-head-card">
                      <span className="ticket-detail-icon bg-danger-lights">
                        <i className="la la-user" />
                      </span>
                      <div className="detail-info info-two">
                        <h6>Created By</h6>
                        <span>John Doe</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-6">
                    <div className="ticket-head-card">
                      <span className="ticket-detail-icon bg-warning-lights">
                        <i className="la la-calendar" />
                      </span>
                      <div className="detail-info info-two">
                        <h6>Created Date</h6>
                        <span>08 Feb 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-6">
                    <div className="ticket-head-card">
                      <span className="ticket-detail-icon bg-purple-lights">
                        <i className="la la-info-circle" />
                      </span>
                      <div className="detail-info">
                        <h6>Priority</h6>
                        <span className="badge badge-soft-danger">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ticket-purpose">
                <h4>Laptop Issue</h4>
                <p>
                  For the past week, my laptop has been experiencing
                  intermittent freezing issues. The freezes occur randomly,
                  approximately 3-4 times a day, and last about 30-60 seconds
                  each time. During these freezes, the cursor becomes
                  unresponsive, and I am unable to click on anything or use
                  keyboard shortcuts. The issue usually resolves itself, but it
                  significantly disrupts my work.
                </p>
                <ul>
                  <li>
                    I first noticed the problem on February 1, 2024, while using
                    Google Meet for a video conference. Since then, the issue
                    has occurred during various tasks, including browsing with
                    Chrome, using Microsoft Office applications, and even when
                    the laptop is idle.
                  </li>
                  <li>
                    Error messages: No specific error messages have appeared,
                    but the Task Manager (when accessible) shows a spike in CPU
                    usage to 100% during these freezes.
                  </li>
                </ul>
              </div>
              <div className="attached-files-info">
                <div className="row">
                  <div className="col-xxl-6">
                    <div className="attached-files">
                      <ul>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-file-pdf" />
                            </span>
                            <p>file0702202413.pdf</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-file-pdf" />
                            </span>
                            <p>file0702202414.pdf</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-file-alt" />
                            </span>
                            <p>file0702202418.doc</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-file-alt" />
                            </span>
                            <p>file0702202419.doc</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-file-alt" />
                            </span>
                            <p>file0702202420.doc</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div className="attached-files media-attached-files">
                      <ul>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-image" />
                            </span>
                            <p>Image0702202411.jpg</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-image" />
                            </span>
                            <p>Image0702202412.jpg</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-file-video" />
                            </span>
                            <p>Video0702202415.mp4</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-image" />
                            </span>
                            <p>Image0702202420.png</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <span className="file-icon">
                              <i className="la la-image" />
                            </span>
                            <p>Image0702202421.png</p>
                          </div>
                          <div className="file-download">
                            <Link to="#">
                              <i className="la la-download" />
                              Download
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 theiaStickySidebar">
              <div className="stickybar">
                <div className="ticket-chat">
                  <div className="ticket-chat-head">
                    <h4>Ticket Chat</h4>
                    <div className="chat-post-box">
                      <form>
                        <textarea
                          className="form-control"
                          rows={4}
                          defaultValue={"Post"}
                        />
                        <div className="files-attached d-flex justify-content-between align-items-center">
                          <div className="post-files">
                            <Link to="#">
                              <i className="la la-image" />
                            </Link>
                            <Link to="#">
                              <i className="la la-file-video" />
                            </Link>
                          </div>
                          <button type="submit">Sent</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="ticket-chat-body">
                    <ul className="created-tickets-info">
                      <li>
                        <div className="ticket-created-user">
                          <span className="avatar">
                            <img src={avatar27} alt="img" />
                          </span>
                          <div className="user-name">
                            <h5>
                              <span>John Doe</span> posted a status
                            </h5>
                            <span>5 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ticket-created-info">
                          <h6>Impact on Work</h6>
                          <p>
                            This issue disrupts meetings, delays task
                            completion, and affects my overall productivity.
                          </p>
                          <Link to="#" className="comment-text">
                            <i className="la la-comments me-2" />
                            Comments (2)
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="ticket-created-user">
                          <span className="avatar">
                            <img src={avatar1} alt="img" />
                          </span>
                          <div className="user-name">
                            <h5>
                              <span>Rebecca Velazquez</span>
                            </h5>
                            <span>2 hours ago</span>
                          </div>
                        </div>
                        <p className="details-text">
                          Check the System and Application logs in the Event
                          Viewer for warnings or errors that coincide with the
                          times the freezes occur.
                        </p>
                      </li>
                      <li>
                        <div className="ticket-created-user">
                          <span className="avatar">
                            <img src={avatar28} alt="img" />
                          </span>
                          <div className="user-name">
                            <h5>
                              <span>Rahul Daviz</span>
                            </h5>
                            <span>3 hours ago</span>
                          </div>
                        </div>
                        <p className="details-text">
                          Confirm that basic troubleshooting steps have been
                          correctly executed (restarts, updates, antivirus
                          scans).
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="ticket-chat-footer">
                    <form>
                      <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="form-control" />
                        <button type="submit">
                          <i className="la la-arrow-right" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Ticket Modal */}
        <div id="edit_ticket" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Ticket</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Ticket Subject</label>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue="Laptop Issue"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Ticket Id</label>
                        <input
                          className="form-control"
                          type="text"
                          readOnly=""
                          defaultValue="TKT-0001"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Assign Staff</label>
                        <select className="select">
                          <option>-</option>
                          <option selected="">Mike Litorus</option>
                          <option>John Smith</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Client</label>
                        <select className="select">
                          <option>-</option>
                          <option>Delta Infotech</option>
                          <option selected="">
                            International Software Inc
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Priority</label>
                        <select className="select">
                          <option>High</option>
                          <option selected="">Medium</option>
                          <option>Low</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">CC</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Assign</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Ticket Assignee
                        </label>
                        <div className="project-members">
                          <Link
                            title="John Smith"
                            data-bs-toggle="tooltip"
                            to="#"
                          >
                            <img src={Avatar_10} alt="img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Add Followers</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="col-form-label">
                          Ticket Followers
                        </label>
                        <div className="project-members">
                          <Link
                            title="Richard Miles"
                            data-bs-toggle="tooltip"
                            to="#"
                            className="avatar"
                          >
                            <img src={Avatar_09} alt="img" />
                          </Link>
                          <Link
                            title="John Smith"
                            data-bs-toggle="tooltip"
                            to="#"
                            className="avatar"
                          >
                            <img src={Avatar_10} alt="img" />
                          </Link>
                          <Link
                            title="Mike Litorus"
                            data-bs-toggle="tooltip"
                            to="#"
                            className="avatar"
                          >
                            <img src={Avatar_05} alt="img" />
                          </Link>
                          <Link
                            title="Wilmer Deluna"
                            data-bs-toggle="tooltip"
                            to="#"
                            className="avatar"
                          >
                            <img src={Avatar_11} alt="img" />
                          </Link>
                          <span className="all-team">+2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="col-form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          defaultValue={""}
                        />
                      </div>
                      <div className="input-block mb-3">
                        <label className="col-form-label">Upload Files</label>
                        <input className="form-control" type="file" />
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Ticket Modal */}
        {/* Delete Ticket Modal */}
        <div
          className="modal custom-modal fade"
          id="delete_ticket"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Ticket</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <Link to="#" className="btn btn-primary continue-btn">
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-primary cancel-btn"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Ticket Modal */}
        {/* Assignee Modal */}
        <div id="assignee" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign to this task</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group m-b-30">
                  <input
                    placeholder="Search to add"
                    className="form-control search-input"
                    type="text"
                  />
                  <button className="btn btn-primary">Search</button>
                </div>
                <div>
                  <ul className="chat-user-list">
                    <li>
                      <Link to="#">
                        <div className="chat-block d-flex">
                          <span className="avatar">
                            <img src={Avatar_11} alt="img" />
                          </span>
                          <div className="media-body align-self-center text-nowrap">
                            <div className="user-name">Richard Miles</div>
                            <span className="designation">Web Developer</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="chat-block d-flex">
                          <span className="avatar">
                            <img src={Avatar_10} alt="img" />
                          </span>
                          <div className="media-body align-self-center text-nowrap">
                            <div className="user-name">John Smith</div>
                            <span className="designation">
                              Android Developer
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="chat-block d-flex">
                          <span className="avatar">
                            <img src={Avatar_10} alt="img" />
                          </span>
                          <div className="media-body align-self-center text-nowrap">
                            <div className="user-name">Jeffery Lalor</div>
                            <span className="designation">Team Leader</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Assign</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Assignee Modal */}
        {/* Task Followers Modal */}
        <div
          id="task_followers"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add followers to this task</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group m-b-30">
                  <input
                    placeholder="Search to add"
                    className="form-control search-input"
                    type="text"
                  />
                  <button className="btn btn-primary">Search</button>
                </div>
                <div>
                  <ul className="chat-user-list">
                    <li>
                      <Link to="#">
                        <div className="chat-block d-flex">
                          <span className="avatar">
                            <img src={Avatar_10} alt="img" />
                          </span>
                          <div className="media-body media-middle text-nowrap">
                            <div className="user-name">Jeffery Lalor</div>
                            <span className="designation">Team Leader</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="chat-block d-flex">
                          <span className="avatar">
                            <img src={Avatar_08} alt="img" />
                          </span>
                          <div className="media-body media-middle text-nowrap">
                            <div className="user-name">Catherine Manseau</div>
                            <span className="designation">
                              Android Developer
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <div className="chat-block d-flex">
                          <span className="avatar">
                            <img src={Avatar_11} alt="img" />
                          </span>
                          <div className="media-body media-middle text-nowrap">
                            <div className="user-name">Wilmer Deluna</div>
                            <span className="designation">Team Leader</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">
                    Add to Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Task Followers Modal */}
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default TicketDetails;
