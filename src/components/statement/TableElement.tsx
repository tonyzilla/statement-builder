import React, { useCallback, useMemo } from 'react'
import { RenderElementProps } from 'slate-react';

/**
 * The top level table element
 */
export default (props: RenderElementProps) => {
    const {attributes, children} = props;
    return (
        <table>
            <tbody {...attributes}>{children}</tbody>
        </table>
    )

}
