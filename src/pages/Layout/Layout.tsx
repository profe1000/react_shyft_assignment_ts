import "./Layout.css";
import { Outlet, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="w3-light-grey">
      <Navbar></Navbar>

      <div className="w3-margin-bottom">
        <Link
          className="w3-btn w3-round w3-white w3-col l4 s4 m4 w3-border"
          to="/"
        >
          Home
        </Link>
        <Link
          className="w3-btn w3-round w3-white w3-col l4 s4 m4 w3-border"
          to="/about"
        >
          About
        </Link>
        <Link
          className="w3-btn w3-round w3-white w3-col l4 s4 m4 w3-border"
          to="/404"
        >
          Wrong Route
        </Link>
      </div>

      <div>
        <br />
        <Outlet />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Layout;
