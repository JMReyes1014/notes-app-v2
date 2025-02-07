import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Swal from 'sweetalert2';

function Register({ route, method }) {
  useEffect(() => {
    document.title = 'Notes App | Register';
  }, []);

  const [navigate, setNavigate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLoginClick = () => {
    setNavigate(true);
  };

  if (navigate) {
    window.location.href = '/login';
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (validatePassword(password)) {
      setPasswordError("Password is strong.");
    } else {
      setPasswordError("Password must be at least 8 characters long, contain at least one uppercase letter and one special character.");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (confirmPassword === password) {
      setConfirmPasswordError("Passwords match.");
    } else {
      setConfirmPasswordError("Passwords do not match.");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, contain at least one uppercase letter and one special character.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      console.log(`Sending request to ${route} with username: ${username} and password: ${password}`);
      const res = await api.post(route, { username, password }); // Use the api instance for the POST request
      console.log('Response:', res);
      if (method === 'register') {
        localStorage.setItem('ACCESS_TOKEN', res.data.access_token);
        localStorage.setItem('REFRESH_TOKEN', res.data.refresh_token);
        localStorage.setItem('registration_success', 'true');
        nav('/login');
      } else {
        nav('/register');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: 'gray',
        background: '#0e0d0d',
        color: 'white',
        iconColor: 'gray',
      });
    } finally {
      setLoading(false);
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
                  <h2 className="text-uppercase text-center mb-5">Register</h2>

                  <form method="POST" onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        name="username"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Enter Username
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <label className="form-label" htmlFor="password">
                        Enter Password
                      </label>
                      <br />
                      <small
                        id="passwordHelp"
                        className={`form-text ${validatePassword(password) ? 'text-success' : 'text-danger'}`}
                      >
                        {passwordError}
                      </small>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        className="form-control form-control-lg"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      <label className="form-label" htmlFor="confirm_password">
                        Confirm Password
                      </label>
                      <br />
                      <small
                        id="confirmPasswordHelp"
                        className={`form-text ${confirmPassword === password ? 'text-success' : 'text-danger'}`}
                      >
                        {confirmPasswordError}
                      </small>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-dark btn-block btn-lg"
                        id="submitButton"
                        disabled={loading}
                      >
                        Create Account
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account? {" "}
                      <span onClick={handleLoginClick} style={{ cursor: 'pointer' }} className="fw-bold text-body">
                        <u>Login here</u>
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

export default Register;