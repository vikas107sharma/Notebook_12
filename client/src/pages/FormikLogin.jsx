import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import "./loginstyle.css";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const FormikLogin = () => {
  const [_, setCookies] = useCookies();
  const navigate = useNavigate();
  const FormSchema = Yup.object({
    email: Yup.string().email("Please enter email").required("email is must"),
    password: Yup.string().required("Please Enter your password"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: FormSchema,
      onSubmit: async (value, action) => {
        // main logic
        const response = await axios
          .post("http://localhost:3000/auth/login", {
            username: value.email,
            password: value.password,
          })
          .then((response) => {
            if (response.data.message === "User does not exist") {
              alert("Incorrect username");
              navigate("/login");
            } else if (
              response.data.message === "Username or password incorrect"
            ) {
              alert("Username or password incorrect");
              navigate("/login");
            } else {
              console.log(response.data, "Login successful");
              setCookies("access_token", response.data.token);
              window.localStorage.setItem("userID", response.data.userID);
              window.localStorage.setItem("username", value.email);
              console.log(value.email);
              navigate("/");
            }
          })
          .catch((err) => {
            console.error("err ", err);
          });
        // main logic ends

        console.log(value);
        action.resetForm();
      },
    });

  return (
    <div className="flex w-full login  mt-5 justify-center">
      <div class="bg-white shadow-md lg:w-[700px] md:w-[600px] w-[90%] rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="text-2xl text-center p-2 font-semibold">Login</h1>
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
          <input
            type="submit"
            className="bg-[#6C00FF] mt-4 hover:bg-[#6919da] text-white font-bold py-2 px-4 rounded"
            value="Login"
          />
        </form>
        <p className="mt-5 text-center">
          Don't have an account
          <Link
            className="text-base rounded-md m-2 text-[#7052ca] hover:font-bold hover:text-[#5d3ac6]  font-medium"
            to="/register"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormikLogin;
