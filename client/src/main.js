import { jsx as _jsx } from "react/jsx-runtime";
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { store, persistor } from './app/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(_jsx(Provider, { store: store, children: _jsx(PersistGate, { loading: null, persistor: persistor, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }));
}
else {
    throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.");
}
