import React, {Component} from 'react';
import {connect} from 'react-redux';
import Track_Application_Component from './Track_Application_Component';

class TrackApplicationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Track_Application_Component
          timelineData={[
            {
              title: 'Vehicle onboarding',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Customer onboarding',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Lender selection',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Credit - Document verification & approval',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Lender submission',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Lender approval',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'DO released',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Ops verifies the DO',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Loan disbursement',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Collection of RC & other docs by PDA',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'RTO charge calculation',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {
              title: 'Customer agrees to the RTO charges',
              date: '12 Jan 2025, 3:30 PM',
              completed: true,
            },
            {title: 'Ops ledgers all the invoices', completed: false},
            {title: 'Finance team transfers the amount', completed: false},
            {title: 'RC transfer is complete', completed: false},
            {
              title: 'Ops verifies the RC transfer & approves',
              completed: false,
            },
            {title: 'Held back amount is now released', completed: false},
            {
              title: 'Finance marks the ticket as closed',
              completed: false,
              isFinal: true,
            },
          ]}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(TrackApplicationScreen);
