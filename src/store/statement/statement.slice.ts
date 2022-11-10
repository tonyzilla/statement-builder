import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Store/store';
import { BaseElement, Descendant } from 'slate';
import { buildCell, buildRow, getNodeForPath, getNodesForPath, loadStatement, saveStatement } from './statement.utils';
import { ITableCellNode, ITableTextNode, TTableCellJustify } from 'Types/statement.types';


interface IStatementState {
  statement:  Descendant[];
  // NOTE for ease of this POC, selection will be stored as an array of numbers (positional index through the component tree)
  // this is how slate represents it, but isn't necessarily the most human readable / debugable. 
  selection: number[];
}

const initialState: IStatementState = {
  statement: [],
  selection: null
}

/**
 * The main statement slice. 
 * 
 * Note If this was beyond just a POC, we'd likely want to 
 * split some of these actions out (like selection for example)
 */
export const statementSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    load: (state) => {
      // NOTE saving / loading bits should be in middlewear (sagas, thunks, etc)
      const loadedStatement = loadStatement();
      state.statement = loadedStatement;
      
    },
    save: (state, action: PayloadAction<Descendant[]>) => {
      const {payload} = action;
      saveStatement(payload);
      state.statement = payload;

    },
    addRow: (state) => {
      const  { statement } = state;
      const root = statement[0] as BaseElement;
      const firstRow = root?.children[0] as BaseElement;
      const numCols = firstRow.children.length;
      (statement[0] as BaseElement)?.children?.push(buildRow(numCols));
      
      saveStatement(statement);
    },
    addCol: (state) => {
      const  { statement } = state;
      (statement[0] as BaseElement)?.children?.forEach((child)=> {
        (child as BaseElement).children.push(buildCell());
      });
      saveStatement(statement);
    },
    // selection is read only at this point
    setSelection: (state, action: PayloadAction<number[]>)=> {
      const { payload } = action;
      state.selection = payload;
    },
    addBold: (state)=> {
      const { selection, statement } = state;
      const node = getNodeForPath(statement, selection) as ITableTextNode;
      node.bold = !node.bold;

      saveStatement(statement);
      
    },
    addItalics: (state) => {
      const { selection, statement } = state;
      const node = getNodeForPath(statement, selection) as ITableTextNode;
      node.italic = !node.italic;

      saveStatement(statement);
    },
    justifyCell: (state, action: PayloadAction<TTableCellJustify>) => {
      const { selection, statement } = state;
      const { payload } = action;
      
      // get the parent of the text node as that's where the justifying happens
      const nodes = getNodesForPath(statement, selection);
      const parent = nodes[selection.length - 2] as ITableCellNode;
      
      parent.justify = payload;
      saveStatement(statement);
    }

  },
});

export const { load, save, addRow, addCol, setSelection, addBold, addItalics, justifyCell } = statementSlice.actions;
export const getStatement = (state: RootState) => state.statement.statement;

export default statementSlice.reducer;