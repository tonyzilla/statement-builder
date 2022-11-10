import React from 'react';
import { RenderElementProps } from 'slate-react';

export default (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
  }