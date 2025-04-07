import React, {Component} from 'react';
import Splash_Component from './Splash_Component';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      navigateAndSimpleReset(ScreenNames.HomeTab);
    }, 1500);
  }

  render() {
    return (
      <>
        <Splash_Component />
      </>
    );
  }
}

export default Splash;
