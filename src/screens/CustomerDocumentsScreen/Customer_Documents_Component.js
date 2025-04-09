/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Text} from 'react-native';
import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  VehicleImageCard,
} from '../../components';
import {styles} from '../../styles/Vehicle.Image.style';
import theme from '../../theme';
import strings from '../../locales/strings';
import ImageViewing from 'react-native-image-viewing';
const images = [
  {uri: 'https://placekitten.com/800/600'},
  {uri: 'https://placekitten.com/800/600'},
  {uri: 'https://placekitten.com/801/600'},
  {uri: 'https://placekitten.com/802/600'},
  {uri: 'https://placekitten.com/803/600'},
  {uri: 'https://placekitten.com/803/600'},
  {uri: 'https://placekitten.com/803/600'},
  {uri: 'https://placekitten.com/803/600'},
];

const Customer_Documents_Component = ({
  onDeletePress,
  onImagePress,
  customerList,
  onNextPress,
}) => {
  const [visible, setIsVisible] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openViewer = index => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Customer Documents"
        rightLabel="_#ABC123"
        showRightContent={true}
      />
      <FlatList
        data={customerList}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.sizes.padding,
        }}
        bounces={false}
        renderItem={({item, index}) => (
          <VehicleImageCard
            label={item?.label}
            image={item?.image}
            onDeletePress={() => onDeletePress && onDeletePress(item)}
            viewImage={() => openViewer(index)}
            isView
          />
        )}
        keyExtractor={item => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <Text>{'Documents'}</Text>
            <Spacing size="smd" />
          </>
        }
        ListFooterComponent={
          <>
            <Spacing size="xl" />
            <Button label={strings.next} onPress={onNextPress} />
          </>
        }
      />

      <ImageViewing
        images={[
          {uri: 'https://i.pravatar.cc/150'},
          {uri: 'https://i.pravatar.cc/150'},
          {uri: 'https://i.pravatar.cc/150'},
          {uri: 'https://i.pravatar.cc/150'},
        ]}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
      />
    </SafeAreaWrapper>
  );
};

export default Customer_Documents_Component;
