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
    onClick={onClickAction}
  >
    {
      isChecked ?
        <img src={DEFAULT_ICON} alt="checked"/> :
        <img src={CHECKED_ICON} alt="not checked"/>
    }
    <span>{label}</span>
  </button>
)

export default CheckBox
