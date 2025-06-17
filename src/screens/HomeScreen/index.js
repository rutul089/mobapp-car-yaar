import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getLabelFromEnum,
  loanType,
  userRoleValue,
  vehicleType,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  fetchPartnerStatsThunk,
  fetchUser,
  resetLoanApplication,
  resetSelectedCustomer,
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

  componentDidMount = async () => {
    try {
      const userResponse = await this.props.fetchUser();
      await this.props.fetchPartnerStatsThunk(userResponse.id);
    } catch (err) {}
  };

  /**
   * Navigates to the notifications screen.
   */
  onNotificationPress = () => {
    // navigate(ScreenNames.CustomerEnvelope);
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
    this.props.resetLoanApplication();
    this.props.resetSelectedCustomer();
    // VehicleFullScreen LoanAmount FinanceDetails

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
    const {userData, partnerStats} = this.props;
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
        userName={userData?.name || ''}
        userRole={getLabelFromEnum(userRoleValue, userData?.role)}
        partnerID={userData?.id}
        partnerStats={partnerStats}
      />
    );
  }
}

const mapDispatchToProps = {
  selectedLoanType,
  setIsCreatingLoanApplication,
  fetchUser,
  fetchPartnerStatsThunk,
  resetLoanApplication,
  resetSelectedCustomer,
};

const mapStateToProps = ({user, partnerPerformance}) => ({
  userData: user?.userProfile,
  partnerStats: partnerPerformance?.partnerStats,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
