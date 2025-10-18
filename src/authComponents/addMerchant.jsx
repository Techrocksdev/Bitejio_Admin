import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { addMerchant } from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function AddMerchant() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoader(true);
    data.countryCode = data.phoneNumber.countryCode;
    data.phoneNumber = data.phoneNumber.phoneNumber;
    delete data.confirmPassword;

    try {
      const response = await addMerchant(data);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
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

  // eslint-disable-next-line no-unused-vars
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-main fw-bold">Add New Merchant</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeAddMerchantModal"
            onClick={() => reset()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "input-error" : ""
                }`}
                placeholder="Enter first name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "First name must be less than 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "First name can only contain letters and spaces",
                  },
                })}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "input-error" : ""
                }`}
                placeholder="Enter last name"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Last name must be less than 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Last name can only contain letters and spaces",
                  },
                })}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Username <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.userName ? "input-error" : ""
                }`}
                placeholder="Enter username"
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username must be less than 30 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers and underscore",
                  },
                })}
              />
              {errors.userName && (
                <p className="form-error">{errors.userName.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "input-error" : ""}`}
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Shop Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.shopName ? "input-error" : ""
                }`}
                placeholder="Enter shop name"
                {...register("shopName", {
                  required: "Shop name is required",
                  minLength: {
                    value: 2,
                    message: "Shop name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Shop name must be less than 100 characters",
                  },
                })}
              />
              {errors.shopName && (
                <p className="form-error">{errors.shopName.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <Controller
                className={`form-control ${
                  errors.phoneNumber ? "input-error" : ""
                }`}
                name="phoneNumber"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <PhoneInput
                    country={"us"}
                    inputClass={`form-control ${
                      errors.phoneNumber ? "input-error" : ""
                    }`}
                    inputStyle={{
                      padding: "unset",
                      paddingLeft: "48px",
                    }}
                    value={
                      field?.value?.phoneNumber
                        ? `${field?.value?.countryCode}${field?.value?.phoneNumber}`
                        : ""
                    }
                    onChange={(value, countryData) => {
                      const phoneNumberWithoutCountry = value.slice(
                        countryData.dialCode.length
                      );

                      field.onChange({
                        phoneNumber: phoneNumberWithoutCountry,
                        countryCode: `+${countryData.dialCode}`,
                      });
                    }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="form-error">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control pe-5 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]/,
                      message:
                        "Password must contain uppercase, number and special character",
                    },
                  })}
                />
                {/* <span
                    className="position-absolute top-50 end-0 translate-middle-y me-2"
                    style={{ cursor: "pointer", zIndex: 10 }}
                    onClick={togglePasswordVisibility}
                  >
                    <img
                      src="/assets/images/icons/eye-slash.svg"
                      alt="Toggle password visibility"
                      width="20"
                    />
                  </span> */}
              </div>
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <label className="form-label fw-semibold me-3">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
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
                <div>
                  <span className="me-2">Saving...</span>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                </div>
              ) : (
                "Save Merchant"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default React.memo(AddMerchant);
