import React from 'react';
import './checkbox.scss';

const DEFAULT_ICON = require('../../assets/icons/bt-checkbox-default.svg');
const CHECKED_ICON = require('../../assets/icons/bt-checkbox-checked.svg');

const CheckBox = ({
  label,
  isChecked,
  onClickAction
}) => (
  <button
    className="checkbox-btn"
    onClick={onClickAction}
  >
    {
      isChecked ?
        <img className="checkbox-btn--icon" src={DEFAULT_ICON} alt="checked"/> :
        <img className="checkbox-btn--icon" src={CHECKED_ICON} alt="not checked"/>
    }
    <span className="checkbox-btn--label">{label}</span>
  </button>
)

export default CheckBox
