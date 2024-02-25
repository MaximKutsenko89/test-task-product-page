import { useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/api";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { LoginParams } from "@/types";
import { useNavigate } from "react-router-dom";
import useUser from "@/redux/hooks/useUser";
import router from "@/router";

export default function AuthPage() {
  const [showPassWord, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginParams>({
    // defaultValues: { email: "admin@test.com", password: "admin123" },
  });
  const [login, { isLoading, isError, status, data }] = useLoginMutation();
  const { setIsUserAuthorized } = useUser();

  const onSubmit: SubmitHandler<LoginParams> = async (data) => {
    login(data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      setIsUserAuthorized(
        data?.access_token as string,
        data?.user.name as string
      );
      navigate(`${router.products}?page=1`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <header>
        <h1>Auth Page</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            className={clsx("form__input", {
              ["invalid"]: errors.email,
            })}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "incorrect email format",
              },
            })}
          />
          {errors.email && (
            <p role="alert" className="form__error">
              {errors.email.message}
            </p>
          )}
          <div className="form__input-wrap">
            <input
              className={clsx("form__input", {
                ["invalid"]: errors.password,
              })}
              type={showPassWord ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password Min Length is 8" },
              })}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="form__password-btn"
            >
              {showPassWord ? "Hide" : "Show"}
            </div>
          </div>

          {errors.password && (
            <p role="alert" className="form__error">
              {errors.password.message}
            </p>
          )}
          {isError && (
            <p role="alert" className="form__error">
              Internal server error. Please try again later
            </p>
          )}
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
}
