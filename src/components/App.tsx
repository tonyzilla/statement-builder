import React, { useEffect } from 'react';
import Statement from 'Components/statement/Statement';

import { create } from 'Store/statement/statement.slice';
import { useAppDispatch } from 'Hooks/redux.hooks';



export default function App() {
  const dispatch = useAppDispatch();
  // TODO create button
  useEffect(()=> {
    dispatch(create());
  }, []);


  return <Statement></Statement>
}