import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';


ReactDOM.render(
  <App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator['serviceWorker'].register(`worker.js?${Date.now()}`)
    .then(function (registration) {
      console.log('Service worker registration succeeded:', registration);
    }).catch(function (error) {
      console.log('Service worker registration failed:', error);
    });
}