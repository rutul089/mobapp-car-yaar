import React, {Component} from 'react';
import Search_Component from './Search_Component';
import {goBack} from '../../navigation/NavigationUtils';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  render() {
    return (
      <>
        <Search_Component onBackPress={this.onBackPress} />
      </>
    );
  }
}

export default SearchScreen;
