import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'Components/App';
import { store } from 'Store/store';
import { Provider } from 'react-redux'
import "./styles.css";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Provider store={store}><App /></Provider>);