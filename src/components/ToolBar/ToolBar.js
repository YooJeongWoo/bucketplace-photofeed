import React from 'react';
import './toolbar.scss';

const ToolBar = ({
  children
}) => (
  <div className="toolbar__wrapper">
    <div className="toolbar__container">
      {children}
    </div>
  </div>
)

export default ToolBar
