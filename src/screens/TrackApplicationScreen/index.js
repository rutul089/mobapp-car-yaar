import React, {Component} from 'react';
import {connect} from 'react-redux';
import Track_Application_Component from './Track_Application_Component';
import {fetchLoanTrackingDetailsByAppId} from '../../services';
import {getParams, getScreenParam} from '../../navigation/NavigationUtils';
import {showApiErrorToast} from '../../utils/helper';

class TrackApplicationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      trackingSteps: [],
      loanApplicationId: '',
    };
  }

  async componentDidMount() {
    let navState = getScreenParam(this.props.route, 'params');
    let applicationId = navState?.id || '676f4163-3980-4fd0-a0ce-81802935eb8d';

    this.setState({
      loading: true,
      loanApplicationId: navState?.loanApplicationId,
    });
    try {
      const response = await fetchLoanTrackingDetailsByAppId(applicationId);
      if (response?.success) {
        this.setState({
          trackingSteps: response?.data,
        });
      }
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      this.setState({loading: false});
    }
  }

  render() {
    const {loading, trackingSteps, loanApplicationId} = this.state;
    return (
      <Track_Application_Component
        loading={loading}
        trackingSteps={trackingSteps}
        loanApplicationId={loanApplicationId}
      />
    );
  }
}

const mapActionCreators = {};
// Redux: map state to props
const mapStateToProps = ({loanData}) => {
  return {
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(TrackApplicationScreen);
