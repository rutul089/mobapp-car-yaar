import React, {Component} from 'react';
import Vehicle_Detail_Component from './Vehicle_Detail_Component';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {connect} from 'react-redux';
import {fetchVehicleFromIdThunk} from '../../redux/actions';
import {get} from 'lodash';
import {formatDate, formatVehicleDetails} from '../../utils/helper';

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
    this.onSaveDraftPress = this.onSaveDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    const {vehicleId} = this.state;
    if (vehicleId) {
      this.fetchVehicleFromId(vehicleId);
    }
  }

  fetchVehicleFromId = id => {
    this.props.fetchVehicleFromIdThunk(id);
  };

  safeGet = (obj, path) => {
    return this.props.loading ? '-' : get(obj, path, '-');
  };

  onBackPress = () => {
    goBack();
  };

  onSaveDraftPress = () => {};

  onNextPress = () => {
    navigate(ScreenNames.VehicleImages);
  };

  handleInfoChange = (index, text) => {
    const updatedInfo = [...this.state.vehicleInfo];
    updatedInfo[index].value = text;
    this.setState({vehicleInfo: updatedInfo});
  };

  render() {
    const {loading, selectedVehicle} = this.props;
    const {basicDetail} = this.state;
    let {UsedVehicle} = selectedVehicle || {};
    let manufactureYear = UsedVehicle?.manufactureYear;
    let {model, trim, colour} = basicDetail || {};
    const status = basicDetail?.isDraft ? 'DRAFT' : 'SAVED';
    const lastUpdatedOn = this.safeGet(basicDetail, 'updatedAt');

    return (
      <Vehicle_Detail_Component
        onBackPress={this.onBackPress}
        onSaveDraftPress={this.onSaveDraftPress}
        onNextPress={this.onNextPress}
        registerNumber={this.safeGet(UsedVehicle, 'registerNumber')}
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
            value: this.safeGet(UsedVehicle, 'hypothecationStatus') + '',
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
            value: this.safeGet(UsedVehicle, 'PUCC') + '',
          },
          {
            label: 'Ownership',
            value: this.safeGet(UsedVehicle, 'ownershipCount'),
          },
        ]}
        onInfoChange={this.handleInfoChange}
        status={status}
        loading={loading}
      />
    );
  }
}

const mapDispatchToProps = {fetchVehicleFromIdThunk};
const mapStateToProps = ({vehicleData}) => {
  return {
    selectedVehicle: vehicleData?.selectedVehicle,
    loading: vehicleData?.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
