import React from 'react';
import Statement from 'Components/statement/Statement';

import { addCol, addRow, getStatement, load } from 'Store/statement/statement.slice';
import { useAppDispatch, useAppSelector } from 'Hooks/redux.hooks';



export default function App() {
  
  const statment = useAppSelector(getStatement);
  const dispatch = useAppDispatch();
  console.log('main app render');


  const handleAdd = (type: string)=> (evt)=> {
    type === 'row' ? dispatch(addRow()) : dispatch(addCol());
  }

  // while we could add the buttons to the slate model and use their handlers, I think a more interesting use case is interaction from external components
  return (
  <div>
    <button onClick={handleAdd('row')} > Add Row </button> 
    <button onClick={handleAdd('col')} > Add Col </button> 
    <Statement statement={statment}></Statement>
  </div>)
}