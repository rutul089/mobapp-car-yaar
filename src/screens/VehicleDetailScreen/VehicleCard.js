import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Spacing, Text} from '../../components';
import theme from '../../theme'; // Adjust if you're using custom theme
import {styles} from '../../styles/VehicleCard.style';
import images from '../../assets/images';
import strings from '../../locales/strings';

const VehicleCard = ({
  vehicleType = 'PRIVATE CAR',
  vehicleImage,
  manufacturer = 'Maruti Suzuki',
  modelDetails = 'Vitara Brezza | ZDI | 2019 | YL',
  vehicleNumber = 'GJ 01 JR 0945',
  lastUpdated = '12 Dec 2024, 10:34 AM',
  onRefresh,
  backgroundColor = 'white',
  plateBgColor = theme.colors.lightGray1,
  plateBorderColor = theme.colors.gray,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text size={'small'} hankenGroteskBold={true} style={styles.header}>
        {vehicleType}
      </Text>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <FastImage
            style={styles.image}
            defaultSource={images.placeholder_image}
            source={{
              uri: 'https://i.pravatar.cc/150?img=3',
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.details}>
            <Text type={'helper-text'}>{manufacturer}</Text>
            <Text hankenGroteskBold={true} size={'small'} color={'white'}>
              {modelDetails}
            </Text>
            <View
              style={[
                styles.plateWrapper,
                {backgroundColor: plateBgColor, borderColor: plateBorderColor},
              ]}>
              {/* <Image
              source={images.ind_plate} // replace with your IND image
              style={styles.plateLogo}
            /> */}
              <Text
                hankenGroteskBold={true}
                size={'small'}
                style={styles.plateText}>
                {vehicleNumber}
              </Text>
            </View>
          </View>
        </View>
        <Text type={'helper-text'}>{`Last updated on ${lastUpdated}`}</Text>
        <Spacing size="smd" />
        <Button
          variant="link"
          label={strings.refreshDetailButton}
          size="small"
        />
      </View>
    </View>
  );
};

export default VehicleCard;
