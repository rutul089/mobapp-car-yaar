import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getLabelFromEnum,
  loanType,
  loanTypeLabelMap,
} from '../../constants/enums';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import {
  fetchLoanApplicationFromIdThunk,
  fetchPartnerEmployeeByIdThunk,
  searchSalesExecutivesThunk,
  setPartnerAndSalesExecutiveThunk,
} from '../../redux/actions';
import {
  formatIndianCurrency,
  formatVehicleDetails,
  formatVehicleNumber,
  safeGet,
  showToast,
} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Customer_Envelop_Component from './Customer_Envelop_Component';

class CustomerEnvelopeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carYarPartner: '',
      salesExecutive: '',
      salesExecutiveUserId: '',
      partnerUserId: '',
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      errors: {},
    };
  }

  componentDidMount() {
    const {selectedApplicationId} = this.props;
    this.props.fetchLoanApplicationFromIdThunk(selectedApplicationId);
  }

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  resetSalesExecutiveFields = () => {
    // this.onChangeField('salesExecutive', '');
    this.onChangeField('salesExecutiveUserId', '');
  };

  resetPartnerFields = () => {
    // this.onChangeField('carYarPartner', '');
    this.onChangeField('partnerUserId', '');
  };

  searchSalesExecutiveFromAPI = async query => {
    this.onChangeField('salesExecutive', query);
    try {
      const response = await this.props.searchSalesExecutivesThunk(query);
      const data = response?.data ?? [];
      if (!response?.success || data.length === 0) {
        // this.resetSalesExecutiveFields();
      } else {
        this.onChangeField('salesExecutiveUserId', '');
      }
      return data;
    } catch (error) {
      this.resetSalesExecutiveFields();
      return [];
    }
  };

  searchPartnerFromAPI = async query => {
    const {partnerId} = this.props;
    this.onChangeField('carYarPartner', query);
    try {
      const response = await this.props.fetchPartnerEmployeeByIdThunk(
        partnerId,
        {
          search: query,
        },
      );
      const employees = response?.data?.employees ?? [];
      if (!response?.success || employees.length === 0) {
        this.resetPartnerFields();
      } else {
        this.onChangeField('partnerUserId', '');
      }
      return employees;
    } catch (error) {
      this.resetPartnerFields();
      return [];
    }
  };

  onSelectSalesExecutive = value => {
    this.onChangeField('salesExecutiveUserId', value?.userId);
    this.onChangeField('salesExecutive', value?.user?.name);
  };

  onSelectPartner = value => {
    this.onChangeField('carYarPartner', value?.name);
    this.onChangeField('partnerUserId', value?.id);
  };

  validateAllFields = () => {
    const requiredFields = [
      'carYarPartner',
      'salesExecutive',
      'salesExecutiveUserId',
      'partnerUserId',
    ];
    const errors = {};
    let isFormValid = true;

    requiredFields.forEach(key => {
      const error = validateField(key, this.state[key]);
      if (error) {
        errors[key] = error;
        isFormValid = false;
      }
    });

    this.setState({errors});
    return isFormValid;
  };

  onViewLenderPress = () => {
    if (!this.validateAllFields()) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    const {selectedLoanType, selectedApplicationId} = this.props;
    const params = getScreenParam(this.props.route, 'params');
    let payload = {
      partnerUserId: this.state.partnerUserId,
      salesExecutiveUserId: this.state.salesExecutiveUserId,
    };

    this.props.setPartnerAndSalesExecutiveThunk(
      selectedApplicationId,
      payload,
      response => {
        const targetScreen =
          selectedLoanType === loanType.internalBT
            ? ScreenNames.LenderDetails
            : ScreenNames.LenderSelection;

        navigate(targetScreen, {params});
      },
      error => {
        const targetScreen =
          selectedLoanType === loanType.internalBT
            ? ScreenNames.LenderDetails
            : ScreenNames.LenderSelection;

        navigate(targetScreen, {params});
      },
    );
  };

  render() {
    const {selectedLoanApplication, loading} = this.props;
    const {
      loanAmount,
      loanApplicationId,
      usedVehicle = {},
      vehicle = {},
      customer = {},
    } = selectedLoanApplication || {};
    const _registerNumber = safeGet(loading, usedVehicle, 'registerNumber');
    const {errors, salesExecutive, carYarPartner} = this.state;

    return (
      <Customer_Envelop_Component
        loanApplicationId={loanApplicationId}
        vehicleDetails={[
          {
            label: 'Registrar Number',
            value: formatVehicleNumber(_registerNumber),
          },
          {label: 'Make', value: safeGet(loading, vehicle, 'make')},
          {label: 'Model', value: formatVehicleDetails(vehicle)},
          {
            label: 'Year',
            value: safeGet(loading, usedVehicle, 'manufactureYear'),
          },
        ]}
        loanDetails={[
          {
            label: 'Applicant Name',
            value: safeGet(loading, customer, 'customerDetails.applicantName'),
          },
          {
            label: 'Mobile Number',
            value: safeGet(loading, customer, 'customerDetails.mobileNumber'),
          },
          {label: 'Vehicle Type', value: 'Used Car'},
          {
            label: 'Loan Type',
            value:
              getLabelFromEnum(
                loanTypeLabelMap,
                selectedLoanApplication?.loanType,
              ) || '-',
          },
          {
            label: 'Desired Loan Amount',
            value: formatIndianCurrency(loanAmount),
          },
        ]}
        onViewLenderPress={this.onViewLenderPress}
        onSalesExecutiveChange={value => {
          this.onChangeField('salesExecutive', value);
          this.onChangeField('salesExecutiveUserId', '');
        }}
        onPartnerChange={value => {
          this.onChangeField('carYarPartner', value);
          this.onChangeField('partnerUserId', '');
        }}
        searchSalesExecutiveFromAPI={this.searchSalesExecutiveFromAPI}
        searchPartnerFromAPI={this.searchPartnerFromAPI}
        onSelectSalesExecutive={this.onSelectSalesExecutive}
        onSelectPartner={this.onSelectPartner}
        restInputProps={{
          salesExecutive: {
            value: salesExecutive,
            // isError: errors.salesExecutiveUserId,
            // statusMsg: errors.salesExecutiveUserId,
          },
          carYarPartner: {
            value: carYarPartner,
            // isError: errors.carYarPartner,
            // statusMsg: errors.carYarPartner,
          },
        }}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({loanData, user}) => ({
  selectedLoanType: loanData.selectedLoanType,
  loading: loanData.loading,
  selectedLoanApplication: loanData.selectedLoanApplication,
  selectedApplicationId: loanData.selectedApplicationId,
  partnerId: user?.userProfile?.partnerUser?.partnerId,
  userProfile: user?.userProfile,
});

const mapDispatchToProps = {
  fetchLoanApplicationFromIdThunk,
  fetchPartnerEmployeeByIdThunk,
  searchSalesExecutivesThunk,
  setPartnerAndSalesExecutiveThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerEnvelopeScreen);
