import React from "react";
import PropTypes from "prop-types";
import ctx from "classnames";
import './HighSpeed.css'

const propTypes = {
  highSpeed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default function HighSpeed(props) {
  const { highSpeed, toggle } = props;
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁动车</div>
      <div className="high-speed-switch" onClick={() => toggle()}>
        <input type="hidden" name="highSpeed" value={highSpeed} />
        <div
          className={ctx("high-speed-track", {
            checked: highSpeed
          })}
        >
          <span
            className={ctx("high-speed-handle", {
              checked: highSpeed
            })}
          ></span>
        </div>
      </div>
    </div>
  );
}

HighSpeed.propTypes = propTypes;
