import React, { useEffect } from 'react';
import Statement from 'Components/statement/Statement';

import { addBold, addCol, addItalics, addRow, getStatement, justifyCell, load } from 'Store/statement/statement.slice';
import { useAppDispatch, useAppSelector } from 'Hooks/redux.hooks';



export default function App() {
  
  const statment = useAppSelector(getStatement);
  const dispatch = useAppDispatch();
  
  // load any saved statements
  useEffect(()=> {
    dispatch(load());
  },[])


  const addToTable = (type: string)=> (evt)=> {
    type === 'row' ? dispatch(addRow()) : dispatch(addCol());
  }
  const addStyle = (type: string) => (evt) => {
    type === 'bold' ? dispatch(addBold()) : dispatch(addItalics());
  }
  const addJustify = (type)=> (evt)=>{
    dispatch(justifyCell(type));
  }

  // while we could add the buttons to the slate editable, I think a more interesting use case is interaction from external components
  return (
  <div>
    <button onClick={addToTable('row')} > Add Row </button> 
    <button onClick={addToTable('col')} > Add Col </button> 
    <button onClick={addStyle('bold')} ><b>Bold</b></button>
    <button onClick={addStyle('italics')} ><i>Italics</i></button>
    <button onClick={addJustify('left')} > Left </button>
    <button onClick={addJustify('center')} > Center </button>
    <button onClick={addJustify('right')} > Right </button>

    <Statement statement={statment}></Statement>
  </div>)
}