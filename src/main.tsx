import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './features/Error/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/store';
// import css
import 'antd/dist/antd.min.css';
import './overiseStyle/style.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ContextProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </ContextProvider>
    </BrowserRouter>
);
