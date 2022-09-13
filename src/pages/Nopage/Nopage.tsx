import "./Nopage.css";
import { Link } from "react-router-dom";

const Nopage = () => {
  return (
    <div className="w3-light-grey">
      <div className="w3-content contentmargin w3-round">
        <div className="w3-margin-top w3-card w3-white w3-round w3-container nopagecardheight">
          This is a 404 Page <br />
          <br />
          <Link
            className="w3-btn w3-round w3-blue w3-col l4 s4 m4 w3-border"
            to="/"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nopage;
