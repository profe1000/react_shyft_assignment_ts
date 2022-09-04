import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Profilecard from "./Profilecard/Profilecard";
import Spinner from "../Sharedcomponents/Spinner/Spinner";
import Loadingerror from "../Sharedcomponents/Loadingerror/Loadingerror";

const Profile = () => {
  const access_token = "zUKWzuo6UBFT-nu4HVmk";
  const [error, setError] = useState(null);
  const [items, setItems] = useState(null);
  // -1 Loading, 200 Success,0 No Internet Connection,  401 Unathorised, 404 Not Found From Testing the Api
  const [dataStatus, setDataStatus] = useState([-1]);

  useEffect(() => {
    loadData();
  }, []);

  // Load Profile data information via api calls
  const loadData = () => {
    setDataStatus(-1);
    axios
      .get(`https://api-dev.trysolstice.com/v1/users/me`, {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      })
      .then((res) => {
        //console.log(res);
        setDataStatus(res.status);

        //Collect/Map the Neccessary fields we need from our api Result in our own object.
        const userObj = {
          firstName: res.data.data["attributes"]["first_name"],
          lastName: res.data.data["attributes"]["last_name"],
        };
        setItems(userObj);
      })
      .catch(function (error) {
        setDataStatus(error.toJSON()["status"]);
        // console.log(error.toJSON());
        setError(error);
      });
  };

  return (
    <div className="w3-card-2 w3-padding  w3-round w3-white">
      {/* Display a spinner when data is loading */}
      {dataStatus === -1 && <Spinner></Spinner>}

      {/* Display a no Internet section when data fails to connect to api endpoint.*/}
      {dataStatus === 0 && (
        <Loadingerror
          reloadData={() => loadData()}
          errormessage="No Internet Connection"
        ></Loadingerror>
      )}

      {/* Display  Profile status when Loaded is being loaded */}
      {dataStatus === 200 && <Profilecard items={items}></Profilecard>}

      {/* Display other error message */}
      {dataStatus > 300 && (
        <Loadingerror
          reLoadData={() => loadData()}
          errormessage={error.message}
        ></Loadingerror>
      )}
    </div>
  );
};

export default Profile;
