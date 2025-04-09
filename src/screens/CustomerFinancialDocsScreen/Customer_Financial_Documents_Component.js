import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  VehicleImageCard,
} from '../../components';
import {goBack} from '../../navigation/NavigationUtils';
import {styles} from '../../styles/Vehicle.Image.style';
import theme from '../../theme';
import DetailInfoCard from '../VehicleDetailScreen/DetailInfoCard';
import strings from '../../locales/strings';

const Customer_Financial_Docs_Component = ({
  documentList,
  loanDetails,
  onNextPress,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Financial Details" onBackPress={() => goBack()} />
      <FlatList
        data={documentList}
        contentContainerStyle={styles.wrapper}
        bounces={false}
        renderItem={({item, index}) => (
          <VehicleImageCard
            label={item?.label}
            image={item?.image}
            isView
            cardWrapper={{width: '47%', flex: 0}}
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
            <Spacing size="smd" />
            <DetailInfoCard
              label={'Details'}
              data={loanDetails}
              isSemiBold={false}
            />
            <Spacing size="xl" />
            <Button label={strings.next} onPress={onNextPress} />
          </>
        }
      />
    </SafeAreaWrapper>
  );
};

export default Customer_Financial_Docs_Component;
