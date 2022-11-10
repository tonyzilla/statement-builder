import React, { useCallback, useEffect, useState } from 'react';

// Import React dependencies.

import { createEditor, Descendant } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import DefaultElement from './DefaultElement';
import TableElement from './TableElement';
import { useAppDispatch } from 'Hooks/redux.hooks';
import { save } from 'Store/statement/statement.slice';
import LeafElement from './LeafElement';
import TableCellElement from './TableCellElement';
import TableRowElement from './TableRowElement';


interface IStatementProps {
    statement: Descendant[];
}

export default (props: IStatementProps)=> {
    const [ editor ] = useState(() => withReact(createEditor()));
    const { statement } = props;
    const dispatch = useAppDispatch();
  console.log('statement render', props);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'table':
        return <TableElement {...props} />
        case 'table-row':
          return <TableRowElement {...props} />
        case 'table-cell':
          return <TableCellElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <LeafElement {...props} />
  }, []);

    // workaround to make slate a controlled component
    // due to https://github.com/ianstormtaylor/slate/issues/4612 
    // this is bad
    editor.children = statement;
    

    return (
    <Slate
      editor={editor} 
      value={statement}
      onChange={(value)=> {
        const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Save the value to Local Storage.
            dispatch(save(value));
            
          }
        }}> 
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            console.log(event);
            if (event.key === '&') {
              // Prevent the ampersand character from being inserted.
              event.preventDefault()
              // Execute the `insertText` method when the event occurs.
              editor.insertText('and')
            }
        }}
         />
    </Slate>
    );

}