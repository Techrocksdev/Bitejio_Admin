import React from "react";

function SubCategoryComp() {
  return (
    <>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button
          className="btn btn-sm bg-main text-white"
          data-bs-toggle="modal"
          data-bs-target="#addSubcategoryModal"
        >
          <i className="fa fa-plus" /> Add Subcategory
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Subcategory Name</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Pizza</td>
              <td>Veg Pizza</td>
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
                  data-bs-target="#editSubcategoryModal"
                >
                  <i className="fa fa-edit" />
                </button>
                <button className="table-btn bg-danger">
                  <i className="fa fa-trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default React.memo(SubCategoryComp);
