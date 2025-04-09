import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  Button,
  Card,
  Header,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../../components';
import {goBack} from '../../../navigation/NavigationUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import theme from '../../../theme';
import images from '../../../assets/images';

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
            secureTextEntry={true}
            rightIconName={images.eye_open}
            isRightIconVisible
          />
          <Spacing size="md" />
          <Input
            label="New Password"
            leftIconName={images.icon_access}
            isLeftIconVisible
            rightIconName={images.eye_open}
            isRightIconVisible
            onRightIconPress={() => Alert.alert('tet')}
            secureTextEntry={true}
          />
          <Spacing size="md" />
          <Input
            label="Confirm New Password"
            leftIconName={images.icon_access}
            isLeftIconVisible
            secureTextEntry={true}
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
