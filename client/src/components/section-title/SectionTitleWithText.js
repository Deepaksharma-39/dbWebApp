import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Ensure A Healthier, Happier Future For Your Animal Companions!</h1>
          <p>
          Welcome to Teracure, where we are dedicated to the well-being of your beloved animal companions. As a leading provider of veterinary medicines, we take pride in our commitment to ensuring the health and happiness of your pets and livestock.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
