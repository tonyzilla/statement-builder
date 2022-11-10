import React from 'react'

/**
 * Table cell component, including styling for justifcation of text
 */
export default (props) => {
    const {attributes, children, element: {justify}} = props;
    return <td style={{ textAlign: justify || 'left'}} {...attributes}>{children}</td>
}
