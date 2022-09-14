import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAllProducts } from "../services/ApiCalls";
import DashboardLayout from "./DashboardLayout";
import Loading from "../common/Loading";
import { AddEdit } from "../common/AddEdit";
import { DeleteProduct } from "../common/DeleteProduct";

interface productListType {
  id?: number | null;
  title: string;
  thumbnail?: string;
  Description?: string;
  price?: number | null;
  rating?: number | null;
  brand: string;
}
export const Products = () => {
  const [products, setProducts] = useState<productListType[]>();
  const [searchproduct, setSearchProduct] = useState("");
  const [isLoader, setLoader] = useState(false);
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<any>("");
  const [editProduct, setEditProduct] = useState<any>("");

  /***************** for get all products************** */
  const allProducts = async (searchproduct: string) => {
    setLoader(true);
    // try {
    let ans = await getAllProducts(searchproduct);
    // if (ans.status == 200 || ans.status == 201) {
    setProducts(ans?.data.products);
    setLoader(false);
  };
  // } catch (err) {
  // alert(err);
  // }
  // };
  useEffect(() => {
    allProducts(searchproduct);
  }, [searchproduct]);
  const handleAddProduct = () => {
    setEditProduct(null);
    setOpenOffCanvas(true);
  };
  const handleEditProduct = (product: any) => {
    setEditProduct(product);
    setOpenOffCanvas(true);
  };

  return (
    <DashboardLayout>
      <div className="px-3">
        <h1 className="mt-5">Products</h1>
        <div className="form-outline">
          <div className="product_search">
            <input
              type="search"
              id="form1"
              value={searchproduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>
        <div className="prod_add_btn">
          <button
            type="button"
            className="btn btn-primary custom_btn"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>

        <div>
          <Container>
            <Row className="g-4">
              {products && products.length > 0 ? (
                products.map((item, id) => (
                  <Col md={4}>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                      <div className="card">
                        <div className="card-body">
                          <div className="delete_edit_btn">
                            <button
                              className="card-edit"
                              onClick={() => {
                                handleEditProduct(item);
                              }}
                            >
                              edit
                            </button>
                            <button
                              className="card-delete"
                              onClick={() => {
                                setDeleteProduct(item);
                                setOpenModal(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                          <div className="thumImg">
                            <img src={item.thumbnail} />
                          </div>
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.brand}</p>
                          <p className="card-text">${item.price}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <>
                  <div className="">No Data Found</div>
                </>
              )}
            </Row>
          </Container>
        </div>
      </div>
      <AddEdit
        openOffCanvas={openOffCanvas}
        setOpenOffCanvas={setOpenOffCanvas}
        setProducts={setProducts}
        products={products}
        editProduct={editProduct}
      />
      <DeleteProduct
        openModal={openModal}
        setOpenModal={setOpenModal}
        deleteProduct={deleteProduct}
        setDeleteProduct={setDeleteProduct}
        setProducts={setProducts}
        products={products}
      />
      {isLoader && <Loading />}
    </DashboardLayout>
  );
};
