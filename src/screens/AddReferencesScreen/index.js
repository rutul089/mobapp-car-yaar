import React, {Component} from 'react';
import {connect} from 'react-redux';
import Add_References_Component from './Add_References_Component';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {
  getLabelFromEnum,
  occupationLabelMap,
  relationshipTypeValue,
} from '../../constants/enums';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {postCustomerReferenceDetailsThunk} from '../../redux/actions';

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
    };
    this.onConfirmLoanPress = this.onConfirmLoanPress.bind(this);
  }

  componentDidMount() {
    const {isEdit} = this.state;
    console.log({isEdit});
  }

  onConfirmLoanPress = () => {
    const {selectedApplicationId} = this.props;

    const {
      relationshipHome,
      referenceNameHome,
      mobileNumberHome,
      addressHome,
      pincodeHome,
      referenceNameOffice,
      mobileNumberOffice,
      relationshipOffice,
      addressOffice,
      pincodeOffice,
    } = this.state;

    navigate(ScreenNames.ThankYouView);
    return;
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    let payload = {
      references: [
        {
          referenceType: 'HOME',
          referenceName: relationshipHome,
          mobileNumber: mobileNumberHome + '',
          relationship: referenceNameHome,
          address: addressHome,
          pincode: pincodeHome + '',
        },
        {
          referenceType: 'OFFICE',
          referenceName: referenceNameOffice,
          mobileNumber: mobileNumberOffice + '',
          relationship: relationshipOffice,
          address: addressOffice,
          pincode: pincodeOffice + '',
        },
      ],
    };

    this.props.postCustomerReferenceDetailsThunk(
      selectedApplicationId,
      payload,
      response => {
        if (response?.success) {
          navigate(ScreenNames.ThankYouView);
        }
      },
    );
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
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};
    return (
      <Add_References_Component
        headerProp={{
          title: `${isEdit ? 'Edit ' : 'Add '}References`,
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
          },
          mobileNumberHome: {
            isError: errors?.mobileNumberHome,
            statusMsg: errors?.mobileNumberHome,
            value: mobileNumberHome,
            maxLength: 10,
          },
          addressHome: {
            isError: errors?.addressHome,
            statusMsg: errors?.addressHome,
            value: addressHome,
          },
          pincodeHome: {
            isError: errors?.pincodeHome,
            statusMsg: errors?.pincodeHome,
            value: pincodeHome,
            maxLength: 6,
          },
          referenceNameOffice: {
            isError: errors?.referenceNameOffice,
            statusMsg: errors?.referenceNameOffice,
            autoCapitalize: 'words',
            value: referenceNameOffice,
          },
          mobileNumberOffice: {
            isError: errors?.mobileNumberOffice,
            statusMsg: errors?.mobileNumberOffice,
            value: mobileNumberOffice,
            maxLength: 10,
          },
          addressOffice: {
            isError: errors?.addressOffice,
            statusMsg: errors?.addressOffice,
            value: addressOffice,
          },
          pincodeOffice: {
            isError: errors?.pincodeOffice,
            statusMsg: errors?.pincodeOffice,
            value: pincodeOffice,
            maxLength: 6,
          },
          relationshipHome: {
            isError: errors?.relationshipHome,
            statusMsg: errors?.relationshipHome,
          },
          relationshipOffice: {
            isError: errors?.relationshipOffice,
            statusMsg: errors?.relationshipOffice,
          },
        }}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {postCustomerReferenceDetailsThunk};
const mapStateToProps = ({loanData, vehicleData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
    isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
    selectedVehicle: vehicleData?.selectedVehicle,
  };
};
export default connect(mapStateToProps, mapActionCreators)(AddReferencesScreen);
