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

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {fontSize: 20, fontWeight: 'bold', marginBottom: 12},
  row: {justifyContent: 'space-between'},
  buttonRow: {
    marginVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4, // Small spacing between buttons
  },
});

export default Vehicle_Images_Component;
