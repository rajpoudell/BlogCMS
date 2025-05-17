import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface LoginFormInputs {
  email: string;
  password: string;
}
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setErrorMessage(""); // Clear previous error
      await login(data?.email, data?.password);
      toast.success("Successfully Login!");

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setErrorMessage(error.message);
      } else {
        toast.error("Something went wrong");
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errorMessage && (
          <p className="text-red-500 text-center text-sm mb-4">
            {errorMessage}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-slate-700 text-sm mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-slate-700 text-sm mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className=" w-full py-2 px-4 rounded hover:bg-slate-700 transition btn bg-slate-900   text-white cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
