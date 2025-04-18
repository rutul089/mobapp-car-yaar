/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  CardWithActionButton,
  FinanceCard,
  Header,
  images,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import {goBack} from '../../navigation/NavigationUtils';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {formatIndianNumber} from '../../utils/helper';

const Loan_Offer_Detail_Component = ({
  params,
  onProceedPress,
  onLoanOfferPress,
  loanDetail = {},
  emiData,
}) => {
  const renderCellHeader = (value, style) => {
    return (
      <View style={[styles.tableHeaderStyle, style]}>
        <Text type={'caption'} hankenGroteskMedium>
          {value}
        </Text>
      </View>
    );
  };

  const renderRow = (value, key, style) => {
    return (
      <Row
        key={key.toString()}
        style={[
          styles.tableHeaderStyle,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
          },
          style,
        ]}>
        <Text size="caption">{value}</Text>
      </Row>
    );
  };

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Loan Offer Details"
        subtitle="GJ 01 JR 0945"
        onBackPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.wrapper}>
        <CardWithActionButton
          buttonLabel={'Apply Now'}
          description={
            'Based on your eligibility, HDB Financial Services offers a balance transfer with an LTV of up to 120%'
          }
          onPress={onLoanOfferPress}
          wrapperBgColor={'#e5f4e7'}
          btnBgColor={'#60ca39'}
          themeColor={'black'}
          showButton
          arrowIcon={images.arrow_right}
          icon={images.moneyCycleIcon}
        />

        <Spacing size="md" />

        <FinanceCard
          statusImg={images.successCheck}
          bankName={loanDetail?.title}
          interestRate={loanDetail?.interestRate}
          hideTopMargin
          showRightArrow
          rightIcon={images.successCheck}
          showBreakdown
          footerData={[
            {label: 'Tenure', value: '60 Month'},
            {label: 'EMI', value: formatIndianNumber('75000.12')},
            {label: 'Processing Fee', value: formatIndianNumber(5000)},
          ]}
          breakdownExpression={'(1.2 x 10,00,000) - 6,00,000 - 10,000 ='}
          breakdownValue={'5,90,000'}
          logo={images.hdfcImg}
        />

        <Spacing size="md" />

        <CardWithActionButton
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          icon={images.filterFill}
          buttonLabel="Customize Loan Offer"
          arrowIcon={images.arrow_right}
          onPress={onLoanOfferPress}
        />

        <Spacing size="xl" />

        <View style={styles.rowWrapper}>
          <Text>Tentative EMI Payment</Text>
          <Text size={'small'} hankenGroteskBold color={'#F8A902'}>
            #ABC123
          </Text>
        </View>

        <Spacing size="md" />

        <View style={styles.tableContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {/* S.No. */}
            <Grid>
              <Col>
                {renderCellHeader('S.No.')}
                {emiData.map((rowData, index) =>
                  renderRow(rowData.sno, `sno-${index}`),
                )}
              </Col>
            </Grid>

            {/* Opening Balance */}
            <Grid>
              <Col>
                {renderCellHeader('Opn.Bal.')}
                {emiData.map((rowData, index) =>
                  renderRow(
                    formatIndianNumber(rowData.opening),
                    `opening-${index}`,
                  ),
                )}
              </Col>
            </Grid>

            {/* EMI */}
            <Grid>
              <Col>
                {renderCellHeader('EMI')}
                {emiData.map((rowData, index) =>
                  renderRow(formatIndianNumber(rowData.emi), `emi-${index}`),
                )}
              </Col>
            </Grid>

            {/* Principal */}
            <Grid>
              <Col>
                {renderCellHeader('Principal')}
                {emiData.map((rowData, index) =>
                  renderRow(
                    formatIndianNumber(rowData.principal),
                    `principal-${index}`,
                  ),
                )}
              </Col>
            </Grid>

            {/* Interest */}
            <Grid>
              <Col>
                {renderCellHeader('Interest')}
                {emiData.map((rowData, index) =>
                  renderRow(
                    formatIndianNumber(rowData.interest),
                    `interest-${index}`,
                  ),
                )}
              </Col>
            </Grid>

            {/* Outstanding Balance */}
            <Grid>
              <Col>
                {renderCellHeader('O/S Bal.')}
                {emiData.map((rowData, index) =>
                  renderRow(formatIndianNumber(rowData.os), `os-${index}`),
                )}
              </Col>
            </Grid>
          </ScrollView>
        </View>

        <Spacing size="xl" />

        <Button label={'Proceed'} onPress={onProceedPress} />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableHeaderStyle: {
    height: 35,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#00000008',
    paddingHorizontal: 15,
  },
  tableContainer: {
    borderRadius: theme.sizes.borderRadius.card,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});

export default Loan_Offer_Detail_Component;
