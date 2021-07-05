import React from 'react';
import ReactDOM from 'react-dom';
import {SpeechProvider} from "@speechly/react-client";
import {Provider} from './context/context';
import App from './App';
import './index.css';

ReactDOM.render(
    <SpeechProvider appId='60619819-c83c-4be2-9776-5c32ef83700f' language='en-US'>
        <Provider>
            <App/></Provider></SpeechProvider>,
    document.getElementById('root')
);
