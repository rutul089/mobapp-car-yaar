import {get} from 'lodash';
import React, {Component} from 'react';
import {Keyboard} from 'react-native';
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
  verifyAadharThunk,
  verifyPanThunk,
} from '../../redux/actions';
import {getPresignedDownloadUrl} from '../../services';
import {
  getDocumentLink,
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

const initialState = {
  applicantPhoto: '',
  pancardPhoto: '',
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
  bankName: '',
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
  bankNameValue: '',
};

// const initialState = {
//   applicantPhoto: '',
//   pancardPhoto: '',
//   panCardNumber: 'YKGWJ8413A',
//   aadharNumber: '958296232328',
//   applicantName: 'Raju Shah',
//   fatherName: 'Raja Shah',
//   spouseName: 'Kavisha Brooks',
//   email: 'ashk@cardenas.org',
//   dob: '',
//   address: '9957 Lucero Path Suite 683, Humphreymouth, NE 02200',
//   pincode: '380015',
//   monthlyIncome: '910454',
//   bankName: 'State Bank of India',
//   accountNumber: '',
//   currentEmi: '',
//   maxEmiAfford: '',
//   avgMonthlyBankBalance: '',
//   gender: genderType.MALE,
//   currentLoan: currentLoanOptions.YES,
//   aadharFrontPhoto: '',
//   aadharBackphoto: '',
//   currentState: '',
//   occupation: null,
//   incomeSource: null,
// };

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
        bankNameValue: '',
      },
      isFormValid: false,
      showFilePicker: false,
      selectionType: '',
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      isLoadingDocument: false,
      panCardVerification: false,
      aadharVerification: false,
      aadharBackphotoLink: null,
      aadharFrontPhotoLink: null,
      pancardPhotoLink: null,
    };
    this.onSelectedLoanOption = this.onSelectedLoanOption.bind(this);
    this.onSelectedOccupation = this.onSelectedOccupation.bind(this);
    this.onSelectIncomeSourceOption =
      this.onSelectIncomeSourceOption.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  async componentDidMount() {
    const {isEdit} = this.state;
    const {selectedCustomer} = this.props;
    if (!isEdit) {
      return;
    }

    const detail = selectedCustomer?.details || {};
    const mappedFields = {
      panCardNumber: detail?.panCardNumber,
      aadharNumber: detail?.aadharNumber,
      applicantName: detail?.applicantName,
      gender: detail?.gender ?? genderType.MALE,
      fatherName: detail?.fatherName,
      spouseName: detail?.spouseName,
      email: detail?.email,
      dob: formatDate(detail?.dob, 'DD/MM/YYYY'),
      address: detail?.address,
      pincode: detail?.pincode,
      monthlyIncome: get(detail, 'monthlyIncome', '').toString(),
      bankName: detail?.bankName,
      bankNameValue: detail?.bankName,
      accountNumber: detail?.accountNumber,
      currentLoan: detail?.currentLoan ?? currentLoanOptions.YES,
      currentEmi: get(detail, 'currentEmi', '').toString(),
      maxEmiAfford: get(detail, 'maxEmiAfford', '').toString(),
      avgMonthlyBankBalance: get(
        detail,
        'avgMonthlyBankBalance',
        '',
      ).toString(),
      occupation: detail?.occupation,
      incomeSource: detail?.incomeSource,
      aadharBackphoto: detail?.aadharBackphoto,
      aadharFrontPhoto: detail?.aadharFrontPhoto,
      pancardPhoto: detail?.pancardPhoto,
      applicantPhoto: detail?.applicantPhoto,
      panCardVerification: detail?.panCardVerification,
      aadharVerification: detail?.aadharVerification,
      mobileNumber: detail?.mobileNumber || selectedCustomer?.mobileNumber,
    };

    const [back, front, pancard] = await Promise.all([
      getDocumentLink(detail?.aadharBackphoto),
      getDocumentLink(detail?.aadharFrontPhoto),
      getDocumentLink(detail?.pancardPhoto),
    ]);

    this.setState({
      ...mappedFields,
      aadharBackphotoLink: back,
      aadharFrontPhotoLink: front,
      pancardPhotoLink: pancard,
    });
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
      if (isEdit && !isCreatingLoanApplication) {
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
      spouseName: {required: false},
      aadharBackphoto: {required: false},
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
      'bankNameValue',
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
    handleFieldChange(this, key, value, value?.toString()?.trim().length === 0);
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
          await this.updateDocumentState('applicantPhoto', url);
        } else {
          const uploadedKey = await uploadDocumentViaPresignedUrl(
            asset,
            selectionType,
          );
          await this.updateDocumentState(selectionType, uploadedKey);
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
    this.onChangeField('bankNameValue', '');
    let searchResult = [];
    await this.props.searchBanksThunk(
      query,
      onSuccess => {
        searchResult = onSuccess;
        if (Array.isArray(searchResult) && searchResult.length === 0) {
          this.onChangeField('bankNameValue', '');
        }
      },
      error => {
        return [];
      },
    );
    return searchResult;
  };

  onSelectBank = (item, index) => {
    this.onChangeField('bankName', item?.bank);
    this.onChangeField('bankNameValue', item?.bank);
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
          showToast('error', 'Could not open the document.', 'bottom', 3000);
        },
      );
    } finally {
      this.setState({isLoadingDocument: false});
    }
  };

  handleDeleteDocument = type => {
    this.updateDocumentState(type, null, false);
  };

  verifyPanCard = () => {
    const {selectedCustomerId} = this.props;
    const {panCardNumber, errors} = this.state;

    Keyboard.dismiss();

    if (!panCardNumber || errors.panCardNumber) {
      return showToast(
        'error',
        errors.panCardNumber || 'Please enter pan number',
      );
    }

    let payload = {
      customerId: selectedCustomerId,
      panCardNumber,
    };
    this.props.verifyPanThunk(payload, response => {
      console.log('verifyPanThunk----->', JSON.stringify(response));
      if (response?.success) {
        this.setState({
          panCardVerification: response?.data?.verified,
        });
      }
    });
  };

  verifyAadharCard = () => {
    const {selectedCustomerId} = this.props;
    const {aadharNumber, errors} = this.state;

    Keyboard.dismiss();

    if (!aadharNumber || errors.aadharNumber) {
      return showToast(
        'error',
        errors.aadharNumber || 'Please enter aadhar number',
      );
    }

    let payload = {
      customerId: selectedCustomerId,
      aadharNumber,
    };
    this.props.verifyAadharThunk(payload, response => {
      if (response?.success && response?.data) {
        this.setState({
          aadharVerification: response?.data?.verified,
        });
      }
    });
  };

  updateDocumentState = async (type, uri, isCheck) => {
    if (!type) {
      return;
    }

    let link = null;
    if (uri) {
      link = await getDocumentLink(uri);
    }

    this.setState(
      {
        [type]: uri,
        [`${type}Link`]: link,
      },
      () => {
        if (!isCheck) {
          return;
        }
        this.onChangeField(type, uri);
      },
    );
  };

  render() {
    const {
      gender,
      errors,
      incomeSource,
      occupation,
      aadharNumber,
      showFilePicker,
      isEdit,
      bankName,
      isLoadingDocument,
      selectionType,
      panCardVerification,
      aadharVerification,
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
        onChangeSpouseName={value =>
          this.onChangeField('spouseName', value, true)
        }
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
            isDisabled: panCardVerification,
            rightLabel: panCardVerification ? '' : 'VERIFY',
            rightLabelPress: this.verifyPanCard,
            isRightIconVisible: panCardVerification,
          },
          aadharNumber: {
            value: aadharNumber,
            isError: errors?.aadharNumber,
            statusMsg: errors?.aadharNumber,
            isDisabled: aadharVerification,
            rightLabel: aadharVerification ? '' : 'VERIFY',
            rightLabelPress: this.verifyAadharCard,
            isRightIconVisible: aadharVerification,
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
            isError: errors.bankName || errors.bankNameValue,
            statusMsg: errors.bankName || errors.bankNameValue,
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
  verifyAadharThunk,
  verifyPanThunk,
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
