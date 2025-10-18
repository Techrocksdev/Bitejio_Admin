import React, { useState } from "react";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import AddMerchant from "./addMerchant";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Merchants() {
  const { isSidebarHidden } = useUserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const { data: response, isLoading } = useQuery({
    queryKey: ["merchantList", currentPage, pageSize],
    queryFn: async () => {
      const formData = {
        page: currentPage,
        pageSize: pageSize,
        userType: "User",
        search: "",
        from: "",
        to: "",
        status: true,
      };
      return getUsers(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.merchants || [];
  const totalPages = Math.ceil(response?.results?.totalPages);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <h3 className="fw-semibold fs-5">Merchants Management</h3>
                  <button
                    className="btn btn-sm btn-light w-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addMerchantModal"
                  >
                    <i className="fa fa-plus me-1" /> Add
                  </button>
                </div>
              </div>
              <div className="table-responsive shadow-sm rounded bg-white p-3">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Shop Name</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      [...Array(pageSize)].map((_, index) => (
                        <tr key={index}>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                        </tr>
                      ))
                    ) : results?.length ? (
                      results?.map((item, index) => (
                        <tr>
                          <td>1</td>
                          <td>Aryan</td>
                          <td>Saini</td>
                          <td>aryan123</td>
                          <td>Aryan Foods</td>
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
                              data-bs-target="#viewMerchantModal"
                            >
                              <i className="fa fa-eye" />
                            </button>
                            <button
                              className="table-btn bg-main me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#editMerchantModal"
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button className="table-btn bg-danger">
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Oops! No Result Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {results?.length ? (
              <div className="col-md-12 mt-3">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto">
                    <div className="datafilter">
                      <span>Showing</span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={pageSize}
                        onChange={(e) => {
                          setpageSize(parseInt(e.target.value, 10));
                          setCurrentPage(1);
                        }}
                      >
                        <option value="">Select</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="page_txt"></div>
                  </div>
                  <div className="col-auto">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination border-0">
                        <li className="page-item">
                          <button
                            className={`page-link ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <img src="assets/img/page_left.png" alt="" />
                          </button>
                        </li>
                        {Array.from({ length: totalPages })
                          .map((_, index) => index + 1)
                          .filter((page) => {
                            return (
                              page === 1 ||
                              page === totalPages ||
                              Math.abs(page - currentPage) <= 2
                            );
                          })
                          .reduce((acc, page, index, array) => {
                            if (index > 0 && page - array[index - 1] > 1) {
                              acc.push("...");
                            }
                            acc.push(page);
                            return acc;
                          }, [])
                          .map((page, index) =>
                            page === "..." ? (
                              <span key={index} className="pagination-ellipsis">
                                ...
                              </span>
                            ) : (
                              <>
                                <li className="page-item">
                                  <button
                                    key={index}
                                    className={`page-link ${
                                      currentPage === page ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              </>
                            )
                          )}
                        <li className="page-item">
                          <button
                            className={`page-link ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <img src="assets/img/pagee_right.png" alt="" />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </main>
        </div>
      </div>

      {/* View Merchant Modal */}
      <div
        className="modal fade"
        id="viewMerchantModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">
                Merchant Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <p>
                <strong>First Name:</strong> Aryan
              </p>
              <p>
                <strong>Last Name:</strong> Saini
              </p>
              <p>
                <strong>Username:</strong> aryan123
              </p>
              <p>
                <strong>Shop Name:</strong> Aryan Foods
              </p>
              <p>
                <strong>Status:</strong> Active
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Merchant Modal */}
      <div
        className="modal fade"
        id="editMerchantModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">Edit Merchant</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <form>
              <div className="modal-body row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Aryan"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Saini"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="aryan123"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Change password"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Shop Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Aryan Foods"
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label className="form-label fw-semibold me-3">Status</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn comman-btn-main">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add Merchant Modal */}

      <div
        className="modal fade"
        id="addMerchantModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <AddMerchant />
        </div>
      </div>
    </>
  );
}

export default React.memo(Merchants);
