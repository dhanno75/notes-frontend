import { Container } from "./styled_components/form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { forgotPassword } from "../redux/features/UserSlice";
import { forgotPasswordSchema } from "../schemas";
import { useDispatch } from "react-redux";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (values) => {
        dispatch(forgotPassword(values));
        navigate("/login");
      },
    });

  return (
    <Container>
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
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

          <div className="btn" style={{ justifyContent: "flex-end" }}>
            <button type="submit">Forgot Password</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
