/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';

import {
  Button,
  DetailInfoCard,
  Header,
  Loader,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import images from '../../assets/images';
import {getCibilScoreStatus} from '../../utils/helper';

const CIBILReport_Component = ({
  params,
  state,
  onSavePress,
  headerProp,
  restInputProps = {},
  loading,
  lastUpdatedOn,
  cibilScore = '800',
  cibilStatus,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <View bounces={false} style={styles.wrapper}>
        <View style={{flex: 1}}>
          <DetailInfoCard label={'CIBIL Score'} data={null} isSemiBold={false}>
            <View style={styles.cibilWrapper}>
              <Text
                textAlign={'center'}
                color={theme.colors.primary}
                size={'h2'}
                hankenGroteskExtraBold={true}>
                {cibilScore}
              </Text>
              {cibilScore && (
                <Text
                  type={'caption'}
                  style={styles.textNote}
                  hankenGroteskBold
                  textAlign={'center'}>
                  {getCibilScoreStatus(Number(cibilScore))}
                </Text>
              )}
            </View>
            {lastUpdatedOn && (
              <Text hankenGroteskSemiBold type={'label'} textAlign={'center'}>
                {`Score as of ${lastUpdatedOn}`}
              </Text>
            )}
          </DetailInfoCard>
          <Spacing size="xl" />
          <Button label={'Next'} onPress={onSavePress} />
        </View>
        <View style={styles.bottomWrapper}>
          <Image
            source={images.cibil_banner}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
      </View>

      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
  cibilWrapper: {
    minHeight: 80,
    borderRadius: 8,
    backgroundColor: '#1D95F020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
  },
  textNote: {width: '80%', marginTop: 5},
  bottomWrapper: {
    flex: 0.4,
    justifyContent: 'center',
  },
  imageStyle: {height: 80, width: 100, alignSelf: 'center'},
});

export default CIBILReport_Component;
