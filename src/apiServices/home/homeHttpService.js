/* eslint-disable no-undef */

import { showGlobalAlert } from "../../commonComponents/useGlobalAlert";
import webHttpService from "../webHttpService";

export async function userLogin(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/login`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function forgotPassword(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/forgetPassword`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function verifyOTP(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/verifyOtp`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function resetPassword(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/auth/resetPassword`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function addMerchant(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/addMerchant`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getUsers(formData) {
  try {
    const { data } = await webHttpService.post(
      `${import.meta.env.VITE_APIENDPOINT}/user/getUsers`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function editUser(id, formData) {
  try {
    const { data } = await webHttpService.put(
      `${import.meta.env.VITE_APIENDPOINT}/user/editUser/${id}`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function changeUserStatus(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/user/changeUserStatus/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await webHttpService.delete(
      `${import.meta.env.VITE_APIENDPOINT}/user/deleteUser/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function getCategory(formData) {
  try {
    const { data } = await webHttpService.patch(
      `${import.meta.env.VITE_APIENDPOINT}/products/getCategory`,
      formData
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function updateCategoryStatus(id) {
  try {
    const { data } = await webHttpService.get(
      `${import.meta.env.VITE_APIENDPOINT}/products/updateCategoryStatus/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}

export async function deleteCategory(id) {
  try {
    const { data } = await webHttpService.delete(
      `${import.meta.env.VITE_APIENDPOINT}/products/deleteCategory/${id}`
    );
    console.log(data);

    return data;
  } catch (error) {
    showGlobalAlert(error.message, "error");
  }
}
