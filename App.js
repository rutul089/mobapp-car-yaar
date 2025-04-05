import React, {Component} from 'react';
import RootNavigator from './src/navigation/RootNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <RootNavigator />;
  }
}
