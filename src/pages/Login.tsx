import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../types";
import ErrorMessage from "../componets/ErrorMessage";
import { setUser } from "../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../store/hooks";
import Spinner from "../componets/Spinner";
import toast from "react-hot-toast";
import { saveUserDataToLocalstorage } from "../utils/saveUserDataToLocalStorage";

const Login: FC = () => {
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
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const existUser = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const { user } = existUser;
      dispatch(
        setUser({ email: user.email, id: user.uid, token: user.refreshToken })
      );
      saveUserDataToLocalstorage({
        email: user.email,
        id: user.uid,
        token: user.refreshToken,
      });
      reset();
      toast("You are successfully logged in");
      navigate("/");
    } catch (error) {
      console.error(error, "Error with login");
      toast("This user doesn't exist!");
    } finally {
      setLoading(false);
    }
  });
  return (
    <article className="flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-[300px] h-[400px] sm:w-[380px] lg:w-[450px] bg-red-50 rounded-md flex flex-col items-center py-4 space-y-4 "
      >
        <h2 className="text-xl uppercase text-gray-800 font-semibold pb-6">
          Login
        </h2>
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
            type="email"
            placeholder="Email"
            id="email"
            onBlur={() => {
              trigger("email");
            }}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div className="pb-3">
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
          aria-label="Login"
          className="inline-flex justify-evenly items-center w-36 py-3 rounded-lg bg-lime-500 hover:brightness-110 transition-colors disabled:bg-gray-400 disabled:brightness-100"
        >
          <span>Login</span>
          {loading && (
            <span>
              <Spinner />
            </span>
          )}
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/registration" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </article>
  );
};

export default Login;
