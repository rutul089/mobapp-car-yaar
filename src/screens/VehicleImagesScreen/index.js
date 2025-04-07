import React, {Component} from 'react';
import Vehicle_Images_Component from './Vehicle_Images_Component';
import {pickImage} from '../../utils/imagePicker';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class VehicleImagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontImg: 'https://i.pravatar.cc/150?img=3',
      rearImg: null,
      sideImg: 'https://i.pravatar.cc/150?img=2',
      interiorImg: 'https://i.pravatar.cc/150?img=1',
      damageImg: null,
      rcBookImg: null,
    };
    this.onImagePress = this.onImagePress.bind(this);
    this.onDeletePress = this.onDeletePress.bind(this);
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onImagePress = item => {
    if (item.image == null) {
      this.handleSelectImage();
      return;
    }
    alert(JSON.stringify(item));
  };

  onDeletePress = item => {
    alert(JSON.stringify(item));
  };

  handleSelectImage = async () => {
    try {
      const image = await pickImage(); // set `true` for camera
      if (image) {
        console.log('Selected image:', image.uri);
        // Do something with image.uri, image.fileName, etc.
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  saveAsDraftPress = () => {};

  onNextPress = () => {
    navigate(ScreenNames.VehicleOdometer);
  };

  onBackPress = () => {
    goBack();
  };

  render() {
    const {frontImg, rearImg, sideImg, interiorImg, damageImg, rcBookImg} =
      this.state;
    return (
      <>
        <Vehicle_Images_Component
          imageSlots={[
            {
              key: 'front',
              label: 'Front View',
              image: frontImg,
            },
            {
              key: 'rear',
              label: 'Rear View',
              image: rearImg,
            },
            {
              key: 'side',
              label: 'Left/Right View',
              image: sideImg,
            },
            {
              key: 'interior',
              label: 'Interior View',
              image: interiorImg,
            },
            {
              key: 'damage',
              label: 'Visible Damage',
              image: damageImg,
            },
            {key: 'rcbook', label: 'RC Book', image: rcBookImg}, // Null means not uploaded yet
          ]}
          onImagePress={this.onImagePress}
          onDeletePress={this.onDeletePress}
          saveAsDraftPress={this.saveAsDraftPress}
          onNextPress={this.onNextPress}
          onBackPress={this.onBackPress}
        />
      </>
    );
  }
}

export default VehicleImagesScreen;
