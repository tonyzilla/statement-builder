import React from 'react'
import { RenderElementProps } from 'slate-react';


export default (props: RenderElementProps) => {
    const {attributes, children} = props;

    return <tr {...attributes}>{children}</tr>

}
