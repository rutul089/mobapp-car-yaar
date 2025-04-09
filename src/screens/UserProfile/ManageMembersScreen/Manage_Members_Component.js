import React from 'react';
import {FlatList, View, StyleSheet, Image} from 'react-native';
import {
  Button,
  Card,
  Header,
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
}) => {
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
