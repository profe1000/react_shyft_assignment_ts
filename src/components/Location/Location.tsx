/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Location.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Locationdata from "./Locationdata/Locationdata";
import Spinner from "../Sharedcomponents/Spinner/Spinner";
import Loadingerror from "../Sharedcomponents/Loadingerror/Loadingerror";

const Location = () => {
  const access_token = "zUKWzuo6UBFT-nu4HVmk";
  const [formError, setFormError]:any = useState(null);
  const [error, setError]:any = useState(null);
  const [items, setItems]:any = useState(null);
  const [residentId, setresidentId]:any = useState("");
  // -1 Loading, 200 Success,0 No Internet Connection,  401 Unathorised, 404 Not Found From Testing the Api
  const [dataStatus, setDataStatus]:any = useState([-2]);
  const [isLoading, setisLoading]:any = useState(false);
   

  const startLoading =  async() =>{
     setisLoading(true);
  }

  useEffect(() => {
    loadData();
   }, [isLoading]);
  
  const loadData = async() => {
    if(!isLoading){
      return;
    }
    setisLoading(false);

    setFormError("");
    if (residentId === "") {
      setFormError("Please Enter A Resident ID");
      return;
    }
    setDataStatus(-1);
    axios
      .get(`https://api-dev.trysolstice.com/v1/households/${residentId}`, {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      })
      .then((res) => {
        //console.log(res);
        setDataStatus(res.status);

        //Collect/Map the Neccessary fields we need from our api Result in our own object.
        const transformedDevices = res.data.included.map((deviceList:any) => {
          return {
            id: deviceList.id,
            type: deviceList.type,
            onlinestate: deviceList.attributes.online ? "True" : "False",
          };
        });
        const locationObj = {
          address: res.data.data["attributes"]["address_1"],
          residentName: res.data.data["attributes"]["nickname"],
          totalEnergy:
            res.data.data["attributes"]["usage_data"]["gen_usage_today"] +
            res.data.data["attributes"]["usage_data"]["grid_usage_today"],
          genUsage:
            res.data.data["attributes"]["usage_data"]["gen_usage_today"],
          gridUsgae:
            res.data.data["attributes"]["usage_data"]["grid_usage_today"],
          devices: transformedDevices,
        };
        setItems(locationObj);
      })
      .catch(function (error) {
        //setDataStatus(error.toJSON()["status"]);
        console.log(error.toJSON());
        setError(error);
      });
  };

  return (
    <div className="w3-card-2 w3-padding cardheight w3-round w3-white">
      {/* Label for the Instruction Text. */}
      <div>
        <h3 data-testid="textResidentId"> Please Select A Residence ID </h3>

        <p data-testid="textpowerusage"> To know your power usage </p>

        {dataStatus}
      </div>

      {/* Display the search Box for Searching for Resident ID */}
      <div className="w3-container w3-margin-bottom">
        <div className="w3-col w3-right btnholder">
          <a
            data-testid="btnLoadData"
            onClick={() => startLoading()}
            className="w3-btn w3-yellow w3-round w3-text-blue btn"
          >
            {" "}
            Search{" "}
          </a>
        </div>

        <div className="w3-rest">
          <input
            data-testid="inputLoadData"
            type="text"
            value={residentId}
            onChange={(e) => setresidentId(e.target.value)}
            onBlur={() => startLoading()}
            className="w3-input w3-round w3-border"
            placeholder="Enter Resident ID Here"
          />
        </div>
      </div>

      {/* Error message for wrong Input. */}
      <div>
        <span className="w3-container w3-text-red" data-testid="textwronginput">
          {" "}
          {formError}
        </span>
      </div>

      {/* Display a spinner when data is loading */}
      {dataStatus === -1 && <Spinner></Spinner>}

      {/* Display a no Internet section when data fails to connect to api endpoint.*/}
      {dataStatus === 0 && (
        <Loadingerror
          reLoadData={() => startLoading()}
          errormessage="No Internet Connection"
        ></Loadingerror>
      )}

      {/* Display  Resident data usage when Loaded is being loaded */}
      {dataStatus === 200 && <Locationdata items={items}></Locationdata>}

      {/* Display other error message */}
      {dataStatus > 300 && (
        <Loadingerror
          reLoadData={() => startLoading()}
          errormessage={error.message}
        ></Loadingerror>
      )}
    </div>
  );
};

export default Location;
