import React, { useState } from "react";
import img from "../../assets/dfa.jpg";
import { Button, Input } from "../../component";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [FormData, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...FormData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const toastSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const toastError = (err) => {
    toast.error(err, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const log = (e) => {
    e.preventDefault();
    const { email, password } = FormData;
    setLoading(true);
    console.log("email", FormData.email);

    axios
      .post(
        "https://auth-be-rose.vercel.app/login",
        { ...FormData },
        { withCredentials: true }
      )
      .then((response) => {
        const { message, success } = response.data;
        console.log(message);

        if (success) {
          setLoading(false);
          toastSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setLoading(false);
          toastError(message);
        }
      })
      .catch((err) => {
        console.log("cannot login", err);
      });
  };
  return (
    <div className="w-full h-screen flex">
      <div className="flex-auto w-left ">
        <img src={img} alt="" className="w-full h-screen object-cover " />
      </div>
      <div className="flex-auto flex-col w-right flex items-center justify-center">
        <div className="">
          <h1>
            <Link to="/home">Blog</Link>{" "}
          </h1>
        </div>
        <div className="flex flex-col w-10/12">
          <form onSubmit={log}>
            <Input
              type="text"
              label="email"
              inputLabel="Email:"
              name="email"
              value={FormData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="password"
              inputLabel="Password:"
              password="password"
              name="password"
              value={FormData.password}
              onChange={handleChange}
            />
            <Button type="submit" name="Login" loading={loading} />
          </form>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <span>
          Don't have account? <Link to="/signup">Sign Up here</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
