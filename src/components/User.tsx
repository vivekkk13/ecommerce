import { useEffect, useState } from "react";
import { Button, Container, Modal, Offcanvas } from "react-bootstrap";
import { createUser, getUsers } from "../services/ApiCalls";
import DashboardLayout from "./DashboardLayout";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../common/Loading";
import * as Yup from "yup";
import swal from "sweetalert";

interface users {
  id?: number | null;
  image: string | React.ChangeEvent<HTMLInputElement> | null;
  firstName: string;
  lastName: string;
  maidenName: string;
  gender: number | null;
  age: number | null;
  email: string;
}

export default function User() {
  const [users, setUsers] = useState<users[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [adddUser, setAddUser] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  let [checkdelete, setCheckDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editUser, setEditUser] = useState({
    check: false,
    data: {
      id: "",
      image: "",
      firstName: "",
      lastName: "",
      maidenName: "",
      age: null,
      email: "",
    },
  });

  /**********************************get all the users *********** */

  const gettotalUsers = async (searchUser: any) => {
    setIsLoading(true);
    let ans = await getUsers(searchUser);
    setUsers(ans?.data.users);
    setIsLoading(false);
  };
  useEffect(() => {
    gettotalUsers(searchUser);
  }, [searchUser]);

  /************************************ For Deleting a user**************** */
  const deleteUser = (item: any) => {
    let deletedUser = users.filter((value) => value.id != item.id);
    setUsers(deletedUser);
    toast("deleted Successfully");
  };

  /*************for opening offcanvas************ */
  const [showw, setShoww] = useState(false);

  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  /****************  Add a new User*********************** */

  /************* yup validation        ***  ***************/
  const formValidation = Yup.object({
    firstName: Yup.string().max(20, "").required("name is required"),
    lastName: Yup.string()
      .max(20, "must be 20 character or less")
      .required("name is required!"),
    maidenName: Yup.string()
      .max(20, "must be 20 character or less ")
      .required("Middlename is required!"),
    age: Yup.number().max(100, "too short").required("age is required!"),
    email: Yup.string()
      .email("Email should be valid and contain @")
      .required("Email is required"),
  });
  /************ for adding a new User******************************** */
  const addNewUser = async (values: any) => {
    const response = await createUser(values);
    console.log("response <===> ", response);
    setAddUser(response?.data);
  };

  useEffect(() => {
    const newAns = [...users];
    newAns.unshift(adddUser);
    setUsers(newAns);
  }, [adddUser]);

  /*********************** for edit a user********************** */

  const EditUser = (values: any) => {
    let newArr = [...users];
    let index = newArr.findIndex((item) => item.id === values.id);
    console.log("index =====>", index);

    newArr[index] = { ...newArr[index], ...values };

    setUsers(newArr);
  };

  return (
    <DashboardLayout>
      {isLoading && <Loading />}
      <div className="px-3">
        <h1 className="mt-5">Users</h1>
        <div className="form-outline">
          <div className="search_user">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
        </div>
        <div className="Add_btn ">
          <button
            className="btn btn-primary custom_btn"
            type="submit"
            onClick={() => {
              setEditUser({
                check: false,
                data: {
                  id: "",
                  image: "",
                  firstName: "",
                  lastName: "",
                  maidenName: "",
                  age: null,
                  email: "",
                },
              });

              handleShoww();
            }}
          >
            Add user
          </button>
        </div>
        <Container>
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">image</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">maidenName</th>
                <th scope="col">age</th>
                <th scope="col">email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item: any) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="image">
                      {typeof item.image === "string" ? (
                        <img src={item.image}></img>
                      ) : (
                        ""
                      )}
                    </td>
                    <td scope="row">{item.firstName}</td>
                    <td scope="row">{item.lastName}</td>
                    <td scope="row">{item.maidenName}</td>
                    <td scope="row">{item.age}</td>
                    <td scope="row">{item.email}</td>
                    <td>
                      {" "}
                      <div className="edit_btn">
                        <button
                          className="btn btn-primary custom_btn btn-sm"
                          onClick={() => {
                            setEditUser({ check: true, data: item });
                            handleShoww();
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="delete_btn">
                        <button
                          className="btn btn-primary custom_btn btn-sm"
                          onClick={() => {
                            setCheckDelete(item);
                            setOpenModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
        <Offcanvas placement="end" show={showw} onHide={handleClosee}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {editUser.check ? "Edit User" : "Add User"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Formik
              initialValues={{
                id: editUser.check ? editUser.data.id : "",
                image: "",
                firstName: editUser.check ? editUser.data.firstName : "",
                lastName: editUser.check ? editUser.data.lastName : "",
                maidenName: editUser.check ? editUser.data.maidenName : "",
                age: editUser.check ? editUser.data.age : null,
                email: editUser.check ? editUser.data.email : "",
              }}
              validationSchema={formValidation}
              onSubmit={(values) => {
                if (editUser.check) {
                  EditUser(values);
                  handleClosee();
                } else {
                  addNewUser(values);
                  handleClosee();
                }
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="mb-3 mt-3">
                    <label className="form-label">image</label>
                    <Field
                      name="image"
                      className="form-control"
                      type="file"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement> | null
                      ) => {
                        if (event?.currentTarget?.files) {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }
                      }}
                    />
                    {errors.image && touched.image ? (
                      <div className="errorm">{"please select image"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">FirstName</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="Firstname..."
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="errorm">{"firstname is required!"}</div>
                    ) : null}
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label">lastName</label>
                    <Field
                      name="lastName"
                      className="form-control"
                      placeholder="Lastname..."
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="errorm">{"lastname is required!"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">Mname</label>
                    <Field
                      name="maidenName"
                      className="form-control"
                      placeholder="Middlename..."
                    />
                    {errors.maidenName && touched.maidenName ? (
                      <div className="errorm">{"middlename is required!"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label>Age</label>
                    <Field
                      name="age"
                      className="form-control"
                      placeholder="Age..."
                    />
                    {errors.age && touched.age ? (
                      <div className="errorm">{"age is required!"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <Field
                      name="email"
                      className="form-control"
                      placeholder="Email..."
                    />

                    {errors.email && touched.email ? (
                      <div className="errorm">{errors.email}</div>
                    ) : null}
                  </div>
                  <Button type="submit" className="btn_sub">
                    Submit{" "}
                  </Button>
                  <ToastContainer />
                </Form>
              )}
            </Formik>
          </Offcanvas.Body>
        </Offcanvas>
        <Modal show={openModal} onHide={() => setOpenModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete user
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteUser(checkdelete);
                  setOpenModal(false);
                }}
              >
                yes
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
}
