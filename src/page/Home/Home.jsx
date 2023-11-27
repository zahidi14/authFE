import React, { useEffect, useState } from "react";
import "../../index.css";
import img from "../../assets/j.jpg";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../component";

const Home = () => {
  const [cookie, removeCookie] = useCookies();
  const [username, setUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookie.token) {
        navigate("/login");
      }

      const { data } = await axios.post(
        "https://auth-be-rose.vercel.app/",
        {},
        { withCredentials: true }
      );
      console.log(data);
      const { status, user } = data;
      setUser(user);
      console.log(user);
      return status
        ? toastInfo(user)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookie, navigate, removeCookie]);

  const toastInfo = (username) => {
    toast.info(`welcome ${username}`, {
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
  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div className="w-full h-screen flex">
      <div className="flex-auto w-left ">
        <img src={img} alt="" className="w-full h-screen object-cover " />
      </div>
      <div className="flex-auto w-right">
        <span>{username}</span>
        <Button name="LOGOUT" onClick={logout} />
      </div>
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
  );
};

export default Home;
