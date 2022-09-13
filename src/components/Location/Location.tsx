import "./Location.css";
import { useEffect } from "react";
import axios from "axios";
import Locationdata from "./Locationdata/Locationdata";
import Spinner from "../Sharedcomponents/Spinner/Spinner";
import Loadingerror from "../Sharedcomponents/Loadingerror/Loadingerror";
import { Ilocationitemsprops } from "../types";
import React from "react";

const Location = () => {
  const accessToken: string = "zUKWzuo6UBFT-nu4HVmk";
  const [formError, setFormError] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [items, setItems] = React.useState<Ilocationitemsprops>();
  const [residentId, setresidentId] = React.useState<string>("");

  /** 
   -1 Loading, 200 Success,0 No Internet Connection,  401 Unathorised, 404 Not Found From Testing the Api
   */
  const [dataStatus, setDataStatus] = React.useState<number>(-2);
  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const startLoading = async () => {
    setisLoading(true);
  };

  useEffect(() => {
    loadData();
  }, [isLoading]);

  const loadData = async () => {
    if (!isLoading) {
      return;
    }
    setisLoading(false);

    setFormError("");
    if (residentId === "") {
      setFormError("Please Enter A Resident ID");
      return;
    }
    setDataStatus(-1);
    try {
      const res = await axios.get(
        `https://api-dev.trysolstice.com/v1/households/${residentId}`,
        {
          headers: {
            Authorization: `Bearer  ${accessToken}`,
          },
        }
      );
      // console.log("success" + res);
      setDataStatus(res.status);
      // Collect/Map the Neccessary fields we need from our api Result in our own object.
      const transformedDevices = res.data.included.map((deviceList: any) => {
        return {
          id: deviceList.id,
          type: deviceList.type,
          onlinestate: deviceList.attributes.online ? "True" : "False",
        };
      });
      const locationObj: Ilocationitemsprops = {
        address: res.data.data["attributes"]["address_1"],
        residentName: res.data.data["attributes"]["nickname"],
        totalEnergy:
          res.data.data["attributes"]["usage_data"]["gen_usage_today"] +
          res.data.data["attributes"]["usage_data"]["grid_usage_today"],
        genUsage: res.data.data["attributes"]["usage_data"]["gen_usage_today"],
        gridUsgae:
          res.data.data["attributes"]["usage_data"]["grid_usage_today"],
        devices: transformedDevices,
      };
      setItems(locationObj);
    } catch (error: any) {
      // console.log(error);
      setDataStatus(error.response.status);
      setError(error["response"]["data"]["errors"][0]["title"]);
    }
  };

  return (
    <div className="w3-card-2 w3-padding cardheight w3-round w3-white">
      {/* Label for the Instruction Text. */}
      <div>
        <h3 data-testid="textResidentId"> Please Select A Residence ID </h3>

        <p data-testid="textpowerusage"> To know your power usage </p>
      </div>

      {/* Display the search Box for Searching for Resident ID */}
      <div className="w3-container w3-margin-bottom">
        <div className="w3-col w3-right btnholder">
          <button
            data-testid="btnLoadData"
            onClick={() => startLoading()}
            className="w3-btn w3-yellow w3-round w3-text-blue btn"
          >
            Search
          </button>
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
          errormessage={"Household " + error}
        ></Loadingerror>
      )}
    </div>
  );
};

export default Location;
