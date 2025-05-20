import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  theme,
  FilePickerModal,
  Loader,
} from '@caryaar/components';
import {ScrollView} from 'react-native';

import strings from '../../locales/strings';

import {DocumentGroup} from '../../components';
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
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={documentList}
          isDocument={true}
        />
        <DocumentGroup
          title={'Other Documents'}
          documents={otherDocuments}
          isDocument={true}
        />
        <Spacing size="smd" />
        <Button
          variant="link"
          onPress={onNextPress}
          label={isOnboard ? 'Save' : strings.next}
        />
        <Spacing size="md" />
      </ScrollView>

      <FilePickerModal {...fileModalProps} />

      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

export default Loan_Documents_Component;
