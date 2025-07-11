import {
  FilePickerModal,
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  Spacing,
  Loader,
  DropdownModal,
} from '@caryaar/components';
import React from 'react';
import {ScrollView} from 'react-native';
import {DocumentGroup, FullLoader} from '../../components';
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
  isLoadingDocument,
  isReadOnlyLoanApplication,
  dropdownModalProps,
}) => {
  return (
    <SafeAreaWrapper>
      <Header {...headerProp} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={documentList}
          isDocument={false}
          isView={isReadOnlyLoanApplication}
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

      <DropdownModal {...dropdownModalProps} />

      {loading && <Loader visible={loading} />}
      {isLoadingDocument && <FullLoader visible={isLoadingDocument} />}
    </SafeAreaWrapper>
  );
};

export default Finance_Documents_Component;
