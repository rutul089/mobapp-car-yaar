import {Button, Header, SafeAreaWrapper, Spacing} from '@caryaar/components';
import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from '../../styles/Vehicle.Image.style';

import {DocumentGroup} from '../../components';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';

const Customer_Documents_Component = ({onNextPress, customerDocuments}) => {
  return (
    <SafeAreaWrapper>
      <Header
        title="Customer Documents"
        // rightLabel="_#ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DocumentGroup
          title={'Documents'}
          documents={customerDocuments}
          isView
          isDocument={true}
        />
        <Spacing size="smd" />
        <Button label={strings.next} onPress={onNextPress} />
        <Spacing size="md" />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default Customer_Documents_Component;
