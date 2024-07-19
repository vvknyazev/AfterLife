import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from './app/store'
import {BrowserRouter} from "react-router-dom";
// import {QueryClient} from "react-query";
import {ChatProvider} from './context/ChatProvider';
import './i18n';

//process.env.REACT_APP_API_URL = 'https://localhost/';

const loadingMarkup = (
    <div>
        <h3>Loading..</h3>
    </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={loadingMarkup}>
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <ChatProvider>
                        <App/>
                    </ChatProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
