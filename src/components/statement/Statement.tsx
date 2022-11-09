import React from 'react';

import { useAppSelector, useAppDispatch } from 'Hooks/redux.hooks';

import { getId } from 'Store/statement/statement.slice';



export default ()=>{
    const id = useAppSelector(getId)
    return <div>{id}</div>
}