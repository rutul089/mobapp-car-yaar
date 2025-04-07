/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  VehicleImageCard,
} from '../../components';

import strings from '../../locales/strings';
import theme from '../../theme';
import {styles} from '../../styles/Vehicle.Image.style';

const Vehicle_Images_Component = ({
  params,
  imageSlots,
  onDeletePress,
  onImagePress,
  onNextPress,
  saveAsDraftPress,
  onBackPress,
}) => {
  const renderImageItem = ({item}) => {
    return (
      <>
        <VehicleImageCard
          label={item?.label}
          image={item?.image}
          onDeletePress={() => onDeletePress && onDeletePress(item)}
          viewImage={() => onImagePress && onImagePress(item)}
        />
      </>
    );
  };

  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <FlatList
        data={imageSlots}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.sizes.padding,
        }}
        bounces={false}
        renderItem={renderImageItem}
        keyExtractor={item => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <Text>{strings.vehicleImage}</Text>
            <Spacing size="smd" />
          </>
        }
        ListFooterComponent={
          <View style={styles.buttonRow}>
            <Button
              label={strings.btnSaveDraft}
              variant="link"
              buttonWrapper={styles.button}
              onPress={saveAsDraftPress}
            />
            <Button
              label={strings.next}
              style={styles.button}
              buttonWrapper={styles.button}
              onPress={onNextPress}
            />
          </View>
        }
      />
    </SafeAreaWrapper>
  );
};

export default Vehicle_Images_Component;
