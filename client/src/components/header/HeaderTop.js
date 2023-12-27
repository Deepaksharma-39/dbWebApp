import clsx from "clsx";
//import { useSelector } from "react-redux";
import PropTypes from "prop-types";


const HeaderTop = ({ borderStyle }) => {
  
    return (
      <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
        <div className="header-offer">
          {/* <p>
            Free delivery on order over{" "}
            <span>
              {200}
            </span>
          </p> */}
        </div>
      </div>
    );
  };
  
  HeaderTop.propTypes = {
    borderStyle: PropTypes.string,
  };
  
  export default HeaderTop;
  