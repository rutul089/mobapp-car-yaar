/* eslint-disable react-native/no-inline-styles */
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
  LoanApplicationCardWrapper,
} from '../../components';
import theme from '../../theme';
import images from '../../assets/images';

const Applications_Component = ({params, dummyList, onItemPress}) => {
  const renderItem = ({item}) => (
    <>
      <LoanApplicationCardWrapper
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
      </LoanApplicationCardWrapper>
      <Spacing />
    </>
  );
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader />
      <View
        style={{
          backgroundColor: theme.colors.primaryBlack,
          paddingHorizontal: theme.sizes.padding,
          paddingBottom: theme.sizes.padding,
          paddingTop: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text hankenGroteskExtraBold={true} color={'white'} size={'h2'}>
            Loan Applications
          </Text>
          <Pressable>
            <Image
              resizeMode={'contain'}
              source={images.filter}
              style={{height: 24, width: 24}}
            />
          </Pressable>
        </View>
        <Spacing size="md" />
        <Input
          leftIconName={images.icSearch}
          isLeftIconVisible
          inputContainerBackgroundColor={'#222222'}
          inputContainerBackgroundColorFocused={'#222222'}
          themeColor={theme.colors.textSecondary}
          placeholder="Search by application number..."
        />
      </View>
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
