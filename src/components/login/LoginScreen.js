import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { startLogin } from "../../actions/auth";

const initValues = {
  username: localStorage.getItem("userNameSaved") || "",
  password: "",
};

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initValues);
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberUser, setRememberUser] = useState(
    localStorage.getItem("userNameSaved") && true
  );
  console.log(rememberUser);
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { username, password } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleRememberUser = () => {
    setRememberUser(!rememberUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setValid(true);

    if (username !== "admin" || password !== "admin") {
      setValid(false);
      setLoading(false);
      setFormValues(initValues);
      return;
    }

    if (!rememberUser) {
      localStorage.setItem("userNameSaved", username);
    } else {
      localStorage.removeItem("userNameSaved");
    }

    setTimeout(() => {
      dispatch(startLogin(username, password));
    }, 1000);
  };

  return (
    <section>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <form className="theme-form login-form" onSubmit={handleSubmit}>
                <h4 className="text-center">Ingreso</h4>
                <h6>Bienvenido al sistema</h6>
                <div className="form-group">
                  {!valid && (
                    <div className="text-center text-danger">
                      Credenciales incorrectas
                    </div>
                  )}

                  <label>Usuario</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>

                    <input
                      type="text"
                      className={`form-control  ${!valid && "is-invalid"}`}
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className={`form-control ${!valid && "is-invalid"}`}
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      onChange={handleInputChange}
                      required
                      autoComplete="off"
                    />
                    <div className="show-hide">
                      <span className="" onClick={togglePassword}>
                        {passwordShown ? (
                          <FontAwesomeIcon icon="fa-regular fa-eye" />
                        ) : (
                          <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="">
                    {/* <input
                      type="checkbox"
                      id="checkbox"
                      checked={rememberUser}
                    /> */}
                    <Form.Check
                      type="checkbox"
                      id={`default-checkbox`}
                      label="Recordar usuario"
                      onChange={handleRememberUser}
                      checked={rememberUser}
                      onClick={handleRememberUser}
                    />
                  </div>
                  <a className="link" href="forget-password.html">
                    Olvidé mi contraseña
                  </a>
                </div>
                <div className=" mt-5">
                  <button className="btn btn-primary col-4" type="submit">
                    {loading ? (
                      <div className="text-center">
                        <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin />{" "}
                      </div>
                    ) : (
                      "Ingresar"
                    )}
                  </button>
                </div>
                {/* <div className="login-social-title">
                  <h5>Sign in with</h5>
                </div>

                <p>
                  Don't have account?
                  <a className="ms-2" href="log-in.html">
                    Create Account
                  </a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
