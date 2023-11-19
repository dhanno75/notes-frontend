import { useEffect } from "react";
import { Container } from "./styled_components/form";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signUpSchema } from "../schemas";
import { clearSomeState, signup } from "../redux/features/UserSlice";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Spinner = function () {
  return (
    <MutatingDots
      height="30"
      width="60"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="8"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.warn(error);
      dispatch(clearSomeState());
    }
    if (success) {
      toast.success(
        "Successful signup. Please check your email for email verification."
      );
      dispatch(clearSomeState());
      navigate("/dashboard");
    }
  }, [error, success, navigate]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        dispatch(signup(values));
      },
    });

  return (
    <Container>
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched ? (
            <span className="error">{errors.name}</span>
          ) : null}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched ? (
            <span className="error">{errors.email}</span>
          ) : null}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched ? (
            <span className="error">{errors.password}</span>
          ) : null}
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Repeat Password"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.passwordConfirm && touched ? (
            <span className="error">{errors.passwordConfirm}</span>
          ) : null}
          <div className="btn">
            <Link to="/login">Already have an account?</Link>
            <button type="submit">{loading ? <Spinner /> : "Register"}</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
