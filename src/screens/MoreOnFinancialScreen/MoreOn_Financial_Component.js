/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  DetailInfoCard,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  Loader,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';
import {
  getLabelFromEnum,
  referenceLabelMap,
  relationshipTypeValue,
} from '../../constants/enums';
import {RNSpeedometer} from '../../components';

const MoreOn_Financial_Component = ({
  cibilList,
  officeVerificationList,
  homeVerificationList,
  onClosePress,
  loading,
  cibilScore,
  lastUpdatedOn,
  loanReferences,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="More On Financials"
        // rightLabel="@1231313"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <DetailInfoCard
          label={'CIBIL Score'}
          data={cibilList}
          isSemiBold={false}>
          {cibilScore && (
            <RNSpeedometer
              value={cibilScore}
              size={250}
              maxValue={900}
              minValue={300}
              wrapperStyle={{height: 230}}
              // innerCircleStyle={{backgroundColor: 'white'}}
              // labelNoteStyle={{top: 5}}
              // outerCircleStyle={{backgroundColor: 'red'}}
            />
          )}
          {/* <View style={styles.cibilWrapper}>
            <Text
              textAlign={'center'}
              color={theme.colors.primary}
              size={'h2'}
              hankenGroteskExtraBold={true}>
              {cibilScore}
            </Text>
            {lastUpdatedOn && (
              <Text
                type={'caption'}
                style={styles.textNote}
                textAlign={'center'}>
                Last updated on 12 Dec 2024, 10:34 AM
              </Text>
            )}
          </View> */}
        </DetailInfoCard>
        {loanReferences?.map((item, index) => {
          return (
            <View key={`doc-${index}`}>
              <Spacing size="lg" />
              <DetailInfoCard
                label={getLabelFromEnum(referenceLabelMap, item?.type)}
                data={[
                  {label: 'Reference Name', value: item?.referenceName || '-'},
                  {label: 'Mobile Number', value: item?.mobileNumber || '-'},
                  {
                    label: 'Relationship',
                    value:
                      getLabelFromEnum(
                        relationshipTypeValue,
                        item?.relationship,
                      ) || '-',
                    full: true,
                  },
                  {
                    label: 'Address',
                    value: item?.address || '-',
                    full: true,
                  },
                  {
                    label: 'Pincode',
                    value: item?.pincode || '-',
                    full: true,
                  },
                ]}
                isSemiBold={false}
              />
            </View>
          );
        })}
        <Spacing size="xl" />
        <Button label={'Close'} onPress={onClosePress} />
      </ScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
  cibilWrapper: {
    minHeight: 80,
    borderRadius: 8,
    backgroundColor: '#1D95F020',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  textNote: {width: '80%', marginTop: 5},
});

export default MoreOn_Financial_Component;
