import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../constant/passwordSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.password);
  const navigate = useNavigate();
  useEffect(() => {
    if (submitted) {
      if (isLogin.isVerified) {
        navigate("/admin");
      } else {
        setError("Invalid Credential");
      }
      setSubmitted(false);
    }
  }, [submitted, isLogin, navigate]);

  const validateLogin = () => {
    if (!email) {
      return "Email ID is required.";
    }
    if (!password) {
      return "Password is required.";
    }

    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      email
    );
    if (!isEmailValid) {
      return "Email ID is not valid.";
    }

    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!isPasswordValid) {
      return "Password is not valid.";
    }

    return null;
  };
  const handleLogin = () => {
    setError("");
    const validateError = validateLogin();
    if (validateError) {
      setError(validateError);
      return;
    }
    dispatch(verify({ email, password }));
    setSubmitted(true);
  };
  return (
    <>
      <span className=" text-lg mt-10 text-center my-3">
        For login use Email ID : admin@gmail.com , Password :Admin@123{" "}
      </span>
      <div className="w-96 p-5 rounded-lg mt-10 border mx-auto flex flex-col gap-5">
        <span className="badge badge-lg text-lg my-3">Login for Dashboard</span>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <span className="text-sm text-red-500">{error}</span>
        <button
          className="btn btn-active  mx-auto btn-ghost"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
