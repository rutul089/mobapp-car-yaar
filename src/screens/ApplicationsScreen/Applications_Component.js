import React from 'react';
import {Image, View, FlatList} from 'react-native';
import {
  FinanceCard,
  ImageHeader,
  Input,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  CardWrapper,
} from '../../components';
import theme from '../../theme';
import images from '../../assets/images';

const Applications_Component = ({params, dummyList, onItemPress}) => {
  const renderItem = ({item}) => (
    <>
      <CardWrapper
        status="APPLIED"
        showApplicationNumber={true}
        applicationNumber="849363">
        <FinanceCard
          title={item.title}
          interestRate={item.interestRate}
          isEligible={false}
          tenure="60 Months"
          emi="11,093"
          processingFee="1,000"
          noMargin
          isWrapper
          showRightIcon={true}
          showButton
          buttonLabel="Track Loan Application"
          badge={false}
          footerInfo={item.footerInfo}
          showBadge={false}
          logo={{uri: item.image}}
          onItemPress={() => onItemPress && onItemPress(item)}
        />
      </CardWrapper>
      <Spacing />
    </>
  );
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle={'Loan Application'}
        searchPlaceHolder={'Search by application id'}
      />
      <FlatList
        data={dummyList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{padding: theme.sizes.padding}}
      />
    </SafeAreaWrapper>
  );
};

export default Applications_Component;
