import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://goodstyles.herokuapp.com/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "Success") {
      showAlert("success", "Logged In SuccessFully!");
      window.setTimeout(() => {
        location.assign("/categories");
      }, 1000);
    }
    console.log(res);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://goodstyles.herokuapp.com/api/v1/users/logout",
    });
    if (res.data.status === "Success") location.reload(true);
  } catch (err) {
    showAlert("error", "Error logging out! try again");
  }
};
