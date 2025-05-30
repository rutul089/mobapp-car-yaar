import React, {Component} from 'react';
import {connect} from 'react-redux';
import Thank_You_Component from './Thank_You_Component';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {fetchLoanApplicationFromIdThunk} from '../../redux/actions';
import {
  formatAmount,
  formatDate,
  formatIndianCurrency,
  formatMonths,
  formatVehicleNumber,
  safeGet,
} from '../../utils/helper';
import {
  customerCategoryValue,
  customerIndividualTypeValue,
  getLabelFromEnum,
  loanTypeLabelMap,
  occupationLabelMap,
} from '../../constants/enums';

class ThankYouScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBackToHomePress = this.onBackToHomePress.bind(this);
    this.onTrackLoanStatusPress = this.onTrackLoanStatusPress.bind(this);
  }

  componentDidMount() {
    const {selectedLoanApplication, selectedApplicationId} = this.props;

    this.props.fetchLoanApplicationFromIdThunk(selectedApplicationId);
  }

  onBackToHomePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  onTrackLoanStatusPress = () => {
    navigate(ScreenNames.TrackApplication);
  };

  render() {
    const {selectedLoanApplication, loading} = this.props;
    const {
      loanApplicationId,
      createdAt,
      tenure,
      customer: {
        customerType,
        customerCategory,
        customerDetails: {
          applicantName,
          gender,
          mobileNumber,
          dob,
          pincode,
          occupation,
          monthlyIncome,
          incomeSource,
        } = {},
      } = {},
      vehicle: {fuelType} = {},
      usedVehicle: {
        registerNumber,
        ownerName,
        manufactureYear,
        chassisNumber,
        engineNumber,
        registrationDate,
        registrationAuthority,
        emissionNorm,
        insuranceValidUpto,
        fitnessValidUpto,
        PUCC,
        vehicleStatus,
        hypothecationStatus,
        vehicleAge,
        ownershipCount,
      } = {},
    } = selectedLoanApplication || {};

    let loanAmount = safeGet(loading, selectedLoanApplication, 'loanAmount');
    let emi = safeGet(loading, selectedLoanApplication, 'emi');
    let processingFee = safeGet(
      loading,
      selectedLoanApplication,
      'processingFee',
    );
    let principalAmount = safeGet(
      loading,
      selectedLoanApplication,
      'principalAmount',
    );
    let loanType = safeGet(loading, selectedLoanApplication, 'loanType');

    return (
      <>
        <Thank_You_Component
          createdAt={formatDate(createdAt, 'DD MMM YYYY, hh:mm A')}
          loanApplicationId={loanApplicationId}
          loanDetails={[
            {
              label: 'Lender Name',
              value: safeGet(loading, selectedLoanApplication, 'lenderName'),
            },
            {
              label: 'Interest Rate',
              value: `${
                safeGet(loading, selectedLoanApplication, 'interesetRate') ||
                '0'
              }%`,
            },
            {
              label: 'Loan Amount',
              value: formatIndianCurrency(loanAmount),
            },
            {label: 'Tenure', value: formatMonths(tenure, loading)},
            {label: 'EMI', value: formatIndianCurrency(emi)},
            {
              label: 'Processing Fee',
              value: formatIndianCurrency(processingFee),
            },
            {
              label: 'Principal Amount',
              value: formatIndianCurrency(principalAmount),
            },
            {
              label: 'Loan Type',
              value: getLabelFromEnum(loanTypeLabelMap, loanType),
            },
          ]}
          customerDetail={[
            {label: 'Customer Name', value: loading ? '-' : applicantName},
            {label: 'Customer ID', value: '#968040'},
            {
              label: 'Customer Type',
              value: getLabelFromEnum(
                customerIndividualTypeValue,
                customerType,
              ),
            },
            {
              label: 'Individual Type',
              value: getLabelFromEnum(customerCategoryValue, customerCategory),
            },
            {label: 'Mobile Number', value: loading ? '-' : mobileNumber},
            {label: 'Gender', value: loading ? '-' : gender},
            {
              label: 'Father/Mother Name',
              value: safeGet(
                loading,
                selectedLoanApplication?.customer?.customerDetails,
                'fatherName',
              ),
            },
            {
              label: 'Spouse Name',
              value: safeGet(
                loading,
                selectedLoanApplication?.customer?.customerDetails,
                'spouseName',
              ),
            },
            {
              label: 'Email address',
              value: safeGet(
                loading,
                selectedLoanApplication?.customer?.customerDetails,
                'email',
              ),
              full: true,
            },
            {label: 'Date of Birth', value: formatDate(dob)},
            {
              label: 'Current Address',
              value: safeGet(
                loading,
                selectedLoanApplication?.customer?.customerDetails,
                'address',
              ),
              full: true,
            },
            {label: 'Current Pincode', value: pincode},
            {
              label: 'Occupation',
              value: getLabelFromEnum(occupationLabelMap, occupation),
            },
            {label: 'Income Source', value: incomeSource},
            {
              label: 'Monthly Income',
              value: formatIndianCurrency(monthlyIncome),
            },
          ]}
          vehicleDetail={[
            {label: 'Vehicle Type', value: '-'},
            {
              label: 'Register Number',
              value: formatVehicleNumber(registerNumber),
            },
            {label: 'Owner Name', value: ownerName},
            {label: 'Manufacture Year', value: manufactureYear},
            {label: 'Chassis Number', value: chassisNumber},
            {label: 'Engine Number', value: engineNumber},
            {label: 'Registration Date', value: formatDate(registrationDate)},
            {label: 'Registration Authority', value: registrationAuthority},
            {label: 'Fuel Type', value: fuelType},
            {label: 'Emission Norm', value: emissionNorm},
            {label: 'Vehicle Age', value: vehicleAge},
            {label: 'Hypothecated', value: hypothecationStatus ? 'Yes' : 'No'},
            {label: 'Vehicle Status', value: vehicleStatus},
            {
              label: 'Insurance Valid Upto',
              value: formatDate(insuranceValidUpto),
            },
            {label: 'Fitness Valid Upto', value: formatDate(fitnessValidUpto)},
            {label: 'PUCC', value: PUCC ? 'Yes' : 'No'},
            {label: 'Ownership', value: ownershipCount},
          ]}
          partnerDetail={[
            {label: 'Partner ID', value: '0123'},
            {label: 'Partner Name', value: 'Partner Name'},
            {
              label: 'Sales Executive Name',
              value: 'Mahmood Butala',
              full: true,
            },
          ]}
          onTrackLoanStatusPress={this.onTrackLoanStatusPress}
          onBackToHomePress={this.onBackToHomePress}
        />
      </>
    );
  }
}

const mapActionCreators = {fetchLoanApplicationFromIdThunk};
const mapStateToProps = ({loanData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(mapStateToProps, mapActionCreators)(ThankYouScreen);
