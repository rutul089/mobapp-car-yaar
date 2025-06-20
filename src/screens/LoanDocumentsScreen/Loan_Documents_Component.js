import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  theme,
  FilePickerModal,
  Loader,
  DropdownModal,
} from '@caryaar/components';
import {ScrollView} from 'react-native';

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
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={documentList}
          isDocument={false}
          isView={isReadOnlyLoanApplication}
        />
        <DocumentGroup
          title={'Other Documents'}
          documents={otherDocuments}
          isDocument={false}
          isView={isReadOnlyLoanApplication}
        />
        <Spacing size="smd" />
        <Button variant="link" onPress={onNextPress} label={strings.next} />
        <Spacing size="md" />
      </ScrollView>

      <FilePickerModal {...fileModalProps} />

      <DropdownModal {...dropdownModalProps} />

      {loading && <Loader visible={loading} />}
      {isLoadingDocument && <FullLoader visible={isLoadingDocument} />}
    </SafeAreaWrapper>
  );
};

export default Loan_Documents_Component;
