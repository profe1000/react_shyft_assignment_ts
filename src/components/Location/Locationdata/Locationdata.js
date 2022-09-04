import "./Locationdata.css";

const Locationdata = (props) => {
  return (
    <div className="w3-padding w3-round w3-white">
      <img
        src={process.env.PUBLIC_URL + "images/iconaddress.png"}
        className="icon"
        alt="iconaddress"
      />{" "}
      Address :{props.items.address} <hr />
      <img
        src={process.env.PUBLIC_URL + "images/iconaddress.png"}
        className="icon"
        alt="iconAddress"
      />{" "}
      Resident Name :{props.items.residentName} <hr />
      <img
        src={process.env.PUBLIC_URL + "images/iconenergy.png"}
        className="icon"
        alt="iconenergy"
      />{" "}
      Total Energy Used :{props.items.totalEnergy} Kw
      <br />
      <br />
      <img
        src={process.env.PUBLIC_URL + "images/icongen.png"}
        className="icon"
        alt="icongen"
      />{" "}
      GEN Usage : {props.items.genUsage}Kw
      <br />
      <br />
      <img
        src={process.env.PUBLIC_URL + "images/icontransformer.png"}
        className="icon"
        alt="icontransformer"
      />{" "}
      GRID Usage : {props.items.gridUsgae}KW
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
            {props.items.devices.map((item, index) => (
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
