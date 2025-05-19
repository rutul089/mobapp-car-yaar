import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {documentImageLabelMap, documentImageTypes} from '../../constants/enums';
import {navigate} from '../../navigation/NavigationUtils';
import {fetchCustomerDocumentsThunk} from '../../redux/actions';
import {
  formatDocumentImages,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {showToast} from '../../utils/helper';
import Customer_Documents_Component from './Customer_Documents_Component';

class CustomerDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {
        // Default document list
        addressProofImage: {},
        applicationFormImage: {},
        bankingProofImage: {},
        businessProofImage: {},
        idProofImage: {},
        incomeProofImage: {},
        insuranceImage: {},
        otherDocuments: {},
        permanentAddressImage: {},
      },
      isLoadingDocument: false,
    };
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    this.fetchCustomerDocuments();
  }

  handleCreateNewWallet = () => {};

  handleImportWallet = () => {};

  onNextPress = () => {
    navigate(ScreenNames.CustomerFinancialDocs);
  };

  handleViewImage = async uri => {
    if (!uri) {
      return;
    }

    setTimeout(async () => {
      this.setState({isLoadingDocument: true});
      try {
        await viewDocumentHelper(
          uri,
          imageUri => {
            navigate(ScreenNames.ImagePreviewScreen, {uri: imageUri});
          },
          error => {
            console.warn('Error opening file:', error);
            showToast('error', 'Could not open the document.', 'bottom', 3000);
          },
        );
      } finally {
        this.setState({isLoadingDocument: false});
      }
    }, 50);
  };

  fetchCustomerDocuments = async () => {
    const {selectedCustomerId} = this.props;
    await this.props.fetchCustomerDocumentsThunk(
      selectedCustomerId,
      {},
      response => {
        if (response.success && response?.data?.length > 0) {
          let data = response?.data?.[0];
          this.setState({
            documents: formatDocumentImages(
              data,
              'https://your-image-server.com/images/',
            ),
          });
        }
      },
    );
  };

  render() {
    const {documents} = this.state;
    return (
      <Customer_Documents_Component
        customerDocuments={documentImageTypes
          .filter(type => documents[type]) // only include if document exists
          .map(type => ({
            type,
            label: documentImageLabelMap[type],
            docObject: documents[type],
            viewImage: () => this.handleViewImage(documents[type]?.uri),
          }))}
        onNextPress={this.onNextPress}
      />
    );
  }
}

const mapActionCreators = {fetchCustomerDocumentsThunk};
const mapStateToProps = ({customerData}) => {
  return {
    selectedCustomerId: customerData?.selectedCustomerId,
    documentDetail: customerData?.documentDetail,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(CustomerDocumentsScreen);
