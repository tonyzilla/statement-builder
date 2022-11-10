import React from 'react';

export default ({children, attributes}) => {
    
    return <span {...attributes}>{children}</span>
  }