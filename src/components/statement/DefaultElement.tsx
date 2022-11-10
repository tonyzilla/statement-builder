import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * The default fallback for slate rendering
 */
export default (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
  }