import "./TestComp.css";
import { useState } from "react";

/* 
This component is not part of the project it was use for testing/learning purpose 
*/

function TestComp(prop) {
  let a = "Hello World";
  let show = true;

  const shoot = () => {
    alert("Great Shot!");
  };

  const shootb = (a) => {
    alert(a);
  };

  const shootc = (a, b) => {
    alert(a + "<br />" + b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
  };

  const cars = [
    { id: 1, brand: "Ford" },
    { id: 2, brand: "BMW" },
    { id: 3, brand: "Audi" },
  ];

  const [name, setName] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`);
  };

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitmultiple = (event) => {
    event.preventDefault();
    alert(inputs);
    console.log(inputs);
  };

  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const handleChangetextarea = (event) => {
    setTextarea(event.target.value);
  };

  const [myCar, setMyCar] = useState("Volvo");

  const handleChangeselect = (event) => {
    setMyCar(event.target.value);
  };

  const [data, setData] = useState(null);

  const loaddata = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="w3-card-2 w3-padding cardheight w3-round w3-white">
      <h2> This component is for anything testing. </h2>
      <p>
        {" "}
        {a} I am a TestComp Component my name is {prop.myname} <br /> I am{" "}
        {prop.myage} years old.
      </p>
      <br />
      {/* This is an Event Handler */}
      <button onClick={shoot}>Take the Shot!</button> <br /> <br />
      <button onClick={() => shoot()}>Same as first Example.</button> <br />
      <br />
      <button onClick={() => shootb("I am an Argument!!!")}>
        Event with Argument Templete.
      </button>{" "}
      <br />
      <br />
      <button
        onClick={(event) =>
          shootc("I am an Argument the other is an Event.", event)
        }
      >
        Argument and Events.
      </button>
      {/* Conditional Statement */}
      {show && <h2>This box will be visible</h2>}
      {/* Conditional Statement with tenery operations */}
      {show ? <h2> I was set to true </h2> : <h2> I am set to false </h2>}
      {/* React Loop */}
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            I am a {car.brand} and my Id is {car.id}
          </li>
        ))}
      </ul>
      {/* React Loop In Json */}
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            I am a {car.brand} and my Id is {car.id}
          </li>
        ))}
      </ul>
      {/* React Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <br />
        </label>
        <input type="submit" /> <br />
        This is the value from the form. {name}
      </form>
      <form>
        <br /> <br />
        <label>
          {" "}
          Enter your Length:
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />{" "}
          <br />
        </label>
        <br />
        <label>
          {" "}
          Enter your Width:
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />{" "}
          <br />
        </label>
        The Area of the rectangle {length * width}
      </form>
      {/* React Form Multiple Inputs */}
      <form onSubmit={handleSubmitmultiple}>
        <br />
        <label>
          Enter your name:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your age:
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      {/* React Form Text Area */}
      <form>
        <br /> <br />
        <textarea
          value={textarea}
          onChange={(event) => handleChangetextarea(event)}
        />
        <br />
        {textarea}
      </form>
      {/* React Select */}
      <form>
        <br />
        <br />
        <select value={myCar} onChange={handleChangeselect}>
          <option value="Ford">Ford</option>
          <option value="Volvo">Volvo</option>
          <option value="Fiat">Fiat</option>
        </select>

        <br />

        {myCar}
      </form>
      {/* Load HTTP Request */}
      <br />
      <br />
      <button onClick={loaddata}>Load HTTP Request</button> <br /> <br />
    </div>
  );
}

export default TestComp;
