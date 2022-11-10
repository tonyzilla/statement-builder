import React from 'react'
import {render} from '@testing-library/react'
import { store } from 'Store/store';
import { Provider } from 'react-redux';


const withRedux = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>)
}

const renderWithContext = (ui, options = {}) =>
  render(ui, {wrapper: withRedux, ...options})

export * from '@testing-library/react'

export {renderWithContext}