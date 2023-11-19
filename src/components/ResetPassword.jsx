import { useEffect } from "react";
import { Container } from "./styled_components/form";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetYourPassword } from "../schemas";
import { resetPassword } from "../redux/features/UserSlice";
import { toast } from "react-toastify";

const initialValues = {
  password: "",
  passwordConfirm: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { error, success } = useSelector((state) => state.user);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: resetYourPassword,
      onSubmit: (values) => {
        dispatch(resetPassword({ values, token }));
        navigate("/login");
      },
    });

  useEffect(() => {
    if (error) {
      toast.warn("error");
    }
    if (success) {
      toast.warn("Password changed successfully");
    }
  });

  return (
    <Container>
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
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

          <div className="btn" style={{ justifyContent: "flex-end" }}>
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
