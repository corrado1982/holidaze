import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { BASE_URL } from "../constants/api";
// import { REGISTER_URL } from "../constants/api";
import { onRegister } from "../auth/register";

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .min(3, "Your first name should be at least 3 characters.")
      .max(100, "Your first name cannot be longer than 10 characters.")
      .required("Please enter your first name"),

    email: yup
      .string()
      .email()
      .required("Please enter your email!")
      .matches(/(stud.noroff.no)/),

    avatar: yup.string().url().typeError("Please use an URL"),

    password: yup
      .string()
      .min(8, "Your password must be more then 8 character")
      .max(100, "Your password must be 100 or lower")
      .required("Please enter a password"),
  })
  .required();

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // async function onRegister(data) {
  //   event.preventDefault();
  //   console.log(data);
  //   const response = await fetch(BASE_URL + REGISTER_URL, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  //   console.log(response);
  //   console.log(data.password);
  //   console.log(data.email);
  // }

  return (
    <div className="my-5 card-bg size-1/2 m-auto">
      <form className="py-5" onSubmit={handleSubmit(onRegister)}>
        <h1 className="mx-auto flex justify-center my-10">Register</h1>
        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="email" className="m-auto">
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
          <label htmlFor="avatar" className="m-auto">
            Avatar Url
          </label>
          <input
            {...register("avatar")}
            type="url"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.avatar?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="password" className="m-auto">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className="flex justify-center">
          <input {...register("venueManager")} type="checkbox" className="" />
          <label htmlFor="checkbox" className="">
            Register as a manager
          </label>
        </div>

        <button type="submit" className="btn-primary m-auto my-10 flex">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
