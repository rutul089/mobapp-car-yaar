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
import strings from '../../locales/strings';

class CustomerEnvelopeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carYarPartner: '',
      salesExecutive: '',
      salesExecutiveUserId: '',
      partnerUserId: '',
      carYarPartnerValue: '',
      salesExecutiveValue: '',
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      errors: {},
      showError: false,
    };
  }

  componentDidMount() {
    const {selectedApplicationId} = this.props;
    this.props.fetchLoanApplicationFromIdThunk(
      selectedApplicationId,
      {},
      response => {
        if (response?.partnerUser) {
          this.setState({
            carYarPartner: response?.partnerUser?.user?.name || '',
            partnerUserId: response?.partnerUser?.id || '',
            carYarPartnerValue: response?.partnerUser?.id || '',
          });
        }

        if (response?.salesExecutive) {
          this.setState({
            salesExecutive: response?.salesExecutive?.user?.name || '',
            salesExecutiveUserId: response?.salesExecutive?.id || '',
            salesExecutiveValue: response?.salesExecutive?.id || '',
          });
        }
      },
    );
  }

  onChangeField = (key, value, isOptional = false) => {
    this.setState({showError: false});
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
    this.onChangeField('salesExecutiveUserId', value?.id);
    this.onChangeField('salesExecutive', value?.user?.name);
    this.onChangeField('salesExecutiveValue', value?.user?.name);
  };

  onSelectPartner = value => {
    this.onChangeField('carYarPartner', value?.name);
    this.onChangeField('partnerUserId', value?.id);
    this.onChangeField('carYarPartnerValue', value?.id);
  };

  validateAllFields = () => {
    const requiredFields = [
      'carYarPartner',
      'salesExecutive',
      'salesExecutiveUserId',
      'partnerUserId',
      'carYarPartnerValue',
      'salesExecutiveValue',
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
    const {errors} = this.state;
    if (!this.validateAllFields()) {
      this.setState({showError: true});

      showToast(
        'warning',
        errors?.salesExecutiveValue ||
          errors?.carYarPartnerValue ||
          strings.errorMissingField,
        'bottom',
        3000,
      );
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
    const {errors, salesExecutive, carYarPartner, showError} = this.state;
    let _mobileNumber =
      customer?.customerDetails.mobileNumber || customer?.mobileNumber || '-';

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
            value: _mobileNumber,
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
          {
            label: 'CIBIL Score',
            value: safeGet(loading, customer, 'cibilScore'),
          },
        ]}
        onViewLenderPress={this.onViewLenderPress}
        onSalesExecutiveChange={value => {
          this.onChangeField('salesExecutive', value);
          this.onChangeField('salesExecutiveUserId', '');
          this.onChangeField('salesExecutiveValue', '');
        }}
        onPartnerChange={value => {
          this.onChangeField('carYarPartner', value);
          this.onChangeField('partnerUserId', '');
          this.onChangeField('carYarPartnerValue', '');
        }}
        searchSalesExecutiveFromAPI={this.searchSalesExecutiveFromAPI}
        searchPartnerFromAPI={this.searchPartnerFromAPI}
        onSelectSalesExecutive={this.onSelectSalesExecutive}
        onSelectPartner={this.onSelectPartner}
        restInputProps={{
          salesExecutive: {
            value: salesExecutive,
            isError: showError,
            statusMsg: errors.salesExecutive,
          },
          carYarPartner: {
            value: carYarPartner,
            isError: showError,
            statusMsg: errors?.carYarPartner,
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
