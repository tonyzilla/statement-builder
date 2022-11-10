import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'Store/store';
import { BaseElement, Descendant } from 'slate';

interface StatementState {
  statement:  Descendant[];
  statementRows: number;
  statementCols: number;
}

const DEFAULT_ROWS = 2;
const DEFAULT_COLS = 6;


const buildCell= () => ({
  type: 'table-cell',
  children: [{ text: '' }],
});

const buildRow = () =>  {
  const row =  {
  type: 'table-row',
  children: []
  };

  for (let j = 0; j < DEFAULT_COLS; j++){
    const newChild = buildCell();
    row.children.push(newChild);
  }

  return row;
};

// TODO this would normally go in a helper
const buildInitalStatement = ()=> {
  let root =     {
    type: 'table',
    children: []
  }

  for (let i =0; i < DEFAULT_ROWS; i++ ){
    const newRow = buildRow();
      root.children.push(newRow);
  
  }
  return root;

}

// Define the initial state using that type
const initialState: StatementState = {
  statement: [
    buildInitalStatement()
  ],
  statementCols: DEFAULT_COLS,
  statementRows: DEFAULT_ROWS
}

export const statementSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    load: (state) => {
      // TODO local storage bits should be in middlewear
      const loadedStatement = JSON.parse(localStorage.getItem('statement'));
      if(loadedStatement){
        state.statement = loadedStatement;
      }
      
    },
    save: (state, action: PayloadAction<Descendant[]>) => {
      console.log(action.payload);
      const {payload} = action;
      const content = JSON.stringify(action.payload);
      


      // localStorage.setItem('statement', content);
      //createSlice / createReducer should handle doing this immutably
      state.statement = payload;
    },
    addRow: (state) => {
      const  { statement } = state;
      // yes this is hack to not have to track the current table.
      (statement[0] as BaseElement)?.children?.push(buildRow());
    },
    addCol: (state) => {
      const  { statement } = state;
      // yes this is hack to not have to track the current table.
      (statement[0] as BaseElement)?.children?.forEach((child)=> {
        (child as BaseElement).children.push(buildCell());
      });
    }
  },
});

export const { load, save, addRow, addCol } = statementSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getStatement = (state: RootState) => state.statement.statement;

export default statementSlice.reducer;