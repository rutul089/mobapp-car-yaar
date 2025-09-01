import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLabelFromEnum, relationshipTypeValue} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {
  editCustomerReferenceDetailsThunk,
  getCustomerReferenceDetailsThunk,
  postCustomerReferenceDetailsThunk,
  submitLoanApplicationThunk,
} from '../../redux/actions';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Add_References_Component from './Add_References_Component';

class AddReferencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationshipHome: '',
      relationshipOffice: '',
      referenceNameHome: '',
      mobileNumberHome: '',
      addressHome: '',
      pincodeHome: '',
      referenceNameOffice: '',
      mobileNumberOffice: '',
      addressOffice: '',
      pincodeOffice: '',
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      idHome: '',
      idOffice: '',
      errors: {
        relationshipHome: '',
        relationshipOffice: '',
        referenceNameHome: '',
        mobileNumberHome: '',
        addressHome: '',
        pincodeHome: '',
        referenceNameOffice: '',
        mobileNumberOffice: '',
        addressOffice: '',
        pincodeOffice: '',
      },
      isFormValid: false,
      isNoReference: false,
    };
    this.onConfirmLoanPress = this.onConfirmLoanPress.bind(this);
  }

  componentDidMount() {
    const {isEdit} = this.state;
    const {selectedApplicationId} = this.props;
    if (isEdit) {
      this.props.getCustomerReferenceDetailsThunk(
        selectedApplicationId,
        response => {
          if (response?.success) {
            this.setState({
              isNoReference: !response.data.length > 0,
            });
            this.formatReferenceData(response.data);
          }
        },
        error => {},
      );
    }
  }

  formatReferenceData = data => {
    const setStateFromRef = (ref, prefix) => {
      this.setState({
        [`relationship${prefix}`]: ref.relationship,
        [`referenceName${prefix}`]: ref.referenceName,
        [`mobileNumber${prefix}`]: String(ref.mobileNumber),
        [`address${prefix}`]: ref.address,
        [`pincode${prefix}`]: String(ref.pincode),
        [`id${prefix}`]: ref.id,
      });
    };

    let homeRefSet = false;
    let officeRefSet = false;

    for (const item of data) {
      const type = item.type?.toUpperCase();

      if (type === 'HOME' && !homeRefSet) {
        setStateFromRef(item, 'Home');
        homeRefSet = true;
      } else if (type === 'OFFICE' && !officeRefSet) {
        setStateFromRef(item, 'Office');
        officeRefSet = true;
      }

      if (homeRefSet && officeRefSet) {
        break;
      }
    }
  };

  onConfirmLoanPress = () => {
    const {selectedApplicationId, isReadOnlyLoanApplication} = this.props;
    const {isEdit, isNoReference} = this.state;

    if (isReadOnlyLoanApplication) {
      return navigate(ScreenNames.ThankYouView);
    }

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    const references = ['Home', 'Office'].map(prefix => {
      const reference = {
        referenceType: prefix.toUpperCase(),
        referenceName: this.state[`referenceName${prefix}`],
        mobileNumber: String(this.state[`mobileNumber${prefix}`]),
        relationship: this.state[`relationship${prefix}`],
        address: this.state[`address${prefix}`],
        pincode: String(this.state[`pincode${prefix}`]),
      };

      if (isEdit && !isNoReference) {
        reference.id = this.state[`id${prefix}`];
      }

      return reference;
    });

    const payload = {references};

    const callback = response => {
      if (response?.success) {
        navigate(ScreenNames.ThankYouView);
      }
    };

    if (!isEdit) {
      this.props.submitLoanApplicationThunk(selectedApplicationId);
    }

    const action =
      isEdit && !isNoReference
        ? this.props.editCustomerReferenceDetailsThunk
        : this.props.postCustomerReferenceDetailsThunk;

    action(selectedApplicationId, payload, callback);
  };

  onReferenceSelected = (item, type) => {
    const relationshipKeyMap = {
      HOME: 'relationshipHome',
      OFFICE: 'relationshipOffice',
    };

    const key = relationshipKeyMap[type];
    if (key) {
      this.setState({[key]: item?.value}, () => {
        this.onChangeField([key], this.state[key]);
      });
    }
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'relationshipHome',
      'relationshipOffice',
      'referenceNameHome',
      'mobileNumberHome',
      'addressHome',
      'pincodeHome',
      'referenceNameOffice',
      'mobileNumberOffice',
      'addressOffice',
      'pincodeOffice',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];

      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  render() {
    const {
      relationshipHome,
      relationshipOffice,
      isEdit,
      errors,
      referenceNameHome,
      mobileNumberHome,
      addressHome,
      pincodeHome,
      referenceNameOffice,
      mobileNumberOffice,
      addressOffice,
      pincodeOffice,
    } = this.state;

    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
      isReadOnlyLoanApplication,
    } = this.props;

    const {UsedVehicle = {}} = selectedVehicle || {};

    return (
      <Add_References_Component
        headerProp={{
          title: `${
            isReadOnlyLoanApplication ? '' : isEdit ? 'Edit ' : 'Add '
          }References`,
          subtitle: isCreatingLoanApplication
            ? formatVehicleNumber(UsedVehicle?.registerNumber)
            : '',
          showRightContent: true,
          rightLabel:
            isCreatingLoanApplication || isEdit
              ? selectedLoanApplication?.loanApplicationId || ''
              : '',
          rightLabelColor: '#F8A902',
          onBackPress: () => goBack(),
        }}
        onConfirmLoanPress={this.onConfirmLoanPress}
        onReferenceSelected={this.onReferenceSelected}
        relationshipHome={getLabelFromEnum(
          relationshipTypeValue,
          relationshipHome,
        )}
        relationshipOffice={getLabelFromEnum(
          relationshipTypeValue,
          relationshipOffice,
        )}
        onReferenceNameHomeChange={value =>
          this.onChangeField('referenceNameHome', value)
        }
        onMobileNumberHomeChange={value =>
          this.onChangeField('mobileNumberHome', value)
        }
        onAddressHomeChange={value => this.onChangeField('addressHome', value)}
        onPincodeHomeChange={value => this.onChangeField('pincodeHome', value)}
        onReferenceNameOfficeChange={value =>
          this.onChangeField('referenceNameOffice', value)
        }
        onMobileNumberOfficeChange={value =>
          this.onChangeField('mobileNumberOffice', value)
        }
        onAddressOfficeChange={value =>
          this.onChangeField('addressOffice', value)
        }
        onPincodeOfficeChange={value =>
          this.onChangeField('pincodeOffice', value)
        }
        restInputProps={{
          referenceNameHome: {
            isError: errors?.referenceNameHome,
            statusMsg: errors?.referenceNameHome,
            autoCapitalize: 'words',
            value: referenceNameHome,
            isDisabled: isReadOnlyLoanApplication,
          },
          mobileNumberHome: {
            isError: errors?.mobileNumberHome,
            statusMsg: errors?.mobileNumberHome,
            value: mobileNumberHome,
            maxLength: 10,
            isDisabled: isReadOnlyLoanApplication,
          },
          addressHome: {
            isError: errors?.addressHome,
            statusMsg: errors?.addressHome,
            value: addressHome,
            isDisabled: isReadOnlyLoanApplication,
          },
          pincodeHome: {
            isError: errors?.pincodeHome,
            statusMsg: errors?.pincodeHome,
            value: pincodeHome,
            maxLength: 6,
            isDisabled: isReadOnlyLoanApplication,
          },
          referenceNameOffice: {
            isError: errors?.referenceNameOffice,
            statusMsg: errors?.referenceNameOffice,
            autoCapitalize: 'words',
            value: referenceNameOffice,
            isDisabled: isReadOnlyLoanApplication,
          },
          mobileNumberOffice: {
            isError: errors?.mobileNumberOffice,
            statusMsg: errors?.mobileNumberOffice,
            value: mobileNumberOffice,
            maxLength: 10,
            isDisabled: isReadOnlyLoanApplication,
          },
          addressOffice: {
            isError: errors?.addressOffice,
            statusMsg: errors?.addressOffice,
            value: addressOffice,
            isDisabled: isReadOnlyLoanApplication,
          },
          pincodeOffice: {
            isError: errors?.pincodeOffice,
            statusMsg: errors?.pincodeOffice,
            value: pincodeOffice,
            maxLength: 6,
            isDisabled: isReadOnlyLoanApplication,
          },
          relationshipHome: {
            isError: errors?.relationshipHome,
            statusMsg: errors?.relationshipHome,
            isDisabled: isReadOnlyLoanApplication,
          },
          relationshipOffice: {
            isError: errors?.relationshipOffice,
            statusMsg: errors?.relationshipOffice,
            isDisabled: isReadOnlyLoanApplication,
          },
        }}
        loading={loading}
        isReadOnlyLoanApplication={isReadOnlyLoanApplication}
      />
    );
  }
}

const mapActionCreators = {
  postCustomerReferenceDetailsThunk,
  getCustomerReferenceDetailsThunk,
  editCustomerReferenceDetailsThunk,
  submitLoanApplicationThunk,
};
const mapStateToProps = ({loanData, vehicleData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
    isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
    selectedVehicle: vehicleData?.selectedVehicle,
    isReadOnlyLoanApplication: loanData?.isReadOnlyLoanApplication,
  };
};
export default connect(mapStateToProps, mapActionCreators)(AddReferencesScreen);
