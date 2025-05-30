import {
  FilePickerModal,
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  Spacing,
  Loader,
} from '@caryaar/components';
import React from 'react';
import {ScrollView} from 'react-native';
import {DocumentGroup} from '../../components';
import strings from '../../locales/strings';
import {styles} from '../../styles/Vehicle.Image.style';

const Finance_Documents_Component = ({
  params,
  imageSlots,
  onDeletePress,
  onImagePress,
  onNextPress,
  onBackPress,
  handleSaveDraftPress,
  handleNextStepPress,
  headerProp,
  documentList,
  fileModalProps,
  loading,
}) => {
  return (
    <SafeAreaWrapper>
      <Header {...headerProp} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={documentList}
          isDocument={true}
        />
        <Spacing size="smd" />
        <FormFooterButtons
          primaryButtonLabel={strings.next}
          secondaryButtonLabel={strings.btnSave}
          onPressPrimaryButton={onNextPress}
          onPressSecondaryButton={handleSaveDraftPress}
          hideSecondaryButton
        />
        <Spacing size="md" />
      </ScrollView>

      <FilePickerModal {...fileModalProps} />

      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

export default Finance_Documents_Component;
