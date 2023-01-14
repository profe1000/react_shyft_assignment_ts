import { IuserObeject } from "../../types";
import { useContext } from "react";
import "./Profilecard.css";
import { UpdateUserContext, UserContext } from "../../../context/BasicContext";

const Profilecard = (props: any) => {
  const propItem: IuserObeject = props.items;
  const user = useContext(UserContext);
  const updateFunc = useContext(UpdateUserContext);

  const changeName = () => {
    updateFunc("Emmanuel");
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
      </div>
    </>
  );
};

export default Profilecard;
