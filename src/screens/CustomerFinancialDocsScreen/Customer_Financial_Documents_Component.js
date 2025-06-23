import {
  Button,
  DetailInfoCard,
  Header,
  Loader,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {styles} from '../../styles/Vehicle.Image.style';
import {DocumentGroup} from '../../components';

const Customer_Financial_Docs_Component = ({
  documentList,
  loanDetails,
  onNextPress,
  loading,
  financeDocuments,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Financial Details" onBackPress={() => goBack()} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={financeDocuments}
          isDocument={true}
          isView
        />
        <Spacing size="smd" />
        <DetailInfoCard
          label={'Details'}
          data={loanDetails}
          isSemiBold={false}
        />
        <Spacing size="xl" />
        <Button label={strings.next} onPress={onNextPress} />
        <Spacing size="md" />
      </ScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

export default Customer_Financial_Docs_Component;
