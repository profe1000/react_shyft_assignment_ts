import { useContext } from "react";
import { UserContext } from "../../../context/BasicContext";
import { Idevice, Ilocationitemsprops } from "../../types";
import "./Locationdata.css";

const Locationdata: React.FC<any> = (props: any) => {
  const propItem: Ilocationitemsprops = props.items;

  const user = useContext(UserContext);

  return (
    <div className="w3-padding w3-round w3-white">
      User From Context {user}
      <br /> <br />
      <img
        src={process.env.PUBLIC_URL + "images/iconaddress.png"}
        className="icon"
        alt="iconaddress"
      />
      Address :{propItem.address} <hr />
      <img
        src={process.env.PUBLIC_URL + "images/iconaddress.png"}
        className="icon"
        alt="iconAddress"
      />
      Resident Name :{propItem.residentName} <hr />
      <img
        src={process.env.PUBLIC_URL + "images/iconenergy.png"}
        className="icon"
        alt="iconenergy"
      />
      Total Energy Used :{propItem.totalEnergy} Kw
      <br />
      <br />
      <img
        src={process.env.PUBLIC_URL + "images/icongen.png"}
        className="icon"
        alt="icongen"
      />
      GEN Usage : {propItem.genUsage}Kw
      <br />
      <br />
      <img
        src={process.env.PUBLIC_URL + "images/icontransformer.png"}
        className="icon"
        alt="icontransformer"
      />
      GRID Usage : {propItem.gridUsgae}KW
      <hr />
      Devices Included in this Household <br />
      <br />
      <div className="w3-responsive">
        <table className="w3-table-all">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Device ID</th>
              <th>Device Type</th>
              <th>Online Status</th>
            </tr>
          </thead>

          <tbody>
            {propItem.devices.map((item: Idevice, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.onlinestate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Locationdata;
