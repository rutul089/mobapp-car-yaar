import React, {Component} from 'react';
import Vehicle_Pricing_Component from './Vehicle_Pricing_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {connect} from 'react-redux';
import {loanType} from '../../constants/enums';
import {get} from 'lodash';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {showToast} from '../../utils/helper';
import {updateVehicleByIdThunk} from '../../redux/actions';
import {handleFileSelection} from '../../utils/documentUtils';

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
    this.setState({
      estimatedPrice: estimatedPrice != null ? `${estimatedPrice}` : '' + '',
      salePrice: salePrice != null ? `${salePrice}` : '' + '',
      trueValuePrice: trueValuePrice != null ? `${trueValuePrice}` : '' + '',
      additionalNotes,
    });
  }

  validateAllFields = () => {
    const fieldsToValidate = ['estimatedPrice', 'salePrice', 'trueValuePrice'];

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

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  onBackPress = () => {
    goBack();
  };

  onNextPress = () => {
    const {estimatedPrice, salePrice, trueValuePrice, additionalNotes} =
      this.state;
    const {selectedVehicle, selectedLoanType} = this.props;

    console.log({selectedLoanType});

    const isFormValid = this.validateAllFields();
    let vehicleId = selectedVehicle?.UsedVehicle?.id;

    if (!isFormValid) {
      return showToast('error', 'Please enter all field');
    }

    let payload = {
      estimatedPrice: Number(estimatedPrice),
      salePrice: Number(salePrice),
      trueValuePrice: Number(trueValuePrice),
      additionalNotes,
    };
    this.props.updateVehicleByIdThunk(vehicleId, payload, () => {
      if (selectedLoanType === loanType.refinance) {
        return navigate(ScreenNames.VehicleHypothecation);
      } else if (selectedLoanType === loanType.addVehicle) {
        return navigate(ScreenNames.VehicleHypothecation);
        navigate(ScreenNames.SuccessScreen);
      } else {
        navigate(ScreenNames.CustomerDetail);
      }
    });
  };

  handleFile = type => {
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      const docObj = {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
        isLocal: true,
        fileSize: asset.fileSize,
        uploadedUrl:
          'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf', // mock
      };

      this.setState({
        valueReportUrl: docObj.uri,
        showFilePicker: false,
      });

      // TODO : Upload API call here to get the link
    });
  };

  closeFilePicker = () => {
    this.setState({
      showFilePicker: false,
    });
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
