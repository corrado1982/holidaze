import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { onLogin } from "../auth/login.jsx";

const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .required("Please enter your email!")
      .matches(/(stud.noroff.no)/),

    password: yup
      .string()
      .min(4, "Your password must be more then 4 character")
      .max(100, "Your password must be 100 or lower")
      .required("Please enter a password"),
  })
  .required();

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <form
        className="flex flex-col card-bg  size-1/2 m-auto"
        onSubmit={handleSubmit(onLogin)}
      >
        <h1 className="mx-auto flex justify-center my-10">Login Page</h1>
        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="password">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.password?.message}</p>
        </div>

        <button className="btn-primary m-auto my-10" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
