import React from 'react';

const withBold = (bold, children) => bold ? (<b>{children}</b>) : {...children};
const withItalic = (italic, children) => italic ? (<em>{children}</em>) : {...children};

/**
 * The leaf elements currently rendering the actual text within table cells
 */
export default (props) => {
  const {children, attributes, leaf: {bold, italic}} = props;
  
    return withItalic(italic, withBold(bold, (<span {...attributes}>{children}</span>)));
  }