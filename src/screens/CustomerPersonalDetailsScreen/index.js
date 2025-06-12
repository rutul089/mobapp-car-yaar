import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  currentLoanOptions,
  genderType,
  getLabelFromEnum,
  occupationLabelMap,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
  navigateToTab,
} from '../../navigation/NavigationUtils';
import {
  initiateLoanApplicationThunk,
  searchBanksThunk,
  submitCustomerDetailsThunk,
  updateCustomerDetailsThunk,
} from '../../redux/actions';
import {getPresignedDownloadUrl} from '../../services';
import {
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {
  uploadApplicantPhoto,
  uploadDocumentViaPresignedUrl,
} from '../../utils/fileUploadUtils';
import {
  convertToISODate,
  formatDate,
  formatVehicleNumber,
  photoSourceOptions,
  showApiErrorToast,
  showToast,
  uploadOptions,
} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Customer_Personal_Details_Component from './Customer_Personal_Details_Component';
import {get} from 'lodash';

const initialState = {
  applicantPhoto: '',
  pancardPhoto: '',
  panCardNumber: 'YKGWJ8413A',
  aadharNumber: '958296232328',
  applicantName: 'Raju Shah',
  fatherName: 'Raja Shah',
  spouseName: 'Kavisha Brooks',
  email: 'ashk@cardenas.org',
  dob: '',
  address: '9957 Lucero Path Suite 683, Humphreymouth, NE 02200',
  pincode: '380015',
  monthlyIncome: '910454',
  bankName: 'State Bank of India',
  accountNumber: '',
  currentEmi: '',
  maxEmiAfford: '',
  avgMonthlyBankBalance: '',
  gender: genderType.MALE,
  currentLoan: currentLoanOptions.YES,
  aadharFrontPhoto: '',
  aadharBackphoto: '',
  currentState: '',
  occupation: null,
  incomeSource: null,
};

class CustomerPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      incomeSourceOptions: [
        {label: 'Salary', value: 'Salary'},
        {label: 'Business', value: 'Business'},
        {label: 'Freelancing', value: 'Freelancing'},
        {label: 'Rental Income', value: 'Rental Income'},
        {label: 'Investment', value: 'Investment'},
        {label: 'Pension', value: 'Pension'},
        {label: 'Other', value: 'Other'},
      ],
      isOnboard: getScreenParam(props.route, 'params')?.isOnboard || false,
      registrationNumber: '',
      errors: {
        panCardNumber: '',
        aadharNumber: '',
        applicantName: '',
        fatherName: '',
        spouseName: '',
        email: '',
        dob: '',
        address: '',
        pincode: '',
        monthlyIncome: '',
        accountNumber: '',
        currentEmi: '',
        maxEmiAfford: '',
        avgMonthlyBankBalance: '',
        occupation: '',
        incomeSource: '',
        bankName: '',
      },
      isFormValid: false,
      showFilePicker: false,
      selectionType: '',
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      isLoadingDocument: false,
    };
    this.onSelectedLoanOption = this.onSelectedLoanOption.bind(this);
    this.onSelectedOccupation = this.onSelectedOccupation.bind(this);
    this.onSelectIncomeSourceOption =
      this.onSelectIncomeSourceOption.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    const {isEdit} = this.state;
    const {selectedCustomer} = this.props;
    let customerDetail = selectedCustomer?.details;

    if (isEdit) {
      this.setState({
        panCardNumber: customerDetail?.panCardNumber,
        aadharNumber: customerDetail?.aadharNumber,
        applicantName: customerDetail?.applicantName,
        mobileNumber:
          customerDetail?.mobileNumber || selectedCustomer?.mobileNumber,
        gender: customerDetail?.gender ?? genderType.MALE,
        fatherName: customerDetail?.fatherName,
        spouseName: customerDetail?.spouseName,
        email: customerDetail?.email,
        dob: formatDate(customerDetail?.dob, 'DD/MM/YYYY'),
        address: customerDetail?.address,
        pincode: customerDetail?.pincode,
        monthlyIncome: get(customerDetail, 'monthlyIncome', '').toString(),
        bankName: customerDetail?.bankName,
        accountNumber: customerDetail?.accountNumber,
        currentLoan: customerDetail?.currentLoan ?? currentLoanOptions.YES,
        currentEmi: get(customerDetail, 'currentEmi', '').toString(),
        maxEmiAfford: get(customerDetail, 'maxEmiAfford', '').toString(),
        avgMonthlyBankBalance: get(
          customerDetail,
          'avgMonthlyBankBalance',
          '',
        ).toString(),
        occupation: customerDetail?.occupation,
        incomeSource: customerDetail?.incomeSource,
        aadharBackphoto: customerDetail?.aadharBackphoto,
        aadharFrontPhoto: customerDetail?.aadharFrontPhoto,
        pancardPhoto: customerDetail?.pancardPhoto,
        applicantPhoto: customerDetail?.applicantPhoto,
      });
    }
  }

  onSelectedGender = value => {
    this.onChangeField('gender', value);
  };

  onSelectedLoanOption = value => {
    const {currentEmi} = this.state;
    this.onChangeField('currentLoan', value);
    this.onChangeField('currentEmi', currentEmi, !value);
  };

  onSelectedOccupation = (item, index) => {
    this.setState(
      {
        occupation: item.value,
      },
      () => {
        this.onChangeField('occupation', this.state.occupation);
      },
    );
  };

  onSelectIncomeSourceOption = (item, index) => {
    this.setState(
      {
        incomeSource: item?.value,
      },
      () => {
        this.onChangeField('incomeSource', this.state.incomeSource);
      },
    );
  };

  onNextPress = () => {
    const {isEdit} = this.state;
    const {isCreatingLoanApplication} = this.props;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    const payload = this.getPayload();
    const onSuccess = response => {
      if (isEdit) {
        if (response?.success) {
          showToast('success', 'Customer detail updated successfully');
        }
      } else {
        if (isCreatingLoanApplication) {
          return this.createLoanApplication();
        }
        navigateToTab(ScreenNames.Customer);
      }
    };
    const onError = error => showApiErrorToast(error);

    if (isEdit) {
      this.props.updateCustomerDetailsThunk(payload, onSuccess, onError);
    } else {
      this.props.submitCustomerDetailsThunk(payload, onSuccess, onError);
    }
  };

  createLoanApplication = () => {
    const {vehicleId, loanType, selectedCustomerId, selectedApplicationId} =
      this.props;
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

  getPayload = () => {
    const state = this.state;
    const {selectedCustomerId} = this.props;
    let payload = {
      applicantPhoto: state.applicantPhoto,
      pancardPhoto: state.pancardPhoto,
      panCardNumber: state.panCardNumber,
      aadharFrontPhoto: state.aadharFrontPhoto,
      aadharBackphoto: state.aadharBackphoto,
      aadharNumber: state.aadharNumber,
      applicantName: state.applicantName,
      // mobileNumber: state.mobileNumber,
      gender: state.gender,
      fatherName: state.fatherName,
      spouseName: state.spouseName,
      email: state.email,
      dob: convertToISODate(state.dob),
      address: state.address,
      pincode: state.pincode,
      occupation: state.occupation,
      incomeSource: state.incomeSource,
      monthlyIncome: Number(state.monthlyIncome),
      bankName: state.bankName,
      accountNumber: state.accountNumber,
      currentLoan: state.currentLoan,
      currentEmi: !state.currentLoan ? Number(0) : Number(state.currentEmi),
      maxEmiAfford: Number(state.maxEmiAfford),
      avgMonthlyBankBalance: Number(state.avgMonthlyBankBalance),
      customerId: selectedCustomerId,
    };

    return payload;
  };

  validateAllFields = () => {
    const {currentLoan} = this.state;
    const fieldValidationRules = {
      applicantPhoto: {required: false},
      currentEmi: {required: currentLoan},
    };

    const fieldsToValidate = [
      'panCardNumber',
      'aadharNumber',
      'applicantName',
      'fatherName',
      'spouseName',
      'email',
      'dob',
      'address',
      'pincode',
      'monthlyIncome',
      'accountNumber',
      'currentEmi',
      'maxEmiAfford',
      'avgMonthlyBankBalance',
      'occupation',
      'incomeSource',
      'applicantPhoto',
      'aadharFrontPhoto',
      'aadharBackphoto',
      'pancardPhoto',
      'bankName',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const {required = true} = fieldValidationRules[key] || {};

      // Skip validation if field is optional and empty
      if (!required) {
        errors[key] = '';
        return;
      }

      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  handleFileUpload = type => {
    const {selectionType} = this.state;

    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      this.setState({showFilePicker: false, isLoadingDocument: true});
      await new Promise(resolve => setTimeout(resolve, 100));

      const fileName = asset.name || asset.fileName || 'upload';
      const mimeType = asset.type || 'application/octet-stream';

      try {
        if (selectionType === 'applicantPhoto') {
          const url = await uploadApplicantPhoto(asset, fileName, mimeType);
          this.setState({applicantPhoto: url}, () => {
            this.onChangeField('applicantPhoto', url);
          });
        } else {
          const uploadedKey = await uploadDocumentViaPresignedUrl(
            asset,
            fileName,
            mimeType,
            selectionType,
          );
          this.setState({[selectionType]: uploadedKey}, () => {
            this.onChangeField(selectionType, uploadedKey);
          });
        }
      } catch (error) {
        showToast('error', 'Upload failed');
      } finally {
        this.setState({isLoadingDocument: false, showFilePicker: false});
      }
    });
  };

  closeFilePicker = () => {
    this.setState({showFilePicker: false});
  };

  handleFilePicker = type => {
    this.setState({showFilePicker: true, selectionType: type});
  };

  searchBankNameFromAPI = async query => {
    this.onChangeField('bankName', query);
    let searchResult = [];
    await this.props.searchBanksThunk(
      query,
      onSuccess => {
        searchResult = onSuccess;
      },
      error => {
        return [];
      },
    );
    return searchResult;
  };

  onSelectBank = (item, index) => {
    this.onChangeField('bankName', item?.bank);
  };

  handleViewImage = async (uri, type) => {
    if (!uri) {
      return;
    }

    let downloadedUrl = uri;

    this.setState({isLoadingDocument: true});

    if (type !== 'applicantPhoto') {
      const downloadUrlResponse = await getPresignedDownloadUrl({
        objectKey: uri,
      });

      downloadedUrl = downloadUrlResponse?.data?.url;
    }

    try {
      await viewDocumentHelper(
        downloadedUrl,
        imageUri => {
          navigate(ScreenNames.ImagePreviewScreen, {uri: imageUri});
        },
        error => {
          console.warn('Error opening file:', error);
          showToast('error', 'Could not open the document.', 'bottom', 3000);
        },
      );
    } finally {
      this.setState({isLoadingDocument: false});
    }
  };

  handleDeleteDocument = type => {
    this.setState({
      [type]: null,
    });
  };

  render() {
    const {
      gender,
      isOnboard,
      registrationNumber,
      errors,
      incomeSource,
      occupation,
      aadharNumber,
      showFilePicker,
      isEdit,
      bankName,
      isLoadingDocument,
      selectionType,
    } = this.state;

    const {selectedVehicle, isCreatingLoanApplication, loading} = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};

    return (
      <Customer_Personal_Details_Component
        isEdit={isEdit}
        headerProp={{
          title: `${isEdit ? 'Edit' : 'Add'} Customer Details`,
          subtitle: isCreatingLoanApplication
            ? formatVehicleNumber(UsedVehicle?.registerNumber)
            : '',
          showRightContent: true,
          // rightLabel: isOnboard ? '' : registrationNumber,
          rightLabelColor: '#F8A902',
          onBackPress: () => goBack(),
        }}
        state={this.state}
        onSelectedGender={this.onSelectedGender}
        selectedGender={gender}
        onChangePanCardNumber={value =>
          this.onChangeField('panCardNumber', value)
        }
        onChangeAadharNumber={value =>
          this.onChangeField('aadharNumber', value)
        }
        onChangeApplicantName={value =>
          this.onChangeField('applicantName', value)
        }
        onChangemobileNumber={value =>
          this.onChangeField('mobileNumber', value)
        }
        onChangeFatherMotherName={value =>
          this.onChangeField('fatherName', value)
        }
        onChangeSpouseName={value => this.onChangeField('spouseName', value)}
        onChangeEmail={value => this.onChangeField('email', value)}
        onChangeCurrentAddress={value => this.onChangeField('address', value)}
        onChangeCurrentPincode={value => this.onChangeField('pincode', value)}
        onSelectedLoanOption={this.onSelectedLoanOption}
        onSelectedOccupation={this.onSelectedOccupation}
        onSelectIncomeSourceOption={this.onSelectIncomeSourceOption}
        onChangeMonthlyIncome={value =>
          this.onChangeField('monthlyIncome', value)
        }
        onChangeAccountNumber={value =>
          this.onChangeField('accountNumber', value)
        }
        onChangeCurrentEMI={value =>
          this.onChangeField('currentEmi', value, !this.state.currentLoan)
        }
        onChangeMaxEMIAfford={value =>
          this.onChangeField('maxEmiAfford', value)
        }
        onChangeDob={value => this.onChangeField('dob', value)}
        onChangeMonthlyBankBalance={value =>
          this.onChangeField('avgMonthlyBankBalance', value)
        }
        onBankNameChange={value => this.onChangeField('bankName', value)}
        onNextPress={this.onNextPress}
        occupation={getLabelFromEnum(occupationLabelMap, occupation)}
        onSelectSuggestion={this.onSelectBank}
        searchBankNameFromAPI={this.searchBankNameFromAPI}
        restInputProps={{
          panCardNumber: {
            isError: errors?.panCardNumber,
            statusMsg: errors?.panCardNumber,
            autoCapitalize: 'characters',
          },
          aadharNumber: {
            value: aadharNumber,
            isError: errors?.aadharNumber,
            statusMsg: errors?.aadharNumber,
          },
          applicantName: {
            isError: errors?.applicantName,
            statusMsg: errors?.applicantName,
            autoCapitalize: 'words',
          },
          mobileNumber: {
            isError: errors?.mobileNumber,
            statusMsg: errors?.mobileNumber,
          },
          fatherName: {
            isError: errors?.fatherName,
            statusMsg: errors?.fatherName,
            autoCapitalize: 'words',
          },
          spouseName: {
            isError: errors?.spouseName,
            statusMsg: errors?.spouseName,
            autoCapitalize: 'words',
          },
          email: {
            isError: errors?.email,
            statusMsg: errors?.email,
          },
          address: {
            isError: errors?.address,
            statusMsg: errors?.address,
          },
          pincode: {
            isError: errors?.pincode,
            statusMsg: errors?.pincode,
          },
          occupation: {
            isError: errors?.occupation,
            statusMsg: errors?.occupation,
          },
          incomeSource: {
            isError: errors?.incomeSource,
            statusMsg: errors?.incomeSource,
            value: incomeSource,
          },
          accountNumber: {
            isError: errors?.accountNumber,
            statusMsg: errors?.accountNumber,
          },
          currentEmi: {
            isError: errors?.currentEmi,
            statusMsg: errors?.currentEmi,
          },
          maxEmiAfford: {
            isError: errors?.maxEmiAfford,
            statusMsg: errors?.maxEmiAfford,
          },
          monthlyIncome: {
            isError: errors?.monthlyIncome,
            statusMsg: errors?.monthlyIncome,
          },
          avgMonthlyBankBalance: {
            isError: errors?.avgMonthlyBankBalance,
            statusMsg: errors?.avgMonthlyBankBalance,
          },
          applicantPhoto: {
            isError: errors?.applicantPhoto,
            statusMsg: errors?.applicantPhoto,
          },
          pancardPhoto: {
            isError: errors?.pancardPhoto,
            statusMsg: errors?.pancardPhoto,
          },
          aadharFrontPhoto: {
            isError: errors?.aadharFrontPhoto,
            statusMsg: errors?.aadharFrontPhoto,
          },
          aadharBackphoto: {
            isError: errors?.aadharBackphoto,
            statusMsg: errors?.aadharBackphoto,
          },
          dob: {
            isError: errors?.dob,
            statusMsg: errors?.dob,
          },
          bankName: {
            value: bankName,
            isError: errors.bankName,
            statusMsg: errors.bankName,
          },
        }}
        filePickerProps={{
          isVisible: showFilePicker,
          autoCloseOnSelect: true,
          onSelect: this.handleFileUpload,
          onClose: this.closeFilePicker,
          restModalProp: {
            isCancellable: false,
          },
          options:
            selectionType === 'applicantPhoto'
              ? photoSourceOptions
              : uploadOptions,
        }}
        handleFilePicker={this.handleFilePicker}
        loading={loading}
        isLoadingDocument={isLoadingDocument}
        handleViewDocument={this.handleViewImage}
        handleDeleteDocument={this.handleDeleteDocument}
        isCreatingLoanApplication={isCreatingLoanApplication}
        dob={this.state.dob}
      />
    );
  }
}

const mapActionCreators = {
  submitCustomerDetailsThunk,
  updateCustomerDetailsThunk,
  searchBanksThunk,
  initiateLoanApplicationThunk,
};

const mapStateToProps = ({customerData, vehicleData, loanData}) => ({
  selectedCustomerId: customerData?.selectedCustomerId,
  selectedCustomer: customerData?.selectedCustomer,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  loading: customerData?.loading || loanData?.loading,
  vehicleId: vehicleData?.selectedVehicle?.id,
  loanType: loanData?.selectedLoanType,
  selectedApplicationId: loanData?.selectedApplicationId,
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(CustomerPersonalDetails);

// // Define this utility function either locally or extract to a utils/helper file
// const buildInputProps = (fields, errors = {}, extraProps = {}) => {
//   return fields.reduce((acc, field) => {
//     acc[field] = {
//       isError: errors?.[field],
//       statusMsg: errors?.[field],
//       ...(extraProps[field] || {}),
//     };
//     return acc;
//   }, {});
// };

// // Then use it where you're defining restInputProps
// const fields = [
//   'panCardNumber',
//   'aadharNumber',
//   'applicantName',
//   'mobileNumber',
//   'fatherName',
//   'spouseName',
//   'email',
//   'address',
//   'pincode',
//   'occupation',
//   'incomeSource',
//   'accountNumber',
//   'currentEmi',
//   'maxEmiAfford',
//   'monthlyIncome',
//   'avgMonthlyBankBalance',
//   'applicantPhoto',
//   'pancardPhoto',
//   'aadharFrontPhoto',
//   'aadharBackphoto',
// ];

// const extraProps = {
//   panCardNumber: { autoCapitalize: 'characters' },
//   aadharNumber: { value: aadharNumber },
//   incomeSource: { value: incomeSource },
// };

// const restInputProps = buildInputProps(fields, errors, extraProps);

{
  /* <YourComponent restInputProps={restInputProps} /> */
}
