import {
  Button,
  DetailInfoCard,
  Header,
  Loader,
  SafeAreaWrapper,
  Spacing,
  VehicleImageCard,
  theme,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {styles} from '../../styles/Vehicle.Image.style';
import {getFileType} from '../../utils/documentUtils';
import {DocumentGroup} from '../../components';

const Customer_Financial_Docs_Component = ({
  documentList,
  loanDetails,
  onNextPress,
  loading,
  financeDocuments,
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
                isView
                isDocument={fileType !== 'image'}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
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
