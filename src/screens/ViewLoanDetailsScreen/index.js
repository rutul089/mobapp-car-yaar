import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  currentLoanLabelMap,
  customerCategoryValue,
  customerIndividualTypeValue,
  getLabelFromEnum,
  loanTypeLabelMap,
  occupationLabelMap,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  goBack,
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import {
  addCustomerBasicDetail,
  deleteLoanApplicationByIdThunk,
  fetchLoanApplicationFromIdThunk,
  selectedLoanType,
} from '../../redux/actions';
import {
  formatDate,
  formatIndianCurrency,
  formatMonths,
  formatShortId,
  formatVehicleNumber,
  safeGet,
  showToast,
} from '../../utils/helper';
import View_Loan_Details_Component from './View_Loan_Details_Component';

class ViewLoanDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanDetail: {},
      isDeleteModalVisible: false,
      isLoading: false,
    };
    this.onBackToHomePress = this.onBackToHomePress.bind(this);
    this.onTrackLoanStatusPress = this.onTrackLoanStatusPress.bind(this);
    this.onTackLoanApplication = this.onTackLoanApplication.bind(this);
  }

  componentDidMount() {
    const loanId = this.props.route.params.loanId || '';

    const {selectedLoanApplication} = this.props;
    if (loanId && !selectedLoanApplication) {
      this.props.fetchLoanApplicationFromIdThunk(loanId);
    }
  }

  onBackToHomePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  onTrackLoanStatusPress = () => {
    navigate(ScreenNames.TrackApplication, {
      params: this.props.selectedLoanApplication,
    });
  };

  onTackLoanApplication = () => {};

  handleEditLoanApplication = () => {
    const {selectedLoanApplication} = this.props;
    this.props.addCustomerBasicDetail(
      selectedLoanApplication?.customer,
      selectedLoanApplication?.customerId,
    );
    this.props.selectedLoanType(selectedLoanApplication?.loanType);

    navigate(ScreenNames.LoanDocument, {
      params: {
        isEdit: true,
      },
    });
  };

  showDeleteLoanApplication = () => {
    this.setState({
      isDeleteModalVisible: true,
    });
  };

  handleDeleteLoanApplication = () => {
    this.setState({isLoading: true});
    const {selectedApplicationId} = this.props;
    this.props.deleteLoanApplicationByIdThunk(
      selectedApplicationId,
      async response => {
        this.setState({isLoading: false});
        if (response?.success) {
          showToast('success', response?.message);
          this.omModalHide();
          await new Promise(resolve => setTimeout(resolve, 200));
          goBack();
        }
      },
      onFailure => {
        this.setState({isLoading: false});
        this.omModalHide();
      },
    );
  };

  omModalHide = () => {
    this.setState({
      isDeleteModalVisible: false,
    });
  };

  render() {
    const {loading, selectedLoanApplication, isReadOnlyLoanApplication} =
      this.props;
    const {isDeleteModalVisible, isLoading} = this.state;
    const {
      customer = {},
      vehicle = {},
      usedVehicle = {},
    } = selectedLoanApplication || {};

    let dob = safeGet(loading, customer?.customerDetails, 'dob');
    let _customerCategory = safeGet(loading, customer, 'customerCategory');
    let _customerType = safeGet(loading, customer, 'customerType');
    let _occupation = safeGet(loading, customer?.customerDetails, 'occupation');
    let monthlyIncome =
      safeGet(loading, customer?.customerDetails, 'monthlyIncome') ?? '-';
    const _registerNumber = safeGet(loading, usedVehicle, 'registerNumber');
    let customerID = safeGet(loading, customer, 'id') ?? '-';

    const hypothecationStatus = safeGet(
      loading,
      usedVehicle,
      'hypothecationStatus',
    );

    return (
      <View_Loan_Details_Component
        loanOverviewCard={{
          status: safeGet(loading, selectedLoanApplication, 'status'),
          loanApplicationId: safeGet(
            loading,
            selectedLoanApplication,
            'loanApplicationId',
          ),
          lenderName: safeGet(loading, selectedLoanApplication, 'lenderName'),
          interesetRate: safeGet(
            loading,
            selectedLoanApplication,
            'interesetRate',
          ),
          footerInfo: [
            {
              label: 'Loan Amount',
              value: formatIndianCurrency(
                safeGet(loading, selectedLoanApplication, 'loanAmount'),
              ),
            },
            {
              label: 'EMI',
              value: formatIndianCurrency(
                safeGet(loading, selectedLoanApplication, 'emi'),
              ),
            },
            {
              label: 'Principal Amount',
              value: formatIndianCurrency(
                safeGet(loading, selectedLoanApplication, 'principalAmount'),
              ),
            },
            {
              label: 'Processing Fee',
              value: formatIndianCurrency(
                safeGet(loading, selectedLoanApplication, 'processingFee'),
              ),
            },
            {
              label: 'Tenure',
              value: formatMonths(selectedLoanApplication?.tenure, loading),
            },
            {
              label: 'Loan Type',
              value: getLabelFromEnum(
                loanTypeLabelMap,
                selectedLoanApplication?.loanType,
              ),
            },
          ],
          rejectionReason: safeGet(
            loading,
            selectedLoanApplication,
            'rejectionReason',
          ),
        }}
        customerDetail={[
          {
            label: 'Customer Name',
            value: safeGet(loading, customer?.customerDetails, 'applicantName'),
          },
          {label: 'Customer ID', value: formatShortId(customerID)},
          {
            label: 'Customer Type',
            value: getLabelFromEnum(customerCategoryValue, _customerCategory),
          },
          {
            label: 'Individual Type',
            value: getLabelFromEnum(customerIndividualTypeValue, _customerType),
          },
          {
            label: 'Mobile Number',
            value:
              safeGet(loading, customer?.customerDetails, 'mobileNumber') ||
              safeGet(loading, customer, 'mobileNumber') ||
              '-',
          },
          {
            label: 'Gender',
            value: safeGet(loading, customer?.customerDetails, 'gender'),
          },
          {
            label: 'Father/Mother Name',
            value: safeGet(loading, customer?.customerDetails, 'fatherName'),
          },
          {
            label: 'Spouse Name',
            value: safeGet(loading, customer?.customerDetails, 'spouseName'),
          },
          {
            label: 'Email address',
            value: safeGet(loading, customer?.customerDetails, 'email'),
            full: true,
          },
          {label: 'Date of Birth', value: formatDate(dob)},
          {
            label: 'Current Address',
            value: safeGet(loading, customer?.customerDetails, 'address'),
            full: true,
          },
          {
            label: 'Current Pincode',
            value: safeGet(loading, customer?.customerDetails, 'pincode'),
          },
          {
            label: 'Occupation',
            value: getLabelFromEnum(occupationLabelMap, _occupation) || '-',
          },
          {
            label: 'Income Source',
            value: safeGet(loading, customer?.customerDetails, 'incomeSource'),
          },
          {
            label: 'Monthly Income',
            value: formatIndianCurrency(monthlyIncome) ?? '-',
          },
          {
            label: 'CIBIL Score',
            value: safeGet(loading, customer, 'cibilScore'),
          },
        ]}
        vehicleDetail={[
          {label: 'Vehicle Type', value: 'Private Car'},
          {
            label: 'Register Number',
            value: formatVehicleNumber(_registerNumber),
          },
          {
            label: 'Owner Name',
            value: safeGet(loading, usedVehicle, 'ownerName'),
          },
          {
            label: 'Manufacture Year',
            value: safeGet(loading, usedVehicle, 'manufactureYear'),
          },
          {
            label: 'Chassis Number',
            value: safeGet(loading, usedVehicle, 'chassisNumber'),
          },
          {
            label: 'Engine Number',
            value: safeGet(loading, usedVehicle, 'engineNumber'),
          },
          {label: 'Registration Date', value: '17 Sep 2019'},
          {
            label: 'Registration Authority',
            value: safeGet(loading, usedVehicle, 'registrationAuthority'),
          },
          {label: 'Fuel Type', value: safeGet(loading, vehicle, 'fuelType')},
          {
            label: 'Emission Norm',
            value: safeGet(loading, usedVehicle, 'emissionNorm'),
          },
          {
            label: 'Vehicle Age',
            value: safeGet(loading, usedVehicle, 'vehicleAge'),
          },
          {
            label: 'Hypothecated',
            value:
              getLabelFromEnum(currentLoanLabelMap, hypothecationStatus) || '-',
          },
          {
            label: 'Vehicle Status',
            value: safeGet(loading, usedVehicle, 'vehicleStatus'),
          },
          {label: 'Insurance Valid Upto', value: '17 Sep 2025'},
          {label: 'Fitness Valid Upto', value: '17 Sep 2025'},
          {
            label: 'PUCC',
            value: usedVehicle?.PUCC ? ' Yes' : 'No',
          },
          {
            label: 'Ownership',
            value: safeGet(loading, usedVehicle, 'ownershipCount'),
          },
        ]}
        onTrackLoanStatusPress={this.onTrackLoanStatusPress}
        onBackToHomePress={this.onBackToHomePress}
        onTackLoanApplication={this.onTackLoanApplication}
        loading={loading}
        handleEditLoanApplication={this.handleEditLoanApplication}
        isReadOnlyLoanApplication={isReadOnlyLoanApplication}
        handleDeleteLoanApplication={this.handleDeleteLoanApplication}
        showDeleteLoanApplication={this.showDeleteLoanApplication}
        isDeleteModalVisible={isDeleteModalVisible}
        omModalHide={this.omModalHide}
        isLoading={isLoading}
      />
    );
  }
}

const mapActionCreators = {
  fetchLoanApplicationFromIdThunk,
  selectedLoanType,
  addCustomerBasicDetail,
  deleteLoanApplicationByIdThunk,
};
// Redux: map state to props
const mapStateToProps = ({loanData}) => {
  return {
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
    isReadOnlyLoanApplication: loanData?.isReadOnlyLoanApplication,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ViewLoanDetailsScreen);
