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
  initiateAadharDigilockerThunk,
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
import {getNameMatchPercentage} from '../../utils/getNameMatchPercentage';
import {
  convertToISODate,
  formatDate,
  formatVehicleNumber,
  generateMaskedAadhaar,
  generateRandomPAN,
  photoSourceOptions,
  showApiErrorToast,
  showToast,
  uploadOptions,
} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Customer_Personal_Details_Component from './Customer_Personal_Details_Component';
import strings from '../../locales/strings';

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
//   panCardNumber: 'DBBPM9649L',
//   aadharNumber: '958296232328',
//   applicantName: 'Raju Shah',
//   fatherName: 'Raja Shah',
//   spouseName: 'Kavisha Brooks',
//   email: 'ashk@cardenas.org',
//   dob: '07/06/1995',
//   address: '9957 Lucero Path Suite 683, Humphreymouth, NE 02200',
//   pincode: '380015',
//   monthlyIncome: '910454',
//   bankName: 'State Bank of India',
//   accountNumber: '123123124123',
//   currentEmi: '',
//   maxEmiAfford: '5000',
//   avgMonthlyBankBalance: '25000',
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
      nameOnPanCard: '',
      nameOnAadharCard: '',
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
    const {selectedCustomer, route} = this.props;

    if (!isEdit) {
      this.setState({
        mobileNumber: route?.params?.mobileNumber || '',
      });
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
      monthlyIncome: get(detail, 'monthlyIncome', '')?.toString(),
      bankName: detail?.bankName,
      bankNameValue: detail?.bankName,
      accountNumber: detail?.accountNumber,
      currentLoan: detail?.currentLoan ?? currentLoanOptions.YES,
      currentEmi: get(detail, 'currentEmi', '')?.toString(),
      maxEmiAfford: get(detail, 'maxEmiAfford', '')?.toString(),
      avgMonthlyBankBalance: get(
        detail,
        'avgMonthlyBankBalance',
        '',
      )?.toString(),
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

  onNextPress = async () => {
    const {isEdit} = this.state;
    const {isCreatingLoanApplication} = this.props;

    // 1️⃣ Validate the form
    const isFormValid = this.validateAllFields();
    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    // 2️⃣ Verify PAN & Aadhaar
    const isVerified = await this.handleVerifyDocuments();

    if (!isVerified && !isEdit) {
      return; // toast already shown in handleVerifyDocuments
    }

    // 3️⃣ Prepare payload
    const payload = this.getPayload();

    // 4️⃣ Success & Error callbacks
    const onSuccess = response => {
      if (isEdit && !isCreatingLoanApplication) {
        if (response?.success) {
          showToast('success', 'Customer detail updated successfully');
        }
        return;
      }

      if (isCreatingLoanApplication) {
        this.createLoanApplication();
        return;
      }

      navigateToTab(ScreenNames.Customer);
    };

    const onError = error => showApiErrorToast(error);

    // 5️⃣ Dispatch appropriate thunk
    this.props.updateCustomerDetailsThunk(payload, onSuccess, onError);
  };

  handleVerifyDocuments = async () => {
    const {
      nameOnPanCard,
      nameOnAadharCard,
      isEdit,
      aadharVerification,
      panCardVerification,
    } = this.state;

    if (isEdit) {
      return true;
    }

    if (!nameOnPanCard && !panCardVerification) {
      return showToast('warning', 'Please verify your Pancard...');
    }

    if (!nameOnAadharCard && !aadharVerification) {
      return showToast('warning', 'Please fetch your Aadhar card...');
    }

    if (getNameMatchPercentage(nameOnAadharCard, nameOnPanCard) <= 70) {
      return showToast(
        'error',
        'The name on Aadhaar and PAN do not match closely enough. Please check your numbers.',
      );
    }
    return true;
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
      aadharNumber: {required: false},
      panCardNumber: {required: false},
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
      return showToast('error', strings.errorNoDocumentUpload);
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

    // 1️⃣ Validate PAN input
    if (!panCardNumber || errors.panCardNumber) {
      return showToast(
        'error',
        errors.panCardNumber || 'Please enter PAN number',
      );
    }

    // 2️⃣ Prepare payload
    const payload = {
      customerId: selectedCustomerId,
      panCardNumber,
    };

    // 3️⃣ Call verification thunk
    this.props.verifyPanThunk(payload, response => {
      const verifiedData = response?.data?.verified?.data;
      const isVerified =
        response?.success === true &&
        response?.data?.verified?.success === true &&
        verifiedData?.pan_number &&
        verifiedData?.full_name;

      if (!isVerified) {
        return showToast('error', 'PAN verification failed. Please try again.');
      }

      this.setState({
        panCardNumber: __DEV__ ? generateRandomPAN() : verifiedData.pan_number,
        nameOnPanCard: verifiedData.full_name,
        panCardVerification: true,
      });
    });
  };

  verifyAadharCard = () => {
    const {selectedCustomerId} = this.props;

    Keyboard.dismiss();

    const payload = {customerId: selectedCustomerId};

    this.props.initiateAadharDigilockerThunk(payload, response => {
      const digilockerUrl = response?.data?.url;

      if (!response?.success || !digilockerUrl) {
        return showToast(
          'error',
          'Aadhaar verification initiation failed.Please try after sometime.',
        );
      }

      // Redirect to DigiLocker Aadhaar screen
      navigate(ScreenNames.RedirectingScreen, {
        params: response.data,
        onGoBack: this.handleAadhaarResponse,
      });
    });
  };

  handleAadhaarResponse = aadhaarData => {
    if (!aadhaarData?.success) {
      return showToast('error', 'Please verify your Aadhaar card');
    }

    const aadhaarInfo = aadhaarData.data?.aadhaar_xml_data;
    const formattedDob = aadhaarInfo?.dob?.split('-').reverse().join('/');

    this.setState(
      {
        aadharNumber: __DEV__
          ? generateMaskedAadhaar()
          : aadhaarInfo?.masked_aadhaar,
        applicantName: aadhaarInfo?.full_name,
        nameOnAadharCard: aadhaarInfo?.full_name,
        dob: formattedDob,
      },
      () => {
        this.callVerifyAadharCard();
        this.onChangeField('aadharNumber', this.state.aadharNumber);
      },
    );
  };

  // verifyAadharCard = () => {
  //   const {selectedCustomerId} = this.props;

  //   Keyboard.dismiss();

  //   let payload = {
  //     customerId: selectedCustomerId,
  //   };

  //   this.props.initiateAadharDigilockerThunk(payload, response => {
  //     if (response?.success && response?.data && response?.data?.url) {
  //       //DigiLockerAadhaarScreen RedirectingScreen
  //       navigate(ScreenNames.RedirectingScreen, {
  //         params: response?.data,
  //         onGoBack: aadhaarData => {
  //           if (aadhaarData?.success) {
  //             const formattedDob = aadhaarData?.data?.aadhaar_xml_data?.dob
  //               ?.split('-')
  //               .reverse()
  //               .join('/');

  //             this.setState(
  //               {
  //                 aadharNumber: __DEV__
  //                   ? generateMaskedAadhaar()
  //                   : aadhaarData?.data?.aadhaar_xml_data?.masked_aadhaar,
  //                 applicantName: aadhaarData?.data?.aadhaar_xml_data?.full_name,
  //                 nameOnAadharCard:
  //                   aadhaarData?.data?.aadhaar_xml_data?.full_name,
  //                 dob: formattedDob,
  //               },
  //               () => {
  //                 this.callVerifyAadharCard();
  //                 this.onChangeField('aadharNumber', this.state.aadharNumber);
  //               },
  //             );
  //           } else {
  //             showToast('error', 'Please verify your aadhar card');
  //           }
  //         },
  //       });
  //     }
  //   });
  // };

  callVerifyAadharCard = () => {
    const {selectedCustomerId} = this.props;
    const {aadharNumber, errors} = this.state;

    let payload = {
      customerId: selectedCustomerId,
      aadharNumber,
    };

    Keyboard.dismiss();

    if (!aadharNumber || errors.aadharNumber) {
      return showToast(
        'error',
        errors.aadharNumber ||
          'Please enter a valid 12-digit or Verify your aadhar',
      );
    }

    this.props.verifyAadharThunk(payload, response => {
      if (response?.success) {
        this.setState({
          aadharVerification: true,
        });
        if (this.state.isEdit) {
          this.onNextPress();
        }
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
            isDisabled: panCardVerification && isEdit,
            rightLabel: panCardVerification && isEdit ? '' : 'VERIFY',
            rightLabelPress: this.verifyPanCard,
            isRightIconVisible: panCardVerification,
          },
          aadharNumber: {
            value: aadharNumber,
            isError: errors?.aadharNumber,
            statusMsg: errors?.aadharNumber,
            // isDisabled: aadharVerification && isEdit,
            isDisabled: true,
            rightLabel: aadharVerification && isEdit ? '' : 'FETCH',
            rightLabelPress: this.verifyAadharCard,
            isRightIconVisible: aadharVerification,
          },
          applicantName: {
            isError: errors?.applicantName,
            statusMsg: errors?.applicantName,
            autoCapitalize: 'words',
            isDisabled: aadharVerification && isEdit,
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
            isDisabled: aadharVerification && isEdit,
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
  initiateAadharDigilockerThunk,
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
