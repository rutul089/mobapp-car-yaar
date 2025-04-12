import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {
  VehicleCard,
  ImageHeader,
  SafeAreaWrapper,
  CardWrapper,
  Spacing,
} from '../../components';
import {getGradientColors, getStatusColor} from '../../utils/helper';
import theme from '../../theme';

const Vehicles_Component = ({vehicleData, onWrapperClick}) => {
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle={'Vehicles'}
        searchPlaceHolder={'Search by vehicle number...'}
      />
      <FlatList
        data={vehicleData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.wrapper}
        renderItem={({item}) => (
          <>
            <CardWrapper
              onPress={() => onWrapperClick && onWrapperClick(item)}
              leftText={item?.status}
              showTrailingIcon
              statusColor={getStatusColor(item.status)}
              gradientColors={getGradientColors(item.status)}>
              <VehicleCard
                brandName={item.brandName}
                vehicleDetail={item.vehicleDetail}
                plateNumber={item.plateNumber}
                footerInfo={item.footerInfo}
                logo={{uri: item.logo}}
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
    backgroundColor: theme.colors.background,
  },
});

export default Vehicles_Component;
