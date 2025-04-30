import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../types/authType";
export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      //console.log(response.data);
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      //console.log(error.response.data);
      // Nếu có lỗi trong quá trình gọi API (ví dụ: lỗi server, lỗi kết nối)
      dispatch({
        type: REGISTER_FAIL, // Action type bạn muốn gửi
        payload: {
          // Dữ liệu bạn muốn gửi kèm theo action (thường là thông báo lỗi)
          error: error.response.data.error.errorMessage, //Là thông báo lỗi cụ thể mà server trả về. Đây là nơi bạn sẽ lấy thông tin lỗi mà bạn muốn hiển thị cho người dùng.
        },
      });
    }
  };
};
export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-login",
        data, // Dữ liệu đăng nhập (email, password)
        config // Cấu hình headers
      );
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};
