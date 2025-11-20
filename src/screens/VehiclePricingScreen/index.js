import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loanType} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {updateVehicleByIdThunk} from '../../redux/actions';
import {
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {uploadApplicantPhoto} from '../../utils/fileUploadUtils';
import {showApiErrorToast, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Vehicle_Pricing_Component from './Vehicle_Pricing_Component';
import strings from '../../locales/strings';

class VehiclePricingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimatedPrice: '',
      salePrice: '',
      trueValuePrice: '',
      additionalNotes: '',
      valueReportUrl: '',
      errors: {
        estimatedPrice: '',
        salePrice: '',
        trueValuePrice: '',
      },
      isFormValid: false,
      showFilePicker: false,
      isLoading: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    const {selectedVehicle} = this.props;
    const estimatedPrice = get(selectedVehicle, 'UsedVehicle.estimatedPrice');
    const salePrice = get(selectedVehicle, 'UsedVehicle.salePrice');
    const trueValuePrice = get(selectedVehicle, 'UsedVehicle.trueValuePrice');
    const additionalNotes = get(selectedVehicle, 'UsedVehicle.additionalNotes');
    const valueReportUrl = get(selectedVehicle, 'UsedVehicle.valueReportUrl');

    this.setState({
      estimatedPrice: estimatedPrice != null ? `${estimatedPrice}` : '' + '',
      salePrice: salePrice != null ? `${salePrice}` : '' + '',
      trueValuePrice: trueValuePrice != null ? `${trueValuePrice}` : '' + '',
      additionalNotes,
      valueReportUrl,
    });
  }

  validateAllFields = () => {
    const {trueValuePrice} = this.state;

    const fieldValidationRules = {
      trueValuePrice: {required: trueValuePrice?.toString()?.trim().length > 0},
    };
    const fieldsToValidate = ['estimatedPrice', 'salePrice', 'trueValuePrice'];

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

  onBackPress = () => {
    goBack();
  };

  onNextPress = () => {
    const {
      estimatedPrice,
      salePrice,
      trueValuePrice,
      additionalNotes,
      valueReportUrl,
    } = this.state;
    const {selectedVehicle, selectedLoanType} = this.props;

    const isFormValid = this.validateAllFields();
    let vehicleId = selectedVehicle?.UsedVehicle?.id;

    if (!isFormValid) {
      return showToast('error', strings.errorMissingField);
    }

    let payload = {
      estimatedPrice: Number(estimatedPrice),
      salePrice: Number(salePrice),
      trueValuePrice: trueValuePrice ? Number(trueValuePrice) : '',
      additionalNotes,
      valueReportUrl,
    };
    this.props.updateVehicleByIdThunk(vehicleId, payload, () => {
      if (selectedLoanType === loanType.refinance) {
        return navigate(ScreenNames.VehicleHypothecation);
      } else if (selectedLoanType === loanType.addVehicle) {
        return navigate(ScreenNames.VehicleHypothecation);
      } else {
        navigate(ScreenNames.VehicleHypothecation);
      }
    });
  };

  handleFile = type => {
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      this.setState({
        showFilePicker: false,
      });

      await new Promise(resolve => setTimeout(resolve, 200));
      this.setState({isLoading: true});

      try {
        const url = await uploadApplicantPhoto(
          asset,
          asset.fileName || asset.name || '',
          asset.type,
        );

        this.setState(prev => ({
          valueReportUrl: url,
          showFilePicker: false,
        }));
      } catch (error) {
        showApiErrorToast(error);
      } finally {
        this.setState({
          isLoading: false,
          selectedDocType: '',
          showFilePicker: false,
        });
      }
    });
  };

  closeFilePicker = () => {
    this.setState({
      showFilePicker: false,
    });
  };

  onDeletePress = () => {
    this.setState({valueReportUrl: ''});
  };

  handleViewImage = async () => {
    const {valueReportUrl} = this.state;
    if (!valueReportUrl) {
      return showToast('error', strings.errorNoDocumentUpload);
    }

    setTimeout(async () => {
      this.setState({isLoadingDocument: true});
      try {
        await viewDocumentHelper(
          valueReportUrl,
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
    }, 50);
  };

  render() {
    const {
      estimatedPrice,
      salePrice,
      trueValuePrice,
      additionalNotes,
      errors,
      showFilePicker,
      valueReportUrl,
      isLoading,
    } = this.state;
    const {loading} = this.props;
    return (
      <>
        <Vehicle_Pricing_Component
          state={{
            estimatedPrice,
            salePrice,
            trueValuePrice,
            additionalNotes,
            valueReportUrl,
          }}
          onBackPress={this.onBackPress}
          onNextPress={this.onNextPress}
          estimatedPrice={estimatedPrice}
          salePrice={salePrice}
          trueValuePrice={trueValuePrice}
          additionalNotes={additionalNotes}
          onChangeEstimatedPrice={value =>
            this.onChangeField('estimatedPrice', value)
          }
          onChangeSalePrice={value => this.onChangeField('salePrice', value)}
          onChangeTrueValuePrice={value =>
            this.onChangeField('trueValuePrice', value)
          }
          onChangeAdditionalNotes={value =>
            this.onChangeField('additionalNotes', value)
          }
          restInputProps={{
            estimatedPrice: {
              isError: errors?.estimatedPrice,
              statusMsg: errors?.estimatedPrice,
              autoCapitalize: 'words',
            },
            salePrice: {
              isError: errors?.salePrice,
              statusMsg: errors?.salePrice,
            },
            trueValuePrice: {
              isError: errors?.trueValuePrice,
              statusMsg: errors?.trueValuePrice,
            },
          }}
          fileModalProps={{
            showFilePicker: showFilePicker,
            handleFile: this.handleFile,
            closeFilePicker: this.closeFilePicker,
          }}
          loading={loading}
          handleOdometerImageSelect={() =>
            this.setState({showFilePicker: true})
          }
          onDeletePress={this.onDeletePress}
          viewImage={this.handleViewImage}
          isLoading={isLoading}
        />
      </>
    );
  }
}

const mapActionCreators = {updateVehicleByIdThunk};
const mapStateToProps = ({loanData, vehicleData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    selectedVehicle: vehicleData?.selectedVehicle,
    loading: vehicleData?.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(VehiclePricingScreen);
