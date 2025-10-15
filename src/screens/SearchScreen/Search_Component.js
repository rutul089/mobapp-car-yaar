/* eslint-disable react-native/no-inline-styles */
import {
  FormFooterButtons,
  Header,
  images,
  Input,
  Loader,
  SafeAreaWrapper,
  theme,
  Spacing,
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
  loading,
}) => {
  const [caretHidden, setCaretHidden] = React.useState(false);

  return (
    <SafeAreaWrapper>
      <Header title={strings.searchTitle} onBackPress={onBackPress} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.wrapper}
        enableOnAndroid={true}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Input
          label={strings.vehicleNumberLabel}
          placeholder={'GJ01YB6356'}
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
          value={vehicleNumber}
          onChangeText={value => {
            setCaretHidden(!(value.length > 0));
            onVehicleNumberChange?.(value);
          }}
          showStatusIcon={showStatusIcon}
          autoCapitalize={'characters'}
          onSubmitEditing={onSearchVehicle}
          restProps={{
            caretHidden: caretHidden,
          }}
        />
        <Spacing size="lg" />
        <FormFooterButtons
          primaryButtonLabel={strings.searchButton}
          secondaryButtonLabel={strings.addVehicleButton}
          direction="column"
          onPressPrimaryButton={onSearchVehicle}
          onPressSecondaryButton={onAddVehicle}
          hideSecondaryButton={showAddVehicle}
        />
      </KeyboardAwareScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

export default Search_Component;
