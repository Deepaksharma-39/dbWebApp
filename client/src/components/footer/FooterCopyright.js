import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
       <p>
      By &#10084;&#65039; TechPlek Technologies
      </p>
      <div className="footer-logo">
        <Link to={"/"}>
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} />
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://hasthemes.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Teracure
        </a>
        .<br /> All Rights Reserved
      </p>
     
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
