import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../../constants/ScreenNames';
import {navigate} from '../../../navigation/NavigationUtils';
import {updateProfileThunk} from '../../../redux/actions';
import {
  handleFileSelection,
  viewDocumentHelper,
} from '../../../utils/documentUtils';
import {uploadApplicantPhoto} from '../../../utils/fileUploadUtils';
import {
  formatMobileNumber,
  showApiErrorToast,
  showToast,
} from '../../../utils/helper';
import {handleFieldChange, validateField} from '../../../utils/inputHelper';
import Edit_Profile_Component from './Edit_Profile_Component';
import {
  getLabelFromEnum,
  partnerUserPositionValue,
} from '../../../constants/enums';

class EditProfileScreen extends Component {
  state = {
    fullName: '',
    email: '',
    mobileNumber: '',
    salesExecutivePosition: '',
    showFilePicker: false,
    profileImage: null,
    errors: {
      fullName: '',
      email: '',
    },
    isFormValid: false,
    isLoading: false,
  };

  componentDidMount() {
    const {profileDetail} = this.props;
    console.log('profileDetail', JSON.stringify(profileDetail));
    this.setState({
      fullName: get(profileDetail, 'name', ''),
      email: get(profileDetail, 'email', ''),
      mobileNumber: get(profileDetail, 'mobileNumber', ''),
      salesExecutivePosition: get(
        profileDetail,
        'partnerUser.partner.partnerType',
        '',
      ),
      profileImage: get(profileDetail, 'profileImage', ''),
    });
  }

  handleSavePress = () => {
    const {fullName, profileImage, email, mobileNumber} = this.state;
    let param = {
      name: fullName,
      profileImage,
      email,
      mobileNumber,
    };
    const isFormValid = this.validateAllFields();
    if (!isFormValid) {
      return showToast('error', 'Please enter all field');
    }
    this.props.updateProfileThunk(
      param,
      success => {
        // goBack();
      },
      error => {},
    );
  };

  onEditProfilePicPress = () => this.setState({showFilePicker: true});

  onDeleteProfileImage = () => this.setState({profileImage: null});

  handleFile = type => {
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      const fileName = asset.name || asset.fileName || 'upload';
      const mimeType = asset.type || 'application/octet-stream';

      this.setState({
        showFilePicker: false,
        isLoading: true,
      });

      await new Promise(resolve => setTimeout(resolve, 110));

      try {
        const url = await uploadApplicantPhoto(asset, fileName, mimeType);

        this.setState({
          profileImage: url,
          showFilePicker: false,
        });
      } catch (error) {
        showApiErrorToast(error);
      } finally {
        this.setState({
          isLoading: false,
          showFilePicker: false,
        });
      }
    });
  };

  closeFilePicker = () => this.setState({showFilePicker: false});

  handleViewImage = async () => {
    let uri = this.state.profileImage;
    if (!uri) {
      return;
    }

    this.setState({isLoadingDocument: true});
    try {
      await viewDocumentHelper(
        uri,
        imageUri => {
          navigate(ScreenNames.ImagePreviewScreen, {uri: imageUri});
        },
        error => {
          showToast('error', 'Could not open the document.', 'bottom', 3000);
        },
      );
    } finally {
      this.setState({showFilePicker: false});
    }
  };

  validateAllFields = () => {
    const fieldsToValidate = ['fullName', 'email'];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  render() {
    const {
      fullName,
      email,
      mobileNumber,
      salesExecutivePosition,
      profileImage,
      showFilePicker,
      errors,
      isLoading,
    } = this.state;

    const {loading, profileDetail} = this.props;

    return (
      <Edit_Profile_Component
        profileImage={profileImage}
        state={{fullName, email, mobileNumber, salesExecutivePosition}}
        onEmailChange={value => this.onChangeField('email', value)}
        onFullNameChange={value => this.onChangeField('fullName', value)}
        onMobileChange={value => this.onChangeField('mobileNumber', value)}
        handleSavePress={this.handleSavePress}
        onEditProfilePicPress={this.onEditProfilePicPress}
        viewProfileImage={this.handleViewImage}
        onDeleteProfileImage={this.onDeleteProfileImage}
        fileModalProps={{
          isVisible: showFilePicker,
          onSelect: this.handleFile,
          onClose: this.closeFilePicker,
          autoCloseOnSelect: false,
        }}
        restInputProps={{
          fullName: {
            value: fullName,
            isError: errors.fullName,
            statusMsg: errors.fullName,
            autoCapitalize: 'words',
          },
          mobileNumber: {
            value: formatMobileNumber(mobileNumber),
            isError: errors.mobileNumber,
            statusMsg: errors.mobileNumber,
          },
          email: {
            value: email,
            isError: errors.email,
            statusMsg: errors.email,
          },
        }}
        loading={loading}
        isLoading={isLoading}
        designation={getLabelFromEnum(
          partnerUserPositionValue,
          profileDetail?.partnerUser?.position,
          '-',
        )}
      />
    );
  }
}

const mapDispatchToProps = {updateProfileThunk};

const mapStateToProps = ({user}) => ({
  profileDetail: user.userProfile,
  loading: user?.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
