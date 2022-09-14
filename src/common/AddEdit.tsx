import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

interface Iprops {
  openOffCanvas: boolean;
  setOpenOffCanvas: (active: boolean) => void;
  setProducts: any;
  products: any;
  editProduct: any;
}

export const AddEdit = ({
  openOffCanvas,
  setOpenOffCanvas,
  setProducts,
  products,
  editProduct,
}: Iprops) => {
  const [formValues, setFormValues] = useState({
    title: editProduct ? editProduct.brand : "",
    brand: "",
    price: "",
  });
  //   console.log(formValues.price, "formValue");
  /***************** on from submit ********************** */
  const handleSubmit = () => {
    if (!editProduct) {
      setOpenOffCanvas(false);
      setFormValues({
        title: "",
        brand: "",
        price: "",
      });
      setProducts([...products.unshift(formValues)]);
    } else {
      console.log("edit-====>", editProduct);
      setOpenOffCanvas(false);
      let newArr = [...products];
      let index = newArr.findIndex((item) => item.id === editProduct.id);
      console.log("index =====>", index);

      newArr[index] = { ...formValues };
      console.log("newarrr=>", newArr);

      setProducts(newArr);
    }
  };

  const handleValues = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (editProduct) {
      setFormValues({
        title: editProduct.title,
        brand: editProduct.brand,
        price: editProduct.price,
      });
    }
  }, [editProduct]);

  return (
    <>
      <Offcanvas show={openOffCanvas} onHide={setOpenOffCanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {editProduct ? "Edit product" : "Add Product"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="input"
                value={formValues.title}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="title"
                onChange={handleValues}
              ></input>
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="input"
                value={formValues.price}
                className="form-control"
                id="exampleInputPassword1"
                aria-describedby="emailHelp"
                name="price"
                onChange={handleValues}
              ></input>
            </div>

            <div className="mb-3">
              <label className="form-label">Brand</label>
              <input
                type="input"
                className="form-control"
                defaultValue={editProduct ? editProduct.brand : ""}
                value={formValues.brand}
                id="exampleInputPassword1"
                aria-describedby="emailHelp"
                name="brand"
                onChange={handleValues}
              ></input>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
