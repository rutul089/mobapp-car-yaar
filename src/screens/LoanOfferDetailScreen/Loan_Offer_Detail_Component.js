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
  Loader,
} from '@caryaar/components';
import {goBack} from '../../navigation/NavigationUtils';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {formatIndianCurrency} from '../../utils/helper';

const Loan_Offer_Detail_Component = ({
  params,
  onProceedPress,
  onLoanOfferPress,
  loanDetail = {},
  emiData,
  registerNumber,
  tenure,
  loanApplicationId,
  loading,
  emi,
  interesetRate,
  processingFee,
  lenderLogo,
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
        subtitle={registerNumber}
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
          interestRate={interesetRate}
          hideTopMargin
          showRightArrow
          rightIcon={images.successCheck}
          showBreakdown
          footerData={[
            {label: 'Tenure', value: `${tenure} Month`},
            {label: 'EMI', value: formatIndianCurrency(emi)},
            {
              label: 'Processing Fee',
              value: formatIndianCurrency(processingFee),
            },
          ]}
          breakdownExpression={'(1.2 x 10,00,000) - 6,00,000 - 10,000 ='}
          breakdownValue={'5,90,000'}
          logo={{uri: lenderLogo}}
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
            {loanApplicationId}
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
                {renderCellHeader('Month')}
                {emiData?.map((rowData, index) =>
                  renderRow(rowData?.month, `sno-${index}`),
                )}
              </Col>
            </Grid>

            {/* Opening Balance */}
            <Grid>
              <Col>
                {renderCellHeader('Opn.Bal.')}
                {emiData?.map((rowData, index) =>
                  renderRow(
                    formatIndianCurrency(rowData?.openingBalance),
                    `opening-${index}`,
                  ),
                )}
              </Col>
            </Grid>

            {/* EMI */}
            <Grid>
              <Col>
                {renderCellHeader('EMI')}
                {emiData?.map((rowData, index) =>
                  renderRow(formatIndianCurrency(rowData.emi), `emi-${index}`),
                )}
              </Col>
            </Grid>

            {/* Principal */}
            <Grid>
              <Col>
                {renderCellHeader('Principal')}
                {emiData?.map((rowData, index) =>
                  renderRow(
                    formatIndianCurrency(rowData.principal),
                    `principal-${index}`,
                  ),
                )}
              </Col>
            </Grid>

            {/* Interest */}
            <Grid>
              <Col>
                {renderCellHeader('Interest')}
                {emiData?.map((rowData, index) =>
                  renderRow(
                    formatIndianCurrency(rowData.interest),
                    `interest-${index}`,
                  ),
                )}
              </Col>
            </Grid>

            {/* Outstanding Balance */}
            <Grid>
              <Col>
                {renderCellHeader('O/S Bal.')}
                {emiData?.map((rowData, index) =>
                  renderRow(
                    formatIndianCurrency(rowData?.closingBalance),
                    `os-${index}`,
                  ),
                )}
              </Col>
            </Grid>
          </ScrollView>
        </View>

        <Spacing size="xl" />

        <Button label={'Proceed'} onPress={onProceedPress} />
      </ScrollView>

      {loading && <Loader visible={loading} />}
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
