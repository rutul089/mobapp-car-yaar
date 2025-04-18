/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Header,
  images,
  Input,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {styles} from '../../styles/Search.style';

const Search_Component = ({
  params,
  onBackPress,
  onSearchVehicle,
  onAddVehicle,
  showAddVehicle,
  vehicleNumber,
  onVehicleNumberChange,
  showError,
  statusMsg,
  showStatusIcon,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title={strings.searchTitle} onBackPress={onBackPress} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.wrapper}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Input
          label={strings.vehicleNumberLabel}
          placeholder={strings.vehicleNumberLabel}
          optionalLabelContainerStyles={{alignSelf: 'center'}}
          labelStyles={{fontSize: theme.typography.fontSizes.body}}
          inputContainerBackgroundColor={'white'}
          inputContainerBackgroundColorFocused={'white'}
          inputStyles={styles.inputStyle}
          returnKeyType="done"
          autoFocus
          isError
          statusMsg={statusMsg}
          statusIcon={images.infoStatus}
          showStatus={showError}
          value={vehicleNumber}
          onChangeText={onVehicleNumberChange}
          showStatusIcon={showStatusIcon}
        />
        <Spacing size="xl" />
        <Button label={strings.searchButton} onPress={onSearchVehicle} />
        {showAddVehicle ? (
          <>
            <Spacing size="md" />
            <Button
              label={strings.addVehicleButton}
              variant="link"
              onPress={onAddVehicle}
            />
          </>
        ) : null}
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

export default Search_Component;
