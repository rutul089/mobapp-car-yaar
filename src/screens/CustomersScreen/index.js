import React, {Component} from 'react';
import Customers_Component from './Customers_Component';

class CustomersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Customers_Component />
      </>
    );
  }
}

export default CustomersScreen;
