import {
  CardWrapper,
  CustomerCard,
  ImageHeader,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {getGradientColors, getStatusColor} from '../../utils/helper';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

const Customers_Component = ({customerList, onWrapperClick}) => {
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle={'Customers'}
        searchPlaceHolder={'Search by customer name or ID...'}
        onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
        onRightIconPress={() => navigate(ScreenNames.Notification)}
      />

      <FlatList
        data={customerList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.wrapper}
        renderItem={({item}) => (
          <>
            <CardWrapper
              onPress={() => onWrapperClick && onWrapperClick(item)}
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
