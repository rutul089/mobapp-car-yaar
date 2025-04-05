import React, {Component} from 'react';
import Applications_Component from './Applications_Component';

class ApplicationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Applications_Component />
      </>
    );
  }
}

export default ApplicationsScreen;
