import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLabelFromEnum, occupationLabelMap} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {
  deleteCustomerThunk,
  fetchCustomerDetailsThunk,
  initiateLoanApplicationThunk,
} from '../../redux/actions';
import {
  capitalizeFirstLetter,
  formatDate,
  formatIndianCurrency,
  safeGet,
  showToast,
} from '../../utils/helper';
import Customer_Info_Component from './Customer_Info_Component';

class CustomerInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerInfo: {},
      customerId: getScreenParam(this.props.route, 'param')?.customerId,
      isDeleteModalVisible: false,
      isLoading: false,
      onNextPress: false,
    };
    this.onNextPress = this.onNextPress.bind(this);
    this.handleEditDetailPress = this.handleEditDetailPress.bind(this);
    this.viewIncomeProof = this.viewIncomeProof.bind(this);
  }

  componentDidMount() {
    this.fetchCustomerDetailsThunk();
  }

  fetchCustomerDetailsThunk = () => {
    this.setState({onNextPress: false});
    const {customerId} = this.state;
    this.props.fetchCustomerDetailsThunk(customerId);
  };

  onNextPress = () => {
    const {isCreatingLoanApplication} = this.props;
    this.setState({onNextPress: true});
    isCreatingLoanApplication
      ? this.createLoanApplication()
      : navigate(ScreenNames.MoreOnFinancial);
  };

  handleEditDetailPress = () => {
    navigate(ScreenNames.CustomerPersonalDetails, {
      params: {
        fromScreen: ScreenNames.CustomerInfo,
        isEdit: true,
      },
    });
  };

  viewIncomeProof = () => {};

  _safeGet = (obj, path) => {
    const {onNextPress} = this.state;
    return safeGet(this.props.loading && !onNextPress, obj, path, '-');
  };

  createLoanApplication = () => {
    const {
      vehicleId,
      loanType,
      selectedCustomerId,
      selectedApplicationId,
      selectedCustomer,
    } = this.props;

    if (!selectedCustomer?.isComplete) {
      return showToast(
        'info',
        'Please fill out all or edit customer details before proceeding to the next step.',
        'bottom',
        3000,
      );
    }

    if (selectedApplicationId) {
      return navigate(ScreenNames.LoanDocument);
    }
    let payload = {
      vehicleId,
      loanType,
      customerId: selectedCustomerId,
    };

    this.props.initiateLoanApplicationThunk(
      payload,
      success => {
        navigate(ScreenNames.LoanDocument);
      },
      error => {},
    );
  };

  showDeleteCustomerModal = () => {
    this.setState({
      isDeleteModalVisible: true,
    });
  };

  omModalHide = () => {
    this.setState({
      isDeleteModalVisible: false,
    });
  };

  handleDeleteCustomerInfo = () => {
    const {selectedCustomerId} = this.props;
    this.setState({isLoading: true});
    this.props
      .deleteCustomerThunk(selectedCustomerId)
      .then(async response => {
        if (response?.success) {
          showToast(
            'success',
            'Customer has been deleted successfully.',
            'bottom',
            3000,
          );
          // small delay before navigation
          setTimeout(() => {
            goBack();
          }, 250);
        }
      })
      .catch(error => {})
      .finally(() => {
        this.setState({isLoading: false});
        this.omModalHide();
      });
  };

  render() {
    const {loading, selectedCustomer, isCreatingLoanApplication} = this.props;
    const {details = {}} = selectedCustomer || {};

    let customerNote = `${capitalizeFirstLetter(
      selectedCustomer?.customerCategory,
    )} - ${capitalizeFirstLetter(selectedCustomer?.customerType)}`;

    let dob = this._safeGet(details, 'dob');
    let applicantPhoto = this._safeGet(details, 'applicantPhoto');

    const isValidUri =
      applicantPhoto?.startsWith('http') ||
      applicantPhoto?.startsWith('https') ||
      applicantPhoto?.startsWith('file://');

    const occupation = this._safeGet(details, 'occupation');

    const {isDeleteModalVisible, isLoading} = this.state;

    return (
      <Customer_Info_Component
        state={this.state}
        customerInfo={{
          customerName: this._safeGet(details, 'applicantName'),
          customerNote: customerNote,
          footerInfo: [
            {
              label: 'PAN Card',
              value: this._safeGet(details, 'panCardNumber') || '-',
            },
            {
              label: 'Aadhar Card',
              value: this._safeGet(details, 'aadharNumber') || '-',
            },
          ],
          profileImage: applicantPhoto,
          isValidUri: isValidUri,
          status: selectedCustomer?.isComplete ? 'SAVED' : 'DRAFT',
          customerId: details?.customerId,
        }}
        personalDetail={[
          {
            label: 'Mobile Number',
            value:
              this._safeGet(details, 'mobileNumber') ||
              selectedCustomer?.mobileNumber ||
              '-',
          },
          {label: 'Gender', value: this._safeGet(details, 'gender')},
          {
            label: 'Father/Mother Name',
            value: this._safeGet(details, 'fatherName'),
          },
          {
            label: 'Spouse Name',
            value: this._safeGet(details, 'spouseName') || '-',
          },
          {
            label: 'Email address',
            value: this._safeGet(details, 'email'),
            full: true,
          },
          {label: 'Date of Birth', value: formatDate(dob), full: true},
          {
            label: 'Current Address',
            value: this._safeGet(details, 'address'),
            full: true,
          },
          {label: 'Current Pincode', value: this._safeGet(details, 'pincode')},
          {
            label: 'CIBIL Score',
            value: this._safeGet(selectedCustomer, 'cibilScore'),
          },
        ]}
        professionalDetails={[
          {
            label: 'Occupation',
            value:
              getLabelFromEnum(occupationLabelMap, occupation) || occupation,
          },
          {
            label: 'Income Source',
            value: this._safeGet(details, 'incomeSource'),
          },
          {
            label: 'Monthly Income',
            value:
              formatIndianCurrency(
                this._safeGet(details, 'monthlyIncome'),
                true,
                true,
              ) || '-',
          },
        ]}
        bankDetails={[
          {label: 'Bank Name', value: this._safeGet(details, 'bankName')},
          {
            label: 'Account Number',
            value: this._safeGet(details, 'accountNumber'),
          },
          {
            label: 'Current Loan?',
            value: this._safeGet(details, 'currentLoan') ? 'Yes' : 'No',
          },
          {
            label: 'Current EMI',
            value:
              formatIndianCurrency(this._safeGet(details, 'currentEmi') + '') ||
              '-',
          },
          {
            label: 'Max EMI Afford',
            value:
              formatIndianCurrency(this._safeGet(details, 'maxEmiAfford')) ||
              '-',
          },
          {
            label: 'Avg Monthly Bank Bal',
            value:
              formatIndianCurrency(
                this._safeGet(details, 'avgMonthlyBankBalance'),
              ) || '-',
          },
          {
            label: 'Income Proof',
            value: 'VIEW',
            isButton: true,
            onPress: this.viewIncomeProof,
          },
        ]}
        onNextPress={this.onNextPress}
        handleEditDetailPress={this.handleEditDetailPress}
        loading={loading}
        showDeleteCustomerModal={this.showDeleteCustomerModal}
        deleteModalProps={{
          isDeleteModalVisible: isDeleteModalVisible,
          omModalHide: this.omModalHide,
          handleDeleteCustomerInfo: this.handleDeleteCustomerInfo,
          isLoading: isLoading,
        }}
        isCreatingLoanApplication={isCreatingLoanApplication}
      />
    );
  }
}

const mapActionCreators = {
  fetchCustomerDetailsThunk,
  initiateLoanApplicationThunk,
  deleteCustomerThunk,
};
const mapStateToProps = ({customerData, loanData, vehicleData}) => {
  return {
    selectedCustomerId: customerData?.selectedCustomerId,
    selectedCustomer: customerData?.selectedCustomer,
    loading: customerData?.loading || loanData?.loading,
    isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
    vehicleId: vehicleData?.selectedVehicle?.id,
    loanType: loanData?.selectedLoanType,
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomerInfoScreen);
