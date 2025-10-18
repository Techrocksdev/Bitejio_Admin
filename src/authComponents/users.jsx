import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";

function Users() {
  const { isSidebarHidden } = useUserAuth();
  return (
    <>
      <div className="admin-wrapper d-flex">
        <SideBar />

        <div
          className={
            isSidebarHidden
              ? "main-content flex-grow-1 full"
              : "main-content flex-grow-1"
          }
          id="main-content"
        >
          <Header />

          <main className="p-4">
            <div className="card">
              <div className="card-header">
                <h3 className="fw-semibold fs-5">User Management</h3>
              </div>
              <div className="table-responsive shadow-sm rounded bg-white p-3">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Aryan Saini</td>
                      <td>aryan@example.com</td>
                      <td>+91 9876543210</td>
                      <td>User</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          className="table-btn bg-main me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa fa-eye" />{" "}
                        </button>
                        <button className="table-btn bg-danger">
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Neha Verma</td>
                      <td>neha@example.com</td>
                      <td>+91 9876501234</td>
                      <td>Merchant</td>
                      <td>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          className="table-btn bg-main me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa fa-eye" />{" "}
                        </button>
                        <button className="table-btn bg-danger">
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        className="modal fade"
        id="viewUserModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">User Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong> Aryan Saini
                  </p>
                  <p>
                    <strong>Email:</strong> aryan@example.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 9876543210
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Role:</strong> User
                  </p>
                  <p>
                    <strong>Status:</strong> Active
                  </p>
                  <p>
                    <strong>Address:</strong> Noida, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Users);
