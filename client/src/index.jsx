//require('newrelic');
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import getAttractionId from './urlParser';

const attractionId = getAttractionId(window.location.href);
//console.log(attractionId)

ReactDOM.render(<App attractionId={attractionId} />, document.getElementById('reviews'));
