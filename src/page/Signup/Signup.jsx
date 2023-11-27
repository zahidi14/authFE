import React, { useState } from "react";
import { Button, Input } from "../../component";
import img from "../../assets/bsg.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [FormData, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setForm({ ...FormData, [e.target.name]: e.target.value });
  };

  const toastError = (err) => {
    toast.error(err, {
      position: "bottom-center",
    });
  };

  const toastSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const { username, email, password } = FormData;
    console.log("username", username);
    console.log("email", email);
    console.log("password", password);

    axios
      .post(
        "https://auth-be-green.vercel.app/signup",
        { ...FormData },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("result", response.data);
        const { success, message } = response.data;
        if (success) {
          toastSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toastError(message);
        }
      })
      .catch((err) => {
        console.log("error post axios", err);
        toastError("error ");
      });
  };

  return (
    <div className="w-full h-screen flex">
      <div className="flex-auto w-left ">
        <img src={img} alt="" className="w-full h-screen object-cover " />
      </div>
      <div className="flex-auto w-right flex items-center justify-center">
        <div className="flex flex-col w-10/12">
          <Input
            label="username"
            name="username"
            inputLabel="Username:"
            value={FormData.username}
            onChange={inputHandle}
            required
          />
          <Input
            label="email"
            name="email"
            inputLabel="Email:"
            value={FormData.email}
            onChange={inputHandle}
            required
          />
          <Input
            label="password"
            name="password"
            inputLabel="Password:"
            value={FormData.password}
            onChange={inputHandle}
            required
          />
          <Button name="Sign Up" onclick={submitForm} />
          Already have an account? <Link to="/login">login here</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
