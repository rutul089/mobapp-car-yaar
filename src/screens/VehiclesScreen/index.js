import React, {Component} from 'react';
import Vehicles_Component from './Vehicles_Component';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Vehicles_Component />
      </>
    );
  }
}

export default Vehicles;
