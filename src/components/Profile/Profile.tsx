import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Profilecard from "./Profilecard/Profilecard";
import Spinner from "../Sharedcomponents/Spinner/Spinner";
import Loadingerror from "../Sharedcomponents/Loadingerror/Loadingerror";
import { IuserObeject } from "../types";
import React from "react";
import useFetch from "../hooks/FetchUrl";

const Profile = () => {
  const accessToken = "zUKWzuo6UBFT-nu4HVmk";
  const [error, setError] = React.useState<string>("");
  const [items, setItems] = React.useState<IuserObeject>();
  // -1 Loading, 200 Success,0 No Internet Connection,  401 Unathorised, 404 Not Found From Testing the Api
  const [dataStatus, setDataStatus]: any = useState([-1]);

  useEffect(() => {
    loadData();
  }, []);

  // Load Profile data information via api calls
  const loadData = async () => {
    setDataStatus(-1);
    try {
      const res = await axios.get(
        `https://api-dev.trysolstice.com/v1/users/me`,
        {
          headers: {
            Authorization: `Bearer  ${accessToken}`,
          },
        }
      );
      // console.log("success" + res);
      setDataStatus(res.status);
      // Collect/Map the Neccessary fields we need from our api Result in our own object.
      const userObj: IuserObeject = {
        firstName: res.data.data["attributes"]["first_name"],
        lastName: res.data.data["attributes"]["last_name"],
      };
      setItems(userObj);
    } catch (error: any) {
      // console.log(error);
      setDataStatus(error.response.status);
      setError(error["response"]["data"]["errors"][0]["title"]);
    }
  };

  const fetchData = useFetch(
    "https://production-flexview-backend.herokuapp.com/mobile_app_versions/shyft-flexview-resident/last"
  );

  console.log(fetchData);

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
          errormessage={error}
        ></Loadingerror>
      )}
    </div>
  );
};

export default Profile;
