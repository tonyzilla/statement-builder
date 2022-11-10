import React, { useCallback, useMemo } from 'react'
import { RenderElementProps } from 'slate-react';


export default (props: RenderElementProps) => {
    const {attributes, children} = props;
    return (
        <table>
            <tbody {...attributes}>{children}</tbody>
        </table>
    )

}
