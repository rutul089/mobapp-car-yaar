/* eslint-disable react-native/no-inline-styles */
import {FlatList} from 'react-native';
import {
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  VehicleImageCard,
  theme,
} from '@caryaar/components';

import strings from '../../locales/strings';
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
          imagesList={[
            'https://i.pravatar.cc/150?img=3',
            'https://i.pravatar.cc/150?img=3',
          ]}
          image={'https://i.pravatar.cc/150?img=3'}
          onDeletePress={() => onDeletePress && onDeletePress(item)}
          viewImage={() => onImagePress && onImagePress(item)}
          isView={false}
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

export default Vehicle_Images_Component;
