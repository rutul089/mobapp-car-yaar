import React from 'react';
import {FlatList} from 'react-native';
import {
  CardWrapper,
  FinanceCard,
  ImageHeader,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import {getGradientColorsLoan} from '../../utils/helper';

const Applications_Component = ({params, dummyList, onItemPress}) => {
  const renderItem = ({item}) => (
    <>
      <CardWrapper
        status={item?.status?.toUpperCase()}
        showApplicationNumber={true}
        showLeftText
        isStatusBold={true}
        gradientColors={getGradientColorsLoan(item.type)}
        leftText={item?.id}>
        <FinanceCard
          bankName={item.title}
          interestRate={item.interestRate}
          hideTopMargin
          showRightArrow
          ctaLabel="Track Loan Application"
          onCTAPress={() => {}}
          footerData={item.footerInfo}
          showBadge={false}
          logo={{uri: item.image}}
          showCTAButton
          onPress={() => onItemPress && onItemPress(item)}
        />
      </CardWrapper>
      <Spacing size="md" />
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
