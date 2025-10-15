import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {
  checkVehicleExistsThunk,
  getVehicleByRegisterNumberThunk,
  resetSelectedVehicle,
} from '../../redux/actions';
import {isValidIndianVehicleNumber} from '../../utils/validation';
import Search_Component from './Search_Component';
import ScreenNames from '../../constants/ScreenNames';
import {Alert} from 'react-native';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddVehicle: false,
      vehicleNumber: '',
      showError: false,
      statusMsg: '',
      showStatusIcon: false,
      vehicleExists: true,
      isLoading: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onAddVehicle = this.onAddVehicle.bind(this);
    this.onSearchVehicle = this.onSearchVehicle.bind(this);
    this.onVehicleNumberChange = this.onVehicleNumberChange.bind(this);
  }

  componentDidMount() {
    this.props.resetSelectedVehicle();
  }

  onBackPress = () => {
    goBack();
  };

  onAddVehicle = () => {
    alert('TODO//Need add new vehicle flow');
  };

  onSearchVehicle = () => {
    this.setState({isLoading: true});
    const {vehicleNumber} = this.state;
    const isValid = isValidIndianVehicleNumber(vehicleNumber);
    if (!isValid) {
      this.setState({
        showError: true,
        statusMsg: 'Please add valid vehicle number',
      });
      return;
    }
    this.props.getVehicleByRegisterNumberThunk(
      vehicleNumber,
      _response => {
        this.setState({isLoading: false, vehicleExists: true}, () => {
          navigate(ScreenNames.VehicleDetail, {
            addNewVehicle: true,
            UsedVehicle: {
              vehicleId: _response?.data?.vehicleId,
            },
            vehicleId: _response?.data?.vehicleId,
          });
        });
      },
      () => {
        this.setState({
          statusMsg: 'Oh no! Vehicle not found',
          vehicleExists: false,
          isLoading: false,
        });
      },
    );
    return;
    // this.props.checkVehicleExistsThunk(vehicleNumber, response => {
    //   if (!response?.data) {
    //     return this.props.getVehicleByRegisterNumberThunk(
    //       vehicleNumber,
    //       _response => {
    //         navigate(ScreenNames.VehicleDetail, {
    //           addNewVehicle: true,
    //           UsedVehicle: {
    //             vehicleId: _response?.data?.vehicleId,
    //           },
    //           vehicleId: _response?.data?.vehicleId,
    //         });
    //       },
    //       () => {},
    //     );
    //   }

    //   this.setState({
    //     statusMsg: 'Oh no! Vehicle not found',
    //     vehicleExists: response?.data,
    //   });
    // });
  };

  onVehicleNumberChange = value => {
    this.setState({
      vehicleNumber: value.toUpperCase(),
      showError: false,
      showStatusIcon: false,
      showAddVehicle: false,
      statusMsg: '',
      vehicleExists: true,
    });
  };

  render() {
    const {vehicleNumber, statusMsg, showStatusIcon, vehicleExists, isLoading} =
      this.state;
    const {loading} = this.props;
    return (
      <>
        <Search_Component
          onBackPress={this.onBackPress}
          onAddVehicle={this.onAddVehicle}
          onSearchVehicle={this.onSearchVehicle}
          showAddVehicle={vehicleExists}
          onVehicleNumberChange={this.onVehicleNumberChange}
          vehicleNumber={vehicleNumber}
          statusMsg={statusMsg}
          showStatusIcon={showStatusIcon}
          loading={isLoading}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  checkVehicleExistsThunk,
  resetSelectedVehicle,
  getVehicleByRegisterNumberThunk,
};
const mapStateToProps = ({vehicleData}) => {
  return {
    vehicleExists: vehicleData?.vehicleExists,
    loading: vehicleData?.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
