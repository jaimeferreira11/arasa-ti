import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

// export const startLogin = (email, password) => {
//   return async (dispatch) => {
//     const resp = await fetchSinToken("auth", { email, password }, "POST");
//     const body = await resp.json();

//     if (body.ok) {
//       localStorage.setItem("token", body.token);
//       localStorage.setItem("token-init-date", new Date().getTime());

//       dispatch(
//         login({
//           uid: body.uid,
//           name: body.name,
//         })
//       );
//     } else {
//       Swal.fire("Error", body.msg, "error");
//     }
//   };
// };

export const startLogin = (userName, password) => {
  return (dispatch) => {
    const token = "est-es-un-token-fake";
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    dispatch(
      login({
        userName,
        token,
      })
    );
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { email, password, name },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

// export const startChecking = () => {
//   return async (dispatch) => {
//     const resp = await fetchConToken("auth/renew");
//     const body = await resp.json();

//     if (body.ok) {
//       localStorage.setItem("token", body.token);
//       localStorage.setItem("token-init-date", new Date().getTime());

//       dispatch(
//         login({
//           uid: body.uid,
//           name: body.name,
//         })
//       );
//     } else {
//       dispatch(checkingFinish());
//     }
//   };
// };

export const startChecking = () => {
  return async (dispatch) => {
    dispatch(
      login({
        token: localStorage.getItem("token") || null,
        name: localStorage.getItem("name") || null,
        userName: localStorage.getItem("userName") || null,
      })
    );
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
