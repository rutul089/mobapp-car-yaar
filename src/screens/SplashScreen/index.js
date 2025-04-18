import {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import Splash_Component from './Splash_Component';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      navigateAndSimpleReset(ScreenNames.Login);
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
