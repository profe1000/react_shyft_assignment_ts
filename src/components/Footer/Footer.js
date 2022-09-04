import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="w3-card w3-blue w3-container footerwrapper w3-margin-top">
        <div className="w3-content">
          <div className="w3-col l3 s6 m3 footerelepadding">
            <a>Log In to Your Dashboard</a> <br />
            <br />
            <a>Download SHYFT Connect App</a> <br />
            <br />
            <a>Download SHYFT FlexView App</a> <br />
            <br />
          </div>

          <div className="w3-col l3 s6 m3 footerelepadding">
            <a>Contact Us</a> <br />
            <br />
            <a>FAQ & Technical Support</a> <br />
            <br />
            <a>Careers</a> <br />
            <br />
          </div>

          <div className="w3-col l3 s6 m3 footerelepadding">
            <a>Terms of Use</a> <br />
            <br />
            <a>Privacy Agreement</a> <br />
            <br />
          </div>

          <div className="w3-col l3 s6 m3 footerelepadding">
            <a>© 2022 SHYFT Power Solutions, Inc.</a> <br />
            <br />
            <a>Lagos | San Francisco</a> <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
