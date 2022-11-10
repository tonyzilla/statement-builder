import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, SelectionOperation } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import DefaultElement from './DefaultElement';
import TableElement from './TableElement';
import { useAppDispatch } from 'Hooks/redux.hooks';
import { save, setSelection } from 'Store/statement/statement.slice';
import LeafElement from './LeafElement';
import TableCellElement from './TableCellElement';
import TableRowElement from './TableRowElement';


interface IStatementProps {
    statement: Descendant[];
}
/**
 * This is the main HOC wrapping interaction with the slate components
 */
export default (props: IStatementProps)=> {
  const [ editor ] = useState(() => withReact(createEditor()));
  const { statement } = props;
  const dispatch = useAppDispatch();

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
    // see https://github.com/ianstormtaylor/slate/issues/4612 
    useMemo(()=> {
      editor.children = statement;
    }, [statement])
    
    

    return (
    <Slate
      editor={editor} 
      value={statement}
      onChange={(value)=> {
        /**
         *  Note this is a bit messy... why are the operations that invoked the onchange being retrieved from the editor
         *  rather than being included with the invocation? Doesn't it seem risky like the states of the two could diverge?
         *  
         *  Also wouldn't it be better to have non AST impacting events elevated by a different callback?
         * 
         */
        const  selectionChange = editor.operations.find(
            op => 'set_selection' === op.type
          )
          if (selectionChange) {           
            // Note to elevate the selection we have to drill even further into slate internal objects, which isn't ideal
            const path = (selectionChange as SelectionOperation)?.newProperties?.focus?.path;
            if (path){
              dispatch(setSelection(path));
            }
            
          } else {
            // save the actual changes
            dispatch(save(value));
          }
        }}> 
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            // overrides to default locgic could go here. (including keyboard shortcuts for bold/italic)
          }}
         />
    </Slate>
    );

}