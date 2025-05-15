import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  VehicleImageCard,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../../styles/Vehicle.Image.style';

import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {getFileType} from '../../utils/documentUtils';

const Customer_Documents_Component = ({
  onDeletePress,
  onImagePress,
  customerList,
  onNextPress,
  customerDocuments,
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
                isView={true}
                isDocument={fileType !== 'image'}
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
        title="Customer Documents"
        // rightLabel="_#ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        {renderDocumentGroup('Documents', customerDocuments)}
        <Spacing size="md" />
        <Button label={strings.next} onPress={onNextPress} />
        <Spacing size="md" />
      </ScrollView>
      {/* <FlatList
        data={customerList}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          padding: theme.sizes.padding,
        }}
        bounces={false}
        renderItem={({item, index}) => (
          <VehicleImageCard
            label={item?.label}
            image={item?.image}
            onDeletePress={() => onDeletePress && onDeletePress(item)}
            viewImage={() => openViewer(index)}
            isView
          />
        )}
        keyExtractor={item => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <Text>{'Documents'}</Text>
            <Spacing size="smd" />
          </>
        }
        ListFooterComponent={
          <>
            <Spacing size="xl" />
            <Button label={strings.next} onPress={onNextPress} />
          </>
        }
      /> */}
    </SafeAreaWrapper>
  );
};

export default Customer_Documents_Component;
