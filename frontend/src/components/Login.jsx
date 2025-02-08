import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Swal from "sweetalert2";

function Login({ route, method }) {
  useEffect(() => {
    document.title = "Notes App | Login";
    checkLogoutSuccess();
    checkRegistrationSuccess();
  }, []);

  const [navigate, setNavigate] = useState(false);

  const handleRegisterClick = () => {
    setNavigate(true);
  };

  if (navigate) {
    window.location.href = "/register";
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem('login_success', 'true');
        nav('/');
      } else {
        nav('/login');
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Wrong Username or Password. Please try again." || error.message,
        confirmButtonText: "OK",
        confirmButtonColor: "gray",
        background: "#0e0d0d",
        color: "white",
        iconColor: "gray",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkLogoutSuccess = () => {
    const logoutSuccess = localStorage.getItem('logout_success');
    if (logoutSuccess) {
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        text: "You have been logged out successfully.",
        confirmButtonText: "OK",
        confirmButtonColor: "gray",
        background: "#0e0d0d",
        color: "white",
        iconColor: "gray",
      });
      localStorage.removeItem('logout_success');
    }
  };

  const checkRegistrationSuccess = () => {
    const registrationSuccess = localStorage.getItem('registration_success');
    if (registrationSuccess) {
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have been registered successfully. Please log in.",
        confirmButtonText: "OK",
        confirmButtonColor: "gray",
        background: "#0e0d0d",
        color: "white",
        iconColor: "gray",
      });
      localStorage.removeItem('registration_success');
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "rgb(31, 29, 29)" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="username"
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Enter Username
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="password"
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Enter Password
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        type="submit"
                        className="btn btn-dark btn-block btn-lg"
                        name="login"
                        value="Login"
                      />
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Don't have an account?{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        className="fw-bold text-body"
                        onClick={handleRegisterClick}
                      >
                        <u>Register here</u>
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;