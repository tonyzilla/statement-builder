import { BaseElement, Descendant } from "slate";

export const DEFAULT_ROWS = 2;
export const DEFAULT_COLS = 6;

/**
 * Builds a new default table cell. 
 * @returns a new default cell.
 */
export const buildCell= () => ({
  type: 'table-cell',
  children: [{ text: '' }],
  bold: false
});

/**
 * Builld a new row, with default cells at @param cols width or DEFAULT_COLS if not specified.
 * @param cols optional number of colums to build (optional)
 * @returns the created row
 */
export const buildRow = (cols=DEFAULT_COLS) =>  {
  const row =  {
  type: 'table-row',
  children: []
  };

  for (let j = 0; j < cols; j++){
    const newChild = buildCell();
    row.children.push(newChild);
  }

  return row;
};

/**
 * Build a default blank statement.
 * @returns a new default statement
 */
export const buildInitalStatement = (): Descendant[]=> {
  let root =     {
    type: 'table',
    children: []
  }

  for (let i =0; i < DEFAULT_ROWS; i++ ){
    const newRow = buildRow();
      root.children.push(newRow);
  
  }
  return [ root ];

}

/**
 * Save the statement to local storage
 * @param content - the content of the statement
 */
export const saveStatement = (content: Descendant[])=> {
    const serialized = JSON.stringify(content);
      
    localStorage.setItem('statement', serialized);

}

/**
 * Load a statement from local storage
 * @returns the loaded statement, or an initial statement if none is found
 */
export const loadStatement = (): Descendant[] => {
    const storageItem = localStorage.getItem('statement');
    return storageItem? JSON.parse(storageItem) : buildInitalStatement();
}

/**
 * convienince method to get the node at the end of a supplied path
 * @param statement - the current statement
 * @param path - the path through the tree, as an array
 * @returns 
 */
export const getNodeForPath = (statement: Descendant[], path: number[]): Descendant => {
    const nodes = getNodesForPath(statement, path);
    return nodes && nodes.length > path.length -1 ? nodes[path.length - 1] : null; 
}


/**
 * Gets a list of nodes corresponding to the path supplied
 * @param statement - the current statement
 * @param path - the path through the tree, as an array
 * @returns 
 */
export const getNodesForPath = (statement: Descendant[], path: number[]): Descendant[] => {
    
    let level = statement;
    let node;
    let nodes = [];
    for ( let p of path ){
        node = level[p];
        nodes.push(node);
        level = (node as BaseElement).children;
    }
    return nodes;
}