import { IuserObeject } from "../../types";
import { useContext } from "react";
import "./Profilecard.css";
import {
  generalDetailsContext,
  UpdateUserContext,
  UserContext,
} from "../../../context/BasicContext";

const Profilecard = (props: any) => {
  const propItem: IuserObeject = props.items;
  const user = useContext(UserContext);
  const updateFunc = useContext(UpdateUserContext);
  const generalDetails = useContext(generalDetailsContext);

  const changeName = () => {
    updateFunc("Emmanuel");
  };

  const changeGeneralInfo = () => {
    generalDetails?.updateDetails("Bros Emmanuel", 32);
  };

  return (
    <>
      <div className="w3-padding  w3-round w3-white">
        <br />
        <img
          alt="profileimage"
          src="https://www.w3schools.com/howto/img_avatar.png"
          className="w3-round profileimg"
        />
        &nbsp; Welcome, {propItem.firstName + " " + propItem.lastName}
        <br />
        <br />
        User From Context {user}
        <br />
        <br />
        <button onClick={changeName}> Change Content.</button>
        <div>
          <hr />
          General Details FullName : {generalDetails?.fullname} <br /> <br />
          General Details Age : {generalDetails?.age} <br />
          <br />
          <button onClick={changeGeneralInfo}>
            Update General Details Name
          </button>
        </div>
      </div>
    </>
  );
};

export default Profilecard;
