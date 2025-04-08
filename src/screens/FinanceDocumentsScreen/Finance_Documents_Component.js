/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList} from 'react-native';
import {
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  VehicleImageCard,
} from '../../components';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {styles} from '../../styles/Vehicle.Image.style';
import theme from '../../theme';

const Finance_Documents_Component = ({
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
          cardWrapper={{width: '45%', flex: 0}}
        />
      </>
    );
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Finance Details"
        subtitle="GJ 01 JR 0945"
        rightLabel="ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
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
          <FormFooterButtons
            primaryButtonLabel={strings.btnSaveDraft}
            secondaryButtonLabel={strings.next}
            onPressPrimaryButton={saveAsDraftPress}
            onPressSecondaryButton={onNextPress}
          />
        }
      />
    </SafeAreaWrapper>
  );
};

export default Finance_Documents_Component;
