import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {fetchVehicleFromIdThunk} from '../../redux/actions';
import {
  formatDate,
  formatVehicleDetails,
  formatVehicleNumber,
} from '../../utils/helper';
import Vehicle_Detail_Component from './Vehicle_Detail_Component';
import {currentLoanLabelMap, getLabelFromEnum} from '../../constants/enums';

class VehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId:
        getScreenParam(this.props.route, 'params')?.UsedVehicle?.vehicleId ||
        '',
      vehicleInfo: [],
      basicDetail: getScreenParam(this.props.route, 'params') || '',
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onPressSecondaryButton = this.onPressSecondaryButton.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {vehicleId} = this.state;
    if (vehicleId) {
      this.fetchVehicleFromId(vehicleId);
    }
    this.focusListener = navigation.addListener('focus', () => {
      // const {vehicleId} = this.state;
      // if (vehicleId) {
      //   this.fetchVehicleFromId(vehicleId);
      // }
    });
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
    }
  }
  fetchVehicleFromId = id => {
    this.props.fetchVehicleFromIdThunk(id, response => {
      this.setState({
        basicDetail: {
          make: response?.make,
          model: response?.model,
          trim: response?.trim,
          colour: response?.colour,
        },
      });
    });
  };

  safeGet = (obj, path) => {
    return this.props.loading ? '-' : get(obj, path, '-');
  };

  onBackPress = () => {
    goBack();
  };

  onPressSecondaryButton = () => {
    navigate(ScreenNames.VehicleImages);
  };

  onNextPress = () => {
    const {isCreatingLoanApplication, selectedLoanType} = this.props;
    let screenName = '';
    if (isCreatingLoanApplication) {
      screenName = ScreenNames.VehicleHypothecation;
    } else if (isCreatingLoanApplication) {
      screenName = ScreenNames.CustomerFullScreen;
    } else {
      screenName = ScreenNames.CustomerFullScreen;
    }
    navigate(
      isCreatingLoanApplication
        ? ScreenNames.CustomerFullScreen
        : ScreenNames.VehicleImages,
    );
  };

  handleInfoChange = (index, text) => {
    const updatedInfo = [...this.state.vehicleInfo];
    updatedInfo[index].value = text;
    this.setState({vehicleInfo: updatedInfo});
  };

  render() {
    const {loading, selectedVehicle, isCreatingLoanApplication} = this.props;
    const {basicDetail} = this.state;
    let {UsedVehicle} = selectedVehicle || {};
    let manufactureYear = UsedVehicle?.manufactureYear;
    let {model, trim, colour} = basicDetail || {};
    const status = selectedVehicle?.isDraft ? 'DRAFT' : 'SAVED';
    const lastUpdatedOn = this.safeGet(basicDetail, 'updatedAt');
    const _registerNumber = this.safeGet(UsedVehicle, 'registerNumber') ?? '-';
    const puc = this.safeGet(UsedVehicle, 'PUCC');
    const hypothecationStatus = this.safeGet(
      UsedVehicle,
      'hypothecationStatus',
    );

    return (
      <Vehicle_Detail_Component
        onBackPress={this.onBackPress}
        onPressSecondaryButton={this.onPressSecondaryButton}
        onNextPress={this.onNextPress}
        registerNumber={formatVehicleNumber(_registerNumber)}
        make={this.safeGet(basicDetail, 'make')}
        lastUpdatedOn={formatDate(lastUpdatedOn, 'DD MMM YYYY, hh:mm A')}
        vehicleDetail={formatVehicleDetails({
          model,
          trim,
          colour,
          manufactureYear,
        })}
        vehicleInfo={[
          {
            label: 'Owner Name',
            value: this.safeGet(UsedVehicle, 'ownerName'),
          },
          {
            label: 'Manufacture Year',
            value: this.safeGet(UsedVehicle, 'manufactureYear'),
          },
          {
            label: 'Chassis Number',
            value: this.safeGet(UsedVehicle, 'chassisNumber'),
          },
          {
            label: 'Engine Number',
            value: this.safeGet(UsedVehicle, 'engineNumber'),
          },
          {
            label: 'Registration Date',
            value: formatDate(UsedVehicle?.registrationDate),
          },
          {
            label: 'Registration Authority',
            value: this.safeGet(UsedVehicle, 'registrationAuthority'),
          },
          {
            label: 'Fuel Type',
            value: this.safeGet(selectedVehicle, 'fuelType'),
          },
          {
            label: 'Emission Norm',
            value: this.safeGet(UsedVehicle, 'emissionNorm'),
          },
          {
            label: 'Vehicle Age',
            value: this.safeGet(UsedVehicle, 'vehicleAge'),
          },
          {
            label: 'Hypothecation Status',
            value:
              getLabelFromEnum(currentLoanLabelMap, hypothecationStatus) || '-',
          },
          {
            label: 'Vehicle Status',
            value: this.safeGet(UsedVehicle, 'vehicleStatus'),
          },
          {
            label: 'Insurance Valid Upto',
            value: formatDate(UsedVehicle?.insuranceValidUpto),
          },
          {
            label: 'Fitness Valid Upto',
            value: formatDate(UsedVehicle?.fitnessValidUpto),
          },
          {
            label: 'PUC',
            value: getLabelFromEnum(currentLoanLabelMap, puc) || '-',
          },
          {
            label: 'Ownership',
            value: this.safeGet(UsedVehicle, 'ownershipCount'),
          },
        ]}
        onInfoChange={this.handleInfoChange}
        status={status}
        loading={loading}
        isCreatingLoanApplication={isCreatingLoanApplication}
        carImage={UsedVehicle?.images?.[0]?.frontView?.[0]}
      />
    );
  }
}

const mapDispatchToProps = {fetchVehicleFromIdThunk};
const mapStateToProps = ({vehicleData, loanData}) => {
  return {
    selectedVehicle: vehicleData?.selectedVehicle,
    loading: vehicleData?.loading,
    isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
    selectedLoanType: loanData.selectedLoanType,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
