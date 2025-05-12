import {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import {setLoginStatus} from '../../redux/actions';
import {getLoginStatus} from '../../utils/storage';
import Splash_Component from './Splash_Component';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkLoginStatusAndNavigate();
  }

  checkLoginStatusAndNavigate = async () => {
    const loginStatus = await getLoginStatus();
    this.props.setLoginStatus(loginStatus);

    setTimeout(() => {
      if (loginStatus) {
        navigateAndSimpleReset(ScreenNames.HomeTab);
      } else {
        navigateAndSimpleReset(ScreenNames.Login);
      }
    }, 1500);
  };

  render() {
    return (
      <>
        <Splash_Component />
      </>
    );
  }
}

const mapDispatchToProps = {setLoginStatus};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
