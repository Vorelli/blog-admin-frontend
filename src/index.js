import Main from './Main';
import '../public/main.sass';
const React = require('react');
const ReactDom = require('react-dom');
const root = document.getElementById('root');

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
    };
  }

  render() {
    return pug`
    h1 Top
    `;
  }
}

class SignInPage extends React.Component {
  render() {
    return pug`
    h1 Helo
    `;
  }

  componentDidMount() {
    fetch('localhost:3000', {});
  }
}

const App = () => pug`
Base
SignInPage`;
ReactDom.render(<Main />, root);
