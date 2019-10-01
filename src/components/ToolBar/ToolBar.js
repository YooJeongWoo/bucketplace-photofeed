import React from 'react';
import './toolbar.scss';

const ToolBar = ({
  children
}) => (
  <div className="toolbar__container">
    {children}
  </div>
)

export default ToolBar
