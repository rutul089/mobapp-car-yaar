import React, {Component} from 'react';
import Splash_Component from './Splash_Component';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Splash_Component />
      </>
    );
  }
}
