/* eslint-disable react-native/no-inline-styles */
import {
  Card,
  Header,
  Loader,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {formatDate} from '../../utils/helper';
import {NoDataFound} from '../../components';

const steps = [
  'Vehicle onboarding',
  'Customer onboarding',
  'Lender selection',
  'Credit - Document verification & approval',
  'Lender submission',
  'Lender approval',
  'DO released',
  'Ops verifies the DO',
  'Loan disbursement',
  'Collection of RC & other docs by PDA',
  'RTO charge calculation',
  'Customer agrees to the RTO charges',
  'Ops ledgers all the invoices',
  'Finance team transfers the amount',
  'RC transfer is complete',
  'Ops verifies the RC transfer & approves',
  'Held back amount is now released',
  'Finance marks the ticket as closed',
];

const completedCount = 12;

export default function LoanTrackingScreen({
  navigation,
  loading,
  trackingSteps,
  loanApplicationId,
}) {
  const handleStepPress = (step, index) => {
    // navigation.navigate('StepDetail', { step, index });
  };

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Loan Application Tracking" />
      <View
        style={{
          padding: theme.sizes.padding,
          flex: 1,
        }}>
        <Text style={styles.trackingId}>
          Tracking ID <Text style={styles.id}>{loanApplicationId}</Text>
        </Text>
        <Spacing size="md" />
        {trackingSteps && trackingSteps.length > 0 ? (
          <Card padding={0}>
            <ScrollView
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.timeline}>
                {trackingSteps.map((item, index) => {
                  // const completed = item?.step === 'LOAN_APPLICATION_CREATED';
                  const completed = true;
                  const isLast = index === trackingSteps.length - 1;

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleStepPress(item, index)}
                      activeOpacity={0.7}>
                      <View
                        style={[
                          styles.stepContainer,
                          !isLast && styles.stepContainerBorder,
                          isLast && {marginBottom: 0},
                        ]}>
                        <View style={styles.markerWrapper}>
                          <View
                            style={[
                              styles.circle,
                              completed
                                ? styles.circleCompleted
                                : styles.circlePending,
                            ]}
                          />
                          {!isLast && (
                            <View
                              style={[
                                styles.verticalLine,
                                completed
                                  ? styles.lineCompleted
                                  : styles.linePending,
                              ]}
                            />
                          )}
                        </View>

                        <View style={styles.textContainer}>
                          <Text
                            type="helper-text"
                            size={15}
                            style={[
                              completed ? styles.textDone : styles.textPending,
                              isLast && styles.finalNote,
                            ]}>
                            {item?.recentActivity?.description}
                          </Text>
                          <Text style={styles.timestamp}>
                            {formatDate(
                              item?.createdAt,
                              'DD MMM YYYY, hh:mm A',
                            )}
                          </Text>
                          {/* {completed && (
                          <Text style={styles.timestamp}>
                            12 Jan 2025, 3:30 PM
                          </Text>
                        )} */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Card>
        ) : (
          <NoDataFound />
        )}
        <Spacing size="xl" />
      </View>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
}

const CIRCLE_SIZE = 14;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {backgroundColor: '#000', padding: 16},
  title: {color: '#fff', fontSize: 18, fontWeight: '600'},
  id: {color: '#FFA500'},
  scroll: {flexGrow: 1, paddingVertical: 20, paddingHorizontal: 12},
  timeline: {paddingLeft: 0},

  stepContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },

  markerWrapper: {
    width: 30,
    alignItems: 'center',
    position: 'relative',
  },

  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
  },

  circleCompleted: {
    borderColor: '#0ea5e9',
    backgroundColor: '#0ea5e9',
  },

  circlePending: {
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },

  verticalLine: {
    position: 'absolute',
    top: CIRCLE_SIZE + 2,
    width: 2,
    height: '100%',
  },

  lineCompleted: {
    backgroundColor: '#0ea5e9',
  },

  linePending: {
    backgroundColor: '#d1d5db',
  },

  textContainer: {
    marginLeft: 12,
    flex: 1,
  },

  stepText: {
    fontWeight: '500',
  },

  textDone: {color: '#000'},
  textPending: {color: '#9ca3af'},
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },

  finalNote: {
    color: '#16a34a',
    marginTop: 4,
  },
  stepContainerBorder: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#e5e7eb',
    // paddingBottom: 20,
  },
});

// import {
//   Card,
//   Header,
//   SafeAreaWrapper,
//   Spacing,
//   Text,
//   theme,
// } from '@caryaar/components';
// import React from 'react';
// import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

// const steps = [
//   'Vehicle onboarding',
//   'Customer onboarding',
//   'Lender selection',
//   'Credit - Document verification & approval',
//   'Lender submission',
//   'Lender approval',
//   'DO released',
//   'Ops verifies the DO',
//   'Loan disbursement',
//   'Collection of RC & other docs by PDA',
//   'RTO charge calculation',
//   'Customer agrees to the RTO charges',
//   'Ops ledgers all the invoices',
//   'Finance team transfers the amount',
//   'RC transfer is complete',
//   'Ops verifies the RC transfer & approves',
//   'Held back amount is now released',
//   'Finance marks the ticket as closed',
// ];

// const completedCount = 12;

// export default function LoanTrackingScreen({navigation}) {
//   const handleStepPress = (step, index) => {
//     // navigation.navigate('StepDetail', { step, index });
//   };

//   return (
//     <SafeAreaWrapper backgroundColor={theme.colors.background}>
//       <Header title="Loan Application Tracking" />
//       <View
//         style={{
//           padding: theme.sizes.padding,
//         }}>
//         <Text style={styles.trackingId}>
//           Tracking ID <Text style={styles.id}>#LA0001</Text>
//         </Text>
//         <Spacing size="md" />
//         <Card padding={0} cardContainerStyle={{height: '93%'}}>
//           <ScrollView
//             contentContainerStyle={styles.scroll}
//             showsVerticalScrollIndicator={false}>
//             <View style={styles.timeline}>
//               {steps.map((step, index) => {
//                 const completed = true;
//                 const isLast = index === steps.length - 1;

//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => handleStepPress(step, index)}
//                     activeOpacity={0.7}>
//                     <View
//                       style={[
//                         styles.stepContainer,
//                         !isLast && styles.stepContainerBorder,
//                       ]}>
//                       <View style={styles.markerWrapper}>
//                         <View
//                           style={[
//                             styles.circle,
//                             completed
//                               ? styles.circleCompleted
//                               : styles.circlePending,
//                           ]}
//                         />
//                         {!isLast && (
//                           <View
//                             style={[
//                               styles.verticalLine,
//                               completed
//                                 ? styles.lineCompleted
//                                 : styles.linePending,
//                             ]}
//                           />
//                         )}
//                       </View>

//                       <View style={styles.textContainer}>
//                         <Text
//                           style={[
//                             styles.stepText,
//                             completed ? styles.textDone : styles.textPending,
//                             isLast && styles.finalNote,
//                           ]}>
//                           {step}
//                         </Text>
//                         {completed && (
//                           <Text style={styles.timestamp}>
//                             12 Jan 2025, 3:30 PM
//                           </Text>
//                         )}
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </ScrollView>
//         </Card>
//         <Spacing size="xl" />
//       </View>
//     </SafeAreaWrapper>
//   );
// }

// const CIRCLE_SIZE = 14;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   header: {backgroundColor: '#000', padding: 16},
//   title: {color: '#fff', fontSize: 18, fontWeight: '600'},
//   id: {color: '#FFA500'},
//   scroll: {flexGrow: 1, padding: 12},
//   timeline: {paddingLeft: 0},

//   stepContainer: {
//     flexDirection: 'row',
//     marginBottom: 32,
//     alignItems: 'flex-start',
//   },

//   markerWrapper: {
//     width: 30,
//     alignItems: 'center',
//     position: 'relative',
//   },

//   circle: {
//     width: CIRCLE_SIZE,
//     height: CIRCLE_SIZE,
//     borderRadius: CIRCLE_SIZE / 2,
//     borderWidth: 2,
//   },

//   circleCompleted: {
//     borderColor: '#0ea5e9',
//     backgroundColor: '#0ea5e9',
//   },

//   circlePending: {
//     borderColor: '#d1d5db',
//     backgroundColor: '#fff',
//   },

//   verticalLine: {
//     position: 'absolute',
//     top: CIRCLE_SIZE + 2,
//     width: 2,
//     height: 55,
//   },

//   lineCompleted: {
//     backgroundColor: '#0ea5e9',
//   },

//   linePending: {
//     backgroundColor: '#d1d5db',
//   },

//   textContainer: {
//     marginLeft: 12,
//     flex: 1,
//   },

//   stepText: {
//     fontSize: 15,
//     fontWeight: '500',
//   },

//   textDone: {color: '#000'},
//   textPending: {color: '#9ca3af'},
//   timestamp: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginTop: 4,
//   },

//   finalNote: {
//     fontSize: 14,
//     color: '#16a34a',
//     marginTop: 4,
//   },
//   stepContainerBorder: {
//     // borderBottomWidth: 1,
//     // borderBottomColor: '#e5e7eb',
//     // paddingBottom: 20,
//   },
// });
