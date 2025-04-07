import React from 'react';

import theme from '../../theme';
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

import {styles} from '../../styles/Vehicle.Image.style';

const Loan_Documents_Component = ({
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
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Loan Documents"
        subtitle="GJ 01 JR 0945"
        rightLabel="#2ABC123"
        showRightContent={true}
        rightLabelColor={'#F8A902'}
      />
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
            <Text>{'Documents'}</Text>
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

export default Loan_Documents_Component;
