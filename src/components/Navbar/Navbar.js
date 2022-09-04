import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="w3-card  w3-blue navbarcontainerwrapper">
      <img
        alt="Shyft Logo"
        className="logoimg"
        src={process.env.PUBLIC_URL + "/images/logo.png"}
      />
    </div>
  );
};

export default Navbar;
