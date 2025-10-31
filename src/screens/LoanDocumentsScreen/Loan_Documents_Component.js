/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  theme,
  FilePickerModal,
  Loader,
  DropdownModal,
  CommonModal,
  Text,
} from '@caryaar/components';
import {ScrollView, View} from 'react-native';

import strings from '../../locales/strings';

import {DocumentGroup, FullLoader} from '../../components';
import {styles} from '../../styles/Vehicle.Image.style';

const Loan_Documents_Component = ({
  params,
  onNextPress,
  headerProp,
  documentList,
  otherDocuments,
  fileModalProps,
  isOnboard,
  loading,
  isLoadingDocument,
  acceptedDocuments,
  dropdownModalProps,
  isReadOnlyLoanApplication,
  exitConformationModalProp,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={documentList}
          isDocument={true}
          isView={isReadOnlyLoanApplication}
        />
        {/* <DocumentGroup
          title={'Other Documents'}
          documents={otherDocuments}
          isDocument={false}
          isView={isReadOnlyLoanApplication}
        /> */}
        <Spacing size="xs" />
        <Button variant="link" onPress={onNextPress} label={strings.next} />
        <Spacing size="md" />
      </ScrollView>

      <FilePickerModal {...fileModalProps} />

      <DropdownModal {...dropdownModalProps} />

      <CommonModal
        isVisible={exitConformationModalProp?.isVisible}
        onModalHide={exitConformationModalProp?.onModalHide}
        primaryButtonLabel={strings.exitConformationModal.button1}
        isScrollableContent={false}
        isPrimaryButtonVisible={true}
        showSecondaryButton
        secondaryButtonText={strings.exitConformationModal.button2}
        onPressPrimaryButton={exitConformationModalProp?.onContinuePress}
        onSecondaryPress={exitConformationModalProp?.onExitPress}
        title={strings.exitConformationModal.tittle}>
        <View style={{paddingVertical: 10}}>
          <Text textAlign="center" lineHeight={22}>
            {strings.exitConformationModal.description}
          </Text>
        </View>
      </CommonModal>

      {loading && <Loader visible={loading} />}

      {isLoadingDocument && <FullLoader visible={isLoadingDocument} />}
    </SafeAreaWrapper>
  );
};

export default Loan_Documents_Component;
