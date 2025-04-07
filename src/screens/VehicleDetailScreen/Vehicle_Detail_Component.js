import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Header, SafeAreaWrapper, Spacing} from '../../components';
import strings from '../../locales/strings';
import VehicleCard from './VehicleCard';
import theme from '../../theme';
import DetailInfoCard from './DetailInfoCard';

const Vehicle_Detail_Component = ({
  onBackPress,
  onSaveDraftPress,
  onNextPress,
  vehicleInfo,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <ScrollView bounces={false}>
        <View style={styles.wrapper}>
          <VehicleCard />
        </View>
        <View
          bounces={false}
          style={{
            padding: theme.sizes.padding,
            backgroundColor: theme.colors.background,
          }}>
          <DetailInfoCard data={vehicleInfo} />
          <View style={styles.buttonRow}>
            <Button
              label={strings.btnSaveDraft}
              variant="link"
              buttonWrapper={styles.button}
              onPress={onSaveDraftPress}
            />
            <Button
              label={strings.next}
              style={styles.button}
              buttonWrapper={styles.button}
              onPress={onNextPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    paddingVertical: theme.sizes.spacing.md,
    paddingHorizontal: theme.sizes.padding,
  },
  buttonRow: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4, // Small spacing between buttons
  },
});

export default Vehicle_Detail_Component;
