import React from "react";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

interface Iprops {
  openModal: boolean;
  setOpenModal: (active: boolean) => void;
  deleteProduct: any;
  setDeleteProduct: any;
  setProducts: any;
  products: any;
}
export const DeleteProduct = ({
  openModal,
  setOpenModal,
  deleteProduct,
  setDeleteProduct,
  setProducts,
  products,
}: Iprops) => {
  const handleSubmit = (item: any) => {
    let deletedProduct = products.filter((value: any) => value.id != item.id);
    setProducts(deletedProduct);
  };
  return (
    <>
      <div>
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
                  handleSubmit(deleteProduct);
                  setOpenModal(false);
                  toast("deleted Successfully");
                }}
              >
                yes
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
};
