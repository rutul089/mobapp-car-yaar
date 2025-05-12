import React, {Component} from 'react';
import Vehicles_Component from './Vehicles_Component';
import {formatIndianNumber} from '../../utils/helper';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {connect} from 'react-redux';
import {fetchVehiclesThunk} from '../../redux/actions/vehicleActions';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      apiTrigger: 'default',
    };
    this.onWrapperClick = this.onWrapperClick.bind(this);
  }

  componentDidMount() {
    this.fetchVehicles();
  }

  fetchVehicles = (page = 1) => {
    this.props.fetchVehiclesThunk(page).finally(() => {
      this.setState({refreshing: false, apiTrigger: 'default'});
    });
  };

  handleLoadMore = () => {
    const {pagination} = this.props;
    const currentPage = pagination.page;
    if (currentPage < pagination.totalPages) {
      this.setState({apiTrigger: 'loadMore'});
      this.fetchVehicles(currentPage + 1);
    }
  };

  onWrapperClick = () => {
    navigate(ScreenNames.VehicleDetail);
  };

  // Pull-to-refresh handler
  pullToRefresh = async () => {
    this.setState({refreshing: true});
    await this.fetchVehicles();
  };

  render() {
    const {loading, vehicleList, pagination} = this.props;
    const {refreshing, apiTrigger} = this.state;
    return (
      <Vehicles_Component
        vehicleData={vehicleList}
        onWrapperClick={this.onWrapperClick}
        loading={loading && !refreshing && apiTrigger === 'default'}
        handleLoadMore={this.handleLoadMore}
        refreshing={refreshing}
        onRefresh={this.pullToRefresh}
        apiTrigger={apiTrigger}
        totalPages={pagination?.totalPages}
        currentPage={pagination?.page}
      />
    );
  }
}

const mapDispatchToProps = {fetchVehiclesThunk};
const mapStateToProps = ({vehicleData}) => {
  return {
    vehicleList: vehicleData?.allVehicles?.data,
    pagination: vehicleData?.allVehicles?.pagination,
    loading: vehicleData?.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);
