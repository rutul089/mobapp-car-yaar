import React, {Component} from 'react';
import {connect} from 'react-redux';
import View_Loan_Details_Component from './View_Loan_Details_Component';
import {
  getScreenParam,
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {fetchLoanApplicationFromIdThunk} from '../../redux/actions';
import {
  formatDate,
  formatIndianCurrency,
  formatMonths,
  safeGet,
} from '../../utils/helper';
import {
  customerCategoryValue,
  customerIndividualTypeValue,
  getLabelFromEnum,
  loanTypeLabelMap,
  occupationLabelMap,
} from '../../constants/enums';

class ViewLoanDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanDetail: {},
      applicationId: getScreenParam(props.route, 'params')?.id || '',
    };
    this.onBackToHomePress = this.onBackToHomePress.bind(this);
    this.onTrackLoanStatusPress = this.onTrackLoanStatusPress.bind(this);
    this.onTackLoanApplication = this.onTackLoanApplication.bind(this);
  }

  componentDidMount() {
    const {applicationId} = this.state;
    const {selectedLoanApplication} = this.props;
    if (applicationId && !selectedLoanApplication) {
      this.props.fetchLoanApplicationFromIdThunk(applicationId);
    }
  }

  onBackToHomePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  onTrackLoanStatusPress = () => {
    navigate(ScreenNames.TrackApplication);
  };

  onTackLoanApplication = () => {};

  render() {
    const {loading, selectedLoanApplication} = this.props;
    const {
      customer = {},
      partner = {},
      vehicle = {},
      usedVehicle = {},
      partnerUser = {},
      salesExecutive = {},
    } = selectedLoanApplication || {};

    let dob = safeGet(loading, customer?.customerDetails, 'dob');
    let _customerCategory = safeGet(loading, customer, 'customerCategory');
    let _customerType = safeGet(loading, customer, 'customerType');
    let _occupation = safeGet(loading, customer?.customerDetails, 'occupation');
    let monthlyIncome =
      safeGet(loading, customer?.customerDetails, 'monthlyIncome') ?? '-';

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
          {label: 'Customer ID', value: '#968040'},
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
            value: safeGet(loading, customer?.customerDetails, 'mobileNumber'),
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
        ]}
        vehicleDetail={[
          {label: 'Vehicle Type', value: 'Private Car'},
          {
            label: 'Register Number',
            value: safeGet(loading, usedVehicle, 'registerNumber'),
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
            value: safeGet(loading, usedVehicle, 'hypothecationStatus') || '-',
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
      />
    );
  }
}

const mapActionCreators = {fetchLoanApplicationFromIdThunk};
// Redux: map state to props
const mapStateToProps = ({loanData}) => {
  return {
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ViewLoanDetailsScreen);
