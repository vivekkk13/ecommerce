import { Link } from "react-router-dom";
export const Sidebar = () => {
  return (
    <div>
      <div className="shadow bg-body rounded">
        <div className="contain">
          <ul className="sidebar">
            <div className="dash_board">
              <span className="dashboardicon">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </span>
              <Link to="/dashboard" className="link-dark">
                <span className="spanall">Dashboard</span>
              </Link>
            </div>

            <div className="u_ser">
              <span className="usericon">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <Link to="/User" className="link-dark">
                <span className="spanall"> Users</span>
              </Link>
            </div>
            <div className="pro_duct">
              <span className="producticon">
                <i className="fa fa-shopping-cart"></i>
              </span>

              <Link to="/products" className="link-dark">
                <span className="spanall"> Products</span>
              </Link>
            </div>
          </ul>

          <div className="content"></div>
        </div>
      </div>
    </div>
  );
};
