import React from 'react';
import {FlatList, View, StyleSheet, Image} from 'react-native';
import {
  Button,
  Card,
  CommonModal,
  Header,
  Input,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../../components';
import {goBack} from '../../../navigation/NavigationUtils';
import theme from '../../../theme';
import images from '../../../assets/images';

const Manage_Members_Component = ({
  handleAddNewMemberPress,
  handleDeleteMemberPress,
  memberList,
  isVisible,
  onCloseVerifyOTP,
  onModalHide,
  onPressPrimaryButton,
  fullName,
  mobileNumber,
  onChangeFullName,
  onChangeMobileNumber,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const renderItem = ({item, index}) => (
    <>
      <Card cardContainerStyle={styles.cardWrapper} padding={12}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={styles.textWrapper}>
          <Text>{item.name}</Text>
          <Text size={'small'} color={theme.colors.textSecondary}>
            {item.phone}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            handleDeleteMemberPress && handleDeleteMemberPress(item, index)
          }>
          <Image source={images.icon_delete} style={styles.deleteIcon} />
        </Pressable>
      </Card>
      <Spacing size="md" />
    </>
  );
  return (
    <SafeAreaWrapper>
      <Header title="Manage Members" onBackPress={() => goBack()} />
      <FlatList
        bounces={false}
        data={memberList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.wrapper}
        ListFooterComponent={
          <>
            <Spacing size="xl" />
            <Button
              label={'Add New Member'}
              onPress={handleAddNewMemberPress}
            />
          </>
        }
      />
      <CommonModal
        isVisible={isVisible}
        onModalHide={onModalHide}
        primaryButtonLabel={'Send Invite'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={onPressPrimaryButton}
        title="Add New Member">
        <View style={{paddingVertical: 15}}>
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={onChangeFullName}
          />
          <Spacing size="lg" />
          <Input
            label="Mobile Number"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={onChangeMobileNumber}
            maxLength={10}
          />
        </View>
      </CommonModal>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
  cardWrapper: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  deleteIcon: {
    height: 24,
    width: 24,
  },
  textWrapper: {flex: 1, marginHorizontal: 12},
});

export default Manage_Members_Component;
