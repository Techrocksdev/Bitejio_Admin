import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../commonComponents/sideBar";
import Header from "../commonComponents/header";
import { useUserAuth } from "../commonComponents/authContext";
import CategoryComp from "./categoryComp";

function Category() {
  const { isSidebarHidden } = useUserAuth();
  const [type, setType] = useState("Category");
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
                <h3 className="fw-semibold text-white fs-5">
                  Category Management
                </h3>
              </div>
              <div className="card-body tab-content">
                <ul
                  className="nav nav-tabs card-header-tabs"
                  id="categoryTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="category-tab"
                      data-bs-toggle="tab"
                      href="#category"
                      role="tab"
                      onClick={() => setType("Category")}
                    >
                      Category
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="subcategory-tab"
                      data-bs-toggle="tab"
                      href="#subcategory"
                      role="tab"
                      onClick={() => setType("Subcategory")}
                    >
                      Subcategory
                    </a>
                  </li>
                </ul>
                {/* Category Tab */}
                <div
                  className="tab-pane fade show active"
                  id="category"
                  role="tabpanel"
                >
                  <CategoryComp type={type} />
                </div>
                {/* Subcategory Tab */}
                <div className="tab-pane fade" id="subcategory" role="tabpanel">
                  <CategoryComp type={type} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Category Modal */}
      <div className="modal fade" id="addCategoryModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">Add Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter category name"
                  />
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main">Save</button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Category Modal */}
      <div className="modal fade" id="editCategoryModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">Edit Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Pizza"
                  />
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main">Update</button>
            </div>
          </div>
        </div>
      </div>
      {/* Add Subcategory Modal */}
      <div className="modal fade" id="addSubcategoryModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">Add Subcategory</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select className="form-select">
                    <option>Pizza</option>
                    <option>Burger</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Subcategory Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subcategory name"
                  />
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main">Save</button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Subcategory Modal */}
      <div className="modal fade" id="editSubcategoryModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-main fw-bold">
                Edit Subcategory
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select className="form-select">
                    <option selected>Pizza</option>
                    <option>Burger</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Subcategory Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Veg Pizza"
                  />
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn comman-btn-main">Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Category);
