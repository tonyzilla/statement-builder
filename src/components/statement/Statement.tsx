import React, { useCallback, useState } from 'react';

import { useAppSelector, useAppDispatch } from 'Hooks/redux.hooks';

import { getId } from 'Store/statement/statement.slice';
// Import React dependencies.

import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';


// TypeScript users only add this code TODO should be in it's own module or d.ts file
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

// Add the initial value.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ] as Descendant[];
  

  // Define a React component renderer for our code blocks.
const CodeElement = (props: RenderElementProps) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  };

  const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
  }

export default ()=>{
    const id = useAppSelector(getId)
    const [editor] = useState(() => withReact(createEditor()));

      // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])


    return (
    <Slate editor={editor} value={initialValue} > 
        <Editable
         renderElement={renderElement}
         onKeyDown={event => {
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