import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import "./loginstyle.css";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AvatarIMG from "../images/AvatarIMG";

const FormikForm = () => {
  const [_, setCookies] = useCookies();
  const userID = window.localStorage.getItem("userID");

  const [avatar, setAvatar] = useState(
    "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const FormSchema = Yup.object({
    email: Yup.string().email("Please enter email").required("email is must"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        avatar: avatar,
      },
      validationSchema: FormSchema,

      onSubmit: async (value, action) => {
        // main logic
        const response = await axios
          .post("http://localhost:3000/auth/register", {
            username: value.email,
            password: value.password,
            avatar: value.avatar,
          })
          .then((response) => {
            if (response.data.message === "User already exist") {
              alert("Already registered please login...");
              navigate("/login");
            } else {
              console.log(response.data, "Register seccessful");
              setCookies("access_token", response.data.token);
              window.localStorage.setItem("userID", response.data.userID);
              window.localStorage.setItem("username", value.email);
              navigate("/");
            }
          });
        // main logic ends

        console.log(value);
        action.resetForm();
      },
    });

  return (
    <div className="flex w-full login  mt-5 justify-center">
      <div class="bg-white shadow-md lg:w-[700px] md:w-[600px] w-[90%] rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="text-2xl text-center p-2 font-semibold">Signup</h1>
        <form onSubmit={handleSubmit}>


          <label
            className="block text-grey-darker mt-3 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            className="shadow-sm appearance-none border rounded-xl w-full py-2 px-3 text-grey-darker"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />{" "}
          <br />
          {errors.email && touched.email ? (
            <span className="text-red-800">{errors.email}</span>
          ) : null}
          <br />
          <label
            className="block text-grey-darker mt-3 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            className="shadow-sm appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />{" "}
          <br />
          {errors.password && touched.password ? (
            <span className="text-red-800">{errors.password}</span>
          ) : null}
          <br />
          <label
            className="block text-grey-darker mt-3 text-sm font-bold mb-1"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            type="text"
            name="confirmPassword"
            className="shadow-sm appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />{" "}
          <br />
          {errors.confirmPassword && touched.confirmPassword ? (
            <span className="text-red-800">{errors.confirmPassword}</span>
          ) : null}
          <br />
          <input
            type="submit"
            className="bg-[#6C00FF] mt-4 hover:bg-[#6919da] text-white font-bold py-2 px-4 rounded"
            value="submit"
          />
        </form>

        <p className="mt-5 text-center">
          Already have an account
          <Link
            className="text-base rounded-md m-2 text-[#7052ca] hover:font-bold hover:text-[#5d3ac6]  font-medium"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormikForm;
