import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { Link } from "react-router-dom";
import {
  deleteCategory,
  getCategory,
  updateCategoryStatus,
} from "../apiServices/home/homeHttpService";
import AddCategory from "./addCategory";

function CategoryComp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [details, setDetails] = useState({});
  const [delId, setDelId] = useState("");

  useEffect(() => {}, [details]);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categoryList", currentPage, pageSize],
    queryFn: async () => {
      const formData = {
        page: currentPage,
        pageSize: pageSize,
        categoryId: "",
        allSubcategory: false,
        search: "",
      };
      return getCategory(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.data || [];
  const totalPages = Math.ceil(response?.results?.totalPages);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const changeStatus = async (id) => {
    try {
      const response = await updateCategoryStatus(id);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };
  const deleteMerchant = async (id) => {
    try {
      const response = await deleteCategory(id);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        document.getElementById("close").click();
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button
          className="btn btn-sm bg-main text-white"
          data-bs-toggle="modal"
          data-bs-target="#addCategoryModal"
        >
          <i className="fa fa-plus" /> Add Category
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Category Name</th>
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
                </tr>
              ))
            ) : results?.length ? (
              results?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>

                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.status}
                        onChange={() => changeStatus(item._id)}
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="table-btn bg-main me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addCategoryModal"
                      onClick={() => setDetails(item)}
                    >
                      <i className="fa fa-edit" />
                    </button>
                    <button
                      className="table-btn bg-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDelId(item._id);
                      }}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Oops! No Result Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <AddCategory
            details={details}
            setDetails={setDetails}
            refetch={refetch}
          />
        </div>
      </div>
      <div
        className="modal fade logoutmodal"
        id="delete"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="paymentmodal_main text-center">
                <div className="payment_head mb-3 mt-1">
                  <h2>Confirmation</h2>
                  <p>Are you sure you want to delete this user?</p>
                </div>
                <div className="row justify-content-center mb-2">
                  <div className="col-auto">
                    <button
                      className="comman-btn-main"
                      onClick={() => deleteMerchant(delId)}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="col-auto">
                    <Link
                      className="comman-btn-main white"
                      data-bs-dismiss="modal"
                      to=""
                      onClick={() => setDelId("")}
                      id="close"
                    >
                      No
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(CategoryComp);
