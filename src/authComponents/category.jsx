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
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <Link
                      className={
                        type === "Category" ? "nav-link active" : "nav-link"
                      }
                      to=""
                      onClick={() => setType("Category")}
                    >
                      Category
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        type === "Subcategory" ? "nav-link active" : "nav-link"
                      }
                      to=""
                      onClick={() => setType("Subcategory")}
                    >
                      Subcategory
                    </Link>
                  </li>
                </ul>
                {/* Category Tab */}
                <div className="tab-pane fade show active">
                  <CategoryComp type={type} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default React.memo(Category);
