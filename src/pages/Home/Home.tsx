import "./Home.css";
import Profile from "../../components/Profile/Profile";
import Location from "../../components/Location/Location";
import { useState, createContext } from "react";

export const UserContext = createContext<string>("");
export const UpdateUserContext = createContext<any>(null);

export const Home = () => {
  const [user, setUser] = useState("Jesse Hall");

  const changeFunction = (name: string) => {
    setUser(name);
  };

  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={changeFunction}>
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
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default Home;
