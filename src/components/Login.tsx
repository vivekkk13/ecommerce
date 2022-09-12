import { Col, Row } from "react-bootstrap";
import img2 from "../assets/images/img2.png";
import { Formik } from "formik";
import * as yup from "yup";
import { LoginApi } from "../services/ApiCalls";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const SignupSchema = yup.object().shape({
    password: yup.string().required("Please provide a valid password"),
  });

  const getLoginApi = async (values: any) => {
    let ans: any = await LoginApi(values);
    console.log("ans==>", ans);

    if (ans.status === 200) {
      localStorage.setItem("token", ans.data.token);
      navigate("/dashboard");
      console.log("sdfsfgsdfs");
    } else {
      toast.error("invalid credentials");
    }
  };
  useEffect(() => {
    const name = localStorage.getItem("token");

    if (name) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div>
        <div className="container-fluid">
          <Row>
            <Col xs={6} className="p-0">
              <div className="imgbox">
                <img src={img2} alt="" className="center-fit" />
              </div>
            </Col>
            <Col xs={6} className="bg_color">
              <div className="log_content">
                <div>
                  <div>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={SignupSchema}
                      onSubmit={(values) => {
                        getLoginApi(values);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="form-outline mb-4">
                            <div className="inputform1">
                              <div className="inputlabel1">
                                <label className="form-label">username</label>
                              </div>
                              <input
                                id="form2Example1"
                                className="form-control"
                                type="name"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                              />
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <div className="inputform2">
                              <div className="inputlabel2">
                                <label className="form-label">Password</label>
                              </div>
                              <input
                                type="password"
                                id="form2Example2"
                                className="form-control"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                            </div>
                          </div>

                          <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                              <div className="form-check">
                                <div className="formcheckbox">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="form2Example31"
                                    checked
                                  />
                                  <label className="form-check-label">
                                    Remember me
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col">
                              <div className="formforgotpassword">
                                <a>Forgot password?</a>
                              </div>
                            </div>
                          </div>

                          <div className="formbutton">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block mb-4 custom_btn"
                            >
                              LOGIN
                            </button>
                          </div>
                          <div className="formsignup">
                            <div className="text-center">
                              <p>
                                Not a member? <a href="#!">Register</a>
                              </p>
                              <p>or sign up with:</p>
                              <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                              >
                                <i className="fab fa-facebook-f"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                              >
                                <i className="fab fa-google"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-link btn-floating mx-1"
                              >
                                <i className="fab fa-twitter"></i>
                              </button>

                              <button
                                type="submit"
                                className="btn btn-link btn-floating mx-1"
                              >
                                <i className="fab fa-github"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
