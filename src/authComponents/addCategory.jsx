import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import {
  addCategory,
  updateCategory,
} from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";

// eslint-disable-next-line no-unused-vars
function AddCategory({ details, setDetails, refetch, setCurrentPage }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,

    setValue,
  } = useForm({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (details?.name_en) {
      setValue("name_en", details?.name_en);
      setValue("status", details?.status);
      setFile(details?.image);
    } else {
      reset();
      setFile(null);
      setEdit(false);
    }
  }, [details]);

  const onSubmit = async (data) => {
    console.log(file);
    if (!file?.name && !file) {
      showGlobalAlert("Please upload a file", "error");
      return;
    }
    setLoader(true);

    const formData = new FormData();

    formData.append("images", file);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const response = details?.name_en
        ? await updateCategory(details._id, formData)
        : await addCategory(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        setCurrentPage(1);
        await refetch();
        document.getElementById("closeAddMerchantModal").click();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    } finally {
      setLoader(false);
    }
  };
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (details?.name_en) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  console.log(file, edit, details?.name_en);

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-main fw-bold">
            {details?.name_en ? "Edit" : "Add"} Category
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeAddMerchantModal"
            onClick={() => {
              reset();
              setDetails({});
              setFile(null);
              setEdit(false);
            }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body row g-3">
            <div className="mb-3">
              {file?.name || file ? (
                <div className="img-wrap position-relative">
                  <img
                    src={
                      details.name_en && file && edit
                        ? URL.createObjectURL(file)
                        : details.name_en && file && !edit
                        ? file
                        : URL.createObjectURL(file)
                    }
                    alt="Uploaded Image"
                  />
                  <i
                    className="fas fa-remove"
                    onClick={() => setFile(null)}
                  ></i>
                </div>
              ) : (
                <label htmlFor="photo-upload" className="custom-file-upload">
                  <div className="text-center">
                    <i className="fas fa-cloud-upload-alt" />
                    <br />
                    Upload Image
                  </div>
                </label>
              )}
              <input
                className="d-none"
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Category Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.name_en ? "input-error" : ""
                }`}
                placeholder="Enter category name"
                {...register("name_en", {
                  required: "Category name is required",
                })}
              />
              {errors.name_en && (
                <p className="form-error">{errors.name_en.message}</p>
              )}
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <label className="form-label fw-semibold me-3">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={details?.name_en ? "" : true}
                  {...register("status")}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn comman-btn-main"
              disabled={loader}
            >
              {loader ? (
                <>
                  <span className="me-2">Saving...</span>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                </>
              ) : details?.name_en ? (
                "Edit"
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default React.memo(AddCategory);
