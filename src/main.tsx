import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './features/Error/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/store';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import * as moment from 'moment-timezone';
// import css
import 'antd/dist/antd.min.css';
import './overiseStyle/style.min.css';
// moment.tz.setDefault('Etc/UTC');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            staleTime: 10000,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ContextProvider>
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                </QueryClientProvider>
            </ErrorBoundary>
        </ContextProvider>
    </BrowserRouter>
);
