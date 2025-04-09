import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import images from '../../assets/images';
import {
  CardWrapper,
  CustomerCard,
  ImageHeader,
  SafeAreaWrapper,
  Spacing,
} from '../../components';
import theme from '../../theme';
import {getGradientColors, getStatusColor} from '../../utils/helper';

const Customers_Component = ({customerList, onWrapperClick}) => {
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle={'Customers'}
        searchPlaceHolder={'Search by customer name or ID...'}
      />

      <FlatList
        data={customerList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.wrapper}
        renderItem={({item}) => (
          <>
            <CardWrapper
              onWrapperClick={() => onWrapperClick && onWrapperClick(item)}
              applicationNumber={item?.applicationNumber}
              showRightArrow={true}
              statusColor={getStatusColor(item.applicationNumber)}
              gradientColors={getGradientColors(item.applicationNumber)}>
              <CustomerCard
                customerId={item.customerId}
                customerName={item.customerName}
                customerNote={item.customerNote}
                footerInfo={item.footerInfo}
                logo={{uri: item.profileImage}}
                noMargin
                noShadow
              />
            </CardWrapper>
            <Spacing size="smd" />
          </>
        )}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
  },
});

export default Customers_Component;
