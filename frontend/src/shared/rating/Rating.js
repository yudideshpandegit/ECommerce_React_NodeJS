import React from "react";
import PropTypes from 'prop-types'

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";

import "./Rating.css";


const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        <i>
          {value >= 1 ? (
            <StarIcon className = "rating__icon" />
          ) : value >= 0.5 ? (
            <StarHalfIcon className = "rating__icon" />
          ) : (
            <StarBorderIcon className = "rating__icon"   />
          )}
        </i>
      </span>
      <span>
        <i>
          {value >= 2 ? (
            <StarIcon className = "rating__icon"  />
          ) : value >= 1.5 ? (
            <StarHalfIcon  className = "rating__icon"/>
          ) : (
            <StarBorderIcon className = "rating__icon" />
          )}
        </i>
      </span>
      <span>
        <i>
          {value >= 3 ? (
            <StarIcon className = "rating__icon" />
          ) : value >= 2.5 ? (
            <StarHalfIcon className = "rating__icon" />
          ) : (
            <StarBorderIcon className = "rating__icon" />
          )}
        </i>
      </span>
      <span>
        <i>
          {value >= 3 ? (
            <StarIcon className = "rating__icon" />
          ) : value >= 3.5 ? (
            <StarHalfIcon className = "rating__icon" />
          ) : (
            <StarBorderIcon className = "rating__icon" />
          )}
        </i>
      </span>
      <span>
        <i>
          {value >= 5 ? (
            <StarIcon className = "rating__icon" />
          ) : value >= 4.5 ? (
            <StarHalfIcon className = "rating__icon" />
          ) : (
            <StarBorderIcon className = "rating__icon" />
          )}
        </i>
      </span>
    </div>
  );
};

Rating.propTypes = ({
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,

})

export default Rating;
