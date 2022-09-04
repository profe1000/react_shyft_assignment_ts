import "./Profilecard.css";

const Profilecard = (props) => {
  return (
    <div className="w3-padding  w3-round w3-white">
      <br />
      <img
        alt="profileimage"
        src="https://www.w3schools.com/howto/img_avatar.png"
        className="w3-round profileimg"
      />{" "}
      &nbsp; Welcome, {props.items.firstName + " " + props.items.lastName}
      <br />
      <br />
    </div>
  );
};

export default Profilecard;
