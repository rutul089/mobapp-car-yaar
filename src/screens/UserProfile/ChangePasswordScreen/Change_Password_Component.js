import {
  Button,
  Card,
  Header,
  images,
  Input,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {goBack} from '../../../navigation/NavigationUtils';

const Change_Password_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Change Password" onBackPress={() => goBack()} />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <Card>
          <Input
            label="Old Password"
            leftIconName={images.icon_access}
            isLeftIconVisible
            rightIconName={images.eye_open}
            isRightIconVisible
            isPasswordInput
          />
          <Spacing size="md" />
          <Input
            label="New Password"
            leftIconName={images.icon_access}
            isLeftIconVisible
            rightIconName={images.eye_open}
            isRightIconVisible
            onRightIconPress={() => Alert.alert('tet')}
            isPasswordInput
            _secureTextEntry={true}
          />
          <Spacing size="md" />
          <Input
            label="Confirm New Password"
            leftIconName={images.icon_access}
            isLeftIconVisible
            isPasswordInput={true}
            rightIconName={images.eye_open}
            isRightIconVisible
          />
        </Card>
        <Spacing size="xl" />
        <Button label={'Save'} />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
});

export default Change_Password_Component;
