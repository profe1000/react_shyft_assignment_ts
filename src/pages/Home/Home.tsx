import "./Home.css";
import Profile from "../../components/Profile/Profile";
import Location from "../../components/Location/Location";

const Home = () => {
  return (
    <div className="w3-light-grey">
      <div className="w3-content contentmargin w3-round">
        <div className="w3-margin-top">
          <Profile></Profile>
        </div>

        <div className="w3-margin-top">
          <Location></Location>
        </div>
      </div>
    </div>
  );
};

export default Home;
