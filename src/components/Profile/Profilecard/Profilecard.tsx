import { IuserObeject } from "../../types";
import "./Profilecard.css";

const Profilecard = (props: any) => {
  const propItem: IuserObeject = props.items;

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
      </div>
    </>
  );
};

export default Profilecard;
