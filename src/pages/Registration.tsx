import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../componets/ErrorMessage";
import { RegisterData } from "../types";
import { FC, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import Spinner from "../componets/Spinner";
import { saveUserDataToLocalstorage } from "../utils/saveUserDataToLocalStorage";

const Registration: FC = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const createUser = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const { user } = createUser;
      dispatch(
        setUser({ email: user.email, id: user.uid, token: user.refreshToken })
      );
      saveUserDataToLocalstorage({
        email: user.email,
        id: user.uid,
        token: user.refreshToken,
      });
      reset();
      toast("You have successfully registered");
      navigate("/");
    } catch (error) {
      console.error(error, "Error with Register");
      toast("Something went wrong when trying to register");
    } finally {
      setLoading(false);
    }
  });

  return (
    <article className="flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-[300px] h-[550px] sm:w-[380px] lg:w-[450px] bg-red-50 rounded-md flex flex-col items-center py-4 space-y-4 "
      >
        <h2 className="text-xl uppercase text-gray-800 font-semibold pb-6">
          Registration
        </h2>
        <div>
          <label htmlFor="firstName" className="py-1 font-semibold block">
            First Name
          </label>
          <input
            {...register("firstName", {
              required: "This field is required",
              pattern: {
                value: /^[^\d][\w\d]*$/,
                message: "First character cannot be a number",
              },
              minLength: {
                value: 6,
                message: "Min Length is 6",
              },
            })}
            className="mb-1 px-3 py-2 w-[250px] outline-none shadow-md ring-1 ring-red-300 rounded-sm bg-slate-100"
            type="text"
            placeholder="First Name"
            id="firstName"
          />
          <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="lastName" className="py-1 font-semibold block">
            Last Name
          </label>
          <input
            {...register("lastName", {
              required: "This field is required",
              pattern: {
                value: /^[^\d][\w\d]*$/,
                message: "First character cannot be a number",
              },
              minLength: {
                value: 6,
                message: "Min Length is 6",
              },
            })}
            className="mb-1 px-3 py-2 w-[250px] outline-none shadow-md ring-1 ring-red-300 rounded-sm bg-slate-100"
            type="text"
            placeholder="Last Name"
            id="lastName"
          />
          <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="email" className="py-1 font-semibold block">
            Email
          </label>
          <input
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid Email address",
              },
            })}
            className="mb-1 px-3 py-2 w-[250px] outline-none shadow-md ring-1 ring-red-300 rounded-sm bg-slate-100"
            type="text"
            placeholder="Email"
            id="email"
            onBlur={() => {
              trigger("email");
            }}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div>
          <label htmlFor="password" className="py-1 font-semibold block">
            Password
          </label>
          <input
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Min Length is 6",
              },
            })}
            className="mb-1 px-3 py-2 w-[250px] outline-none shadow-md ring-1 ring-red-300 rounded-sm bg-slate-100"
            type="password"
            placeholder="Password"
            id="password"
            onBlur={() => {
              trigger("password");
            }}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        <button
          disabled={loading}
          type="submit"
          aria-label="Register"
          className="inline-flex justify-evenly items-center w-40 py-3 rounded-lg bg-lime-500 hover:brightness-110 transition-colors disabled:bg-gray-400 disabled:brightness-100"
        >
          <span>Register</span>
          {loading && (
            <span>
              <Spinner />
            </span>
          )}
        </button>
        <p>
          Already registered?{" "}
          <Link to="/registration" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </article>
  );
};

export default Registration;
