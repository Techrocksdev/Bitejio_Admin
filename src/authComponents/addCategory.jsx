import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { addMerchant, editUser } from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";

// eslint-disable-next-line no-unused-vars
function AddCategory({ details, setDetails, refetch }) {
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

  useEffect(() => {
    if (details?.name_en) {
      setValue("name_en", details?.name_en);
      setValue("status", details?.status);
    } else {
      reset();
    }
  }, [details]);

  const onSubmit = async (data) => {
    if (!file?.name) {
      alert.show("Please upload a file");
      return;
    }
    setLoader(true);

    const formData = new FormData();

    formData.append("image", file);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const response = (await details?.name_en)
        ? editUser(details._id, formData)
        : addMerchant(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        document.getElementById("closeAddMerchantModal").click();
        setTimeout(() => {
          refetch();
        }, 500);
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
  };

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-main fw-bold">
            {details?.name_en ? "Edit" : "Add"} Merchant
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
            }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body row g-3">
            <div className="mb-3">
              {file?.name ? (
                <div className="img-wrap">
                  <img src={URL.createObjectURL(file)} alt="Uploaded Image" />
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
                id="photo-upload"
                type="file"
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
                {...register("name_en ", {
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
