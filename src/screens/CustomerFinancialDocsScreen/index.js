import React, {Component} from 'react';
import {connect} from 'react-redux';
import {documentImageLabelMap, documentImageTypes} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {fetchCustomerFinanceDocumentsThunk} from '../../redux/actions';
import {formatDocumentImages} from '../../utils/documentUtils';
import {formatDate, formatIndianCurrency} from '../../utils/helper';
import Customer_Financial_Docs_Component from './Customer_Financial_Documents_Component';
import {get} from 'lodash';

class CustomerFinancialDocsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {},
    };
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    this.fetchCustomerFinanceDetail();
  }

  fetchCustomerFinanceDetail = () => {
    const {selectedCustomerId} = this.props;
    this.props.fetchCustomerFinanceDocumentsThunk(
      selectedCustomerId,
      {},
      response => {
        if (response?.details) {
          this.setState({
            documents: formatDocumentImages(
              response?.details,
              'https://your-image-server.com/images/',
            ),
          });
        }
      },
    );
  };

  onNextPress = () => {
    navigate(ScreenNames.MoreOnFinancial);
  };

  safeGet = (obj, path) => {
    return this.props.loading ? '-' : get(obj, path, '-');
  };

  render() {
    const {loading, financeDocuments} = this.props;
    const {documents} = this.state;
    const {carFinance = {}} = financeDocuments || {};
    let loanClosedDate = this.safeGet(carFinance, 'loanClosedDate');
    return (
      <Customer_Financial_Docs_Component
        onNextPress={this.onNextPress}
        financeDocuments={documentImageTypes
          .filter(type => documents[type]) // only include if document exists
          .map(type => ({
            type,
            label: documentImageLabelMap[type],
            docObject: documents[type],
            viewImage: () => this.handleViewImage(documents[type]?.uri),
          }))}
        loanDetails={[
          {label: 'Bank Name', value: this.safeGet(carFinance, 'bankName')},
          {
            label: 'Loan Account Number',
            value: this.safeGet(carFinance, 'loanAccountNumber') || '-',
          },
          {
            label: 'Loan Amount',
            value:
              formatIndianCurrency(this.safeGet(carFinance, 'loanAmount')) ||
              '-',
          },
          {
            label: 'Tenure',
            value: this.safeGet(carFinance, 'tenure') + ' Months',
          },
          {
            label: 'Monthly EMI',
            value:
              formatIndianCurrency(this.safeGet(carFinance, 'monthlyEmi')) ||
              '-',
          },
          {
            label: 'When was this loan closed',
            value: formatDate(loanClosedDate),
          },
        ]}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {fetchCustomerFinanceDocumentsThunk};
const mapStateToProps = ({customerData}) => {
  return {
    selectedCustomerId: customerData?.selectedCustomerId,
    financeDocuments: customerData?.financeDocuments,
    loading: customerData?.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(CustomerFinancialDocsScreen);
