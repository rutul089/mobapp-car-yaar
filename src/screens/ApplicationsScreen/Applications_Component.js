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
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

const Applications_Component = ({
  params,
  dummyList,
  onItemPress,
  handleTrackApplication,
}) => {
  const renderItem = ({item}) => (
    <>
      <CardWrapper
        status={item?.status?.toUpperCase()}
        showApplicationNumber={true}
        showLeftText
        isStatusBold={true}
        isLeftTextBold={true}
        gradientColors={getGradientColorsLoan(item.type)}
        leftText={item?.id}>
        <FinanceCard
          bankName={item.title}
          interestRate={item.interestRate}
          hideTopMargin
          showRightArrow
          ctaLabel="Track Loan Application"
          onCTAPress={() =>
            handleTrackApplication && handleTrackApplication(item)
          }
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
        onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
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
