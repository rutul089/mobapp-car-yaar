import {
  FilePickerModal,
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  Text,
  VehicleImageCard,
  images,
  theme,
  Loader,
} from '@caryaar/components';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';

import strings from '../../locales/strings';
import {getFileType} from '../../utils/documentUtils';

const Vehicle_Images_Component = ({
  vehicleImages,
  onNextPress,
  saveAsDraftPress,
  onBackPress,
  filePickerProps,
  isLoadingDocument,
  loading,
  registerNumber,
}) => {
  const renderDocumentGroup = (title, documents) => (
    <View key={title}>
      <Text>{title}</Text>
      <View style={styles.rowSpaceBetween}>
        {documents?.map(doc => {
          const fileUri = doc?.docObject?.uri;
          const fileType = getFileType(fileUri);
          return (
            <View key={`${title}-${doc.label}`} style={styles.halfWidth}>
              <VehicleImageCard
                label={doc.label}
                image={fileUri}
                onDeletePress={doc.onDeletePress}
                viewImage={doc.viewImage}
                btnLabel={'Click to Upload\nImage or PDF'}
                uploadMedia={doc.uploadMedia}
                fileType={fileType}
                // isDocument={fileType !== 'image'}
              />
            </View>
          );
        })}
      </View>
      {/* <Spacing size="lg" /> */}
    </View>
  );

  return (
    <SafeAreaWrapper>
      <Header
        title={strings.vehicleDetailTitle}
        onBackPress={onBackPress}
        showRightContent={false}
        rightLabel={registerNumber}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        {renderDocumentGroup('Vehicle Images', vehicleImages)}
        <FormFooterButtons
          primaryButtonLabel={strings.next}
          onPressPrimaryButton={onNextPress}
          hideSecondaryButton
        />
      </ScrollView>
      <FilePickerModal
        isVisible={filePickerProps?.showFilePicker}
        onSelect={filePickerProps?.handleFile}
        onClose={filePickerProps?.closeFilePicker}
        autoCloseOnSelect={false}
        options={[
          {label: 'Camera', value: 'camera', icon: images.file_camera},
          {label: 'Photo Gallery', value: 'gallery', icon: images.file_gallery},
          // {label: 'Documents', value: 'document', icon: images.file_documents},
        ]}
      />
      {isLoadingDocument && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size={'large'} />
        </View>
      )}

      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.smd,
  },
  halfWidth: {
    width: '48%',
    marginBottom: theme.sizes.spacing.smd,
  },
  loaderStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Vehicle_Images_Component;
