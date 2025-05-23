import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loanType, vehicleType} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  fetchUser,
  selectedLoanType,
  setIsCreatingLoanApplication,
} from '../../redux/actions';
import Home_Component from './Home_Component';

/**
 * HomeScreen component handles loan type selection,
 * vehicle type filter, and navigation to appropriate screens.
 */
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarType: vehicleType.used,
    };

    // Bind methods
    this.onSelectedCarType = this.onSelectedCarType.bind(this);
    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.handleLoanOptionPress = this.handleLoanOptionPress.bind(this);
    this.handleLeaseOptionPress = this.handleLeaseOptionPress.bind(this);
    this.handleSubscribeOptionPress =
      this.handleSubscribeOptionPress.bind(this);
    this.handleLoanTypeSelection = this.handleLoanTypeSelection.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  /**
   * Navigates to the notifications screen.
   */
  onNotificationPress = () => {
    navigate(ScreenNames.Notification);
  };

  /**
   * Sets the selected car type (new or used).
   * @param {string} value - The selected vehicle type.
   */
  onSelectedCarType = value => {
    this.setState({selectedCarType: value});
  };

  /**
   * Handles the generic selection of a loan type with optional full screen navigation.
   * @param {string} chosenLoanType - The selected loan type.
   */
  handleLoanTypeSelection = chosenLoanType => {
    this.props.selectedLoanType(chosenLoanType);
    this.props.setIsCreatingLoanApplication(true);
    // VehicleFullScreen LoanAmount

    navigate(ScreenNames.VehicleFullScreen, {
      params: {
        fullScreen: true,
        isLoanApplication: true,
      },
    });
  };

  /**
   * Handles "New Loan" option selection and navigates to OTP screen.
   */
  handleLoanOptionPress = () => {
    this.props.selectedLoanType(loanType.loan);
    navigate(ScreenNames.NewLoanCustomerOtp);
  };

  /**
   * Handles "Lease" option selection.
   */
  handleLeaseOptionPress = () => {
    this.props.selectedLoanType(loanType.lease);
    // Add navigation if required
  };

  /**
   * Handles "Subscribe" option selection.
   */
  handleSubscribeOptionPress = () => {
    this.props.selectedLoanType(loanType.subscribe);
    // Add navigation if required
  };

  render() {
    const {userData} = this.props;
    return (
      <Home_Component
        onSelectedCarType={this.onSelectedCarType}
        onNotificationPress={this.onNotificationPress}
        selectedCarType={this.state.selectedCarType}
        handleLoanOptionPress={this.handleLoanOptionPress}
        handleLeaseOptionPress={this.handleLeaseOptionPress}
        handleSubscribeOptionPress={this.handleSubscribeOptionPress}
        handleLoanTypeSelection={this.handleLoanTypeSelection}
        profileImage={userData?.profileImage}
      />
    );
  }
}

const mapDispatchToProps = {
  selectedLoanType,
  setIsCreatingLoanApplication,
  fetchUser,
};

const mapStateToProps = ({user}) => ({
  userData: user?.userProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
