import "./Home.css";
import Profile from "../../components/Profile/Profile";
import Location from "../../components/Location/Location";
import { BasicContextProvider } from "../../context/BasicContext";
import Todo from "../../components/UseReducerSample/todo";
import Reduxhome from "../../components/Redux/reduxhome";

export const Home = () => {
  return (
    <BasicContextProvider>
      <div className="w3-light-grey">
        <div className="w3-content contentmargin w3-round">
          <div className="w3-margin-top">
            <Profile></Profile>
          </div>

          <div className="w3-margin-top">
            <Location></Location>
          </div>

          {/* This Block is for User Reducer component */}
          <div className="w3-margin-top">
            <Todo></Todo>
          </div>

          {/* This Block is for Redux Test */}
          <div className="w3-margin-top">
            <Reduxhome></Reduxhome>
          </div>
        </div>
      </div>
    </BasicContextProvider>
  );
};

export default Home;
