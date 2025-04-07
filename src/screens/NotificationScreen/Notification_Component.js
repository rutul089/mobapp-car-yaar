import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import images from '../../assets/images';
import {Header, SafeAreaWrapper} from '../../components';
import theme from '../../theme';
import NotificationCard from './NotificationCard';

const Notification_Component = ({
  dataList,
  onBackPress,
  onPressRightContent,
}) => {
  const statusIcons = {
    success: images.icApproved,
    pending: images.icPending,
    rejected: images.icRejected,
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Notifications"
        showRightContent={true}
        rightLabel={'Mark as all Read'}
        rightLabelColor={theme.colors.primary}
        onBackPress={onBackPress}
        onPressRightContent={onPressRightContent}
      />
      <FlatList
        data={dataList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <NotificationCard
            description={item?.description}
            isLatest={item?.isLatest}
            imgSource={statusIcons[item.status]}
            subTitle={item?.minutesAgo}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        removeClippedSubviews
        windowSize={10}
      />
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  listContent: {backgroundColor: theme.colors.background, paddingTop: 10},
});

export default Notification_Component;
