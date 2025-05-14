import React, {Component} from 'react';
import Image_Preview_Component from './Image_Preview_Component';
import {goBack} from '../../navigation/NavigationUtils';

class ImagePreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoModal: false,
      hasNavigatedBack: false, // Add lock
    };
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.setState({
      shoModal: true,
    });
  }

  onCancel = () => {
    if (!this.state.hasNavigatedBack) {
      this.setState({hasNavigatedBack: true}, () => {
        goBack();
      });
    }
  };

  render() {
    const {uri} = this.props.route.params;
    return <Image_Preview_Component onCancel={this.onCancel} uri={uri} />;
  }
}

export default ImagePreviewScreen;
