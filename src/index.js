const React = require('react');
const ReactDom = require('react-dom');
const root = document.getElementById('root');
const App = () => pug`h1 Hello from React`;
ReactDom.render(pug`App`, root);
