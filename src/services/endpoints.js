export const endpoints = {
  BANK: {
    LIST: '/v1/banks',
    BY_NAME: bankName => `/v1/banks/${encodeURIComponent(bankName)}`,
    SEARCH: query => `/v1/banks?search=${query}`,
    VERIFY_IFSC: (bankName, ifscCode) =>
      `/v1/banks/verify-ifsc?bankName=${encodeURIComponent(
        bankName,
      )}&ifscCode=${ifscCode}`,
  },
  CUSTOMER: {
    BASE: '/v1/customers',
    LIST: '/v1/partners/customers',
    DETAILS_BY_ID: customerId => `/v1/customers/customerDetails/${customerId}`,
    BASE_DETAILS: customerId => `/v1/customers/${customerId}`,
    CREATE: '/v1/customers',
    VERIFY_OTP: '/v1/customers/verifyOtp',
    SUBMIT_DETAILS: '/v1/customers/customerDetails',
    SUBMIT_LOAN_AMOUNT: '/v1/customers/customerLoanAmount',
    ADD_REFERENCE: applicationId =>
      `/v1/loan-applications/customers/add-reference/${applicationId}`,
    UPDATE_REFERENCE: '/v1/customers/add-reference',
    FINANCE_DETAILS: '/v1/customers/financeDetails',
    FINANCE_DOCUMENTS: '/v1/customers/financeDocuments',
    CUSTOMER_DOCS: customerId =>
      `/v1/loan-applications/customerDocuments/${customerId}`,
    UPDATE_DETAILS: customerId => `/v1/customers/customerDetails/${customerId}`,
    UPDATE_ENVELOPE: envelopeId =>
      `/v1/customers/customer-envelope/${envelopeId}`,
    DELETE: customerId => `/v1/customers/${customerId}`,
    VERIFY_AADHAAR: '/v1/customers/verifyAadhar',
    INITIATE_AADHAAR_DIGILOCKER: '/v1/customers/initiateAadharDigilocker',
    VERIFY_PAN: '/v1/customers/verifyPan',
    CIBIL_SCORE: '/v1/customers/fetchCibilScore',
    REMOVE_PAN: customerId => `/v1/customers/removePan/${customerId}`,
    REMOVE_AADHAAR: customerId => `/v1/customers/removeAadhar/${customerId}`,
    SEND_OTP_CIBIL: '/v1/customers/sendOtpForCibil',
    VERIFY_OTP_CIBIL: '/v1/customers/verifyOtpForCibil',
  },
  LENDER: {
    BASE: '/v1/lenders',
    DETAILS: id => `/v1/lenders/${id}`,
    FILTER: () => '/v1/lenders/filter',
    LIST: principalAmount =>
      `/v1/lenders?principalAmount=${principalAmount}&tenure=60`,
  },
  UPLOAD: {
    PRESIGNED_UPLOAD: '/v1/presigned/upload-url',
    PRESIGNED_DOWNLOAD: '/v1/presigned/download-url',
    FORM_UPLOAD: '/v1/upload/image',
  },
  VEHICLE: {
    LIST: '/v1/vehicles/getVehicleByPartnerId',
    DETAILS_BY_ID: id => `/v1/vehicles/${id}`,
    DETAILS_BY_REG: '/v1/vehicles/details',
    UPDATE_BY_ID: id => `/v1/vehicles/used/${id}`,
    CREATE_NEW: '/v1/vehicles/new',
    CHECK_EXISTS: '/v1/vehicles/check-vehicle-exists',
    ONBOARD_USED: '/v1/vehicles/used/onboard',
    SUBMIT_BY_ID: id => `/v1/vehicles/submit-vehicle/${id}`,
    SAVE_USED: id =>
      id ? `/v1/vehicles/used-vehicle/${id}` : '/v1/vehicles/used-vehicle',
  },
  LOAN: {
    LIST: '/v1/loan-applications',
    BY_ID: id => `/v1/loan-applications/${id}`,
    STATUS_STATS: '/v1/loan-applications/stats/status',
    OVERVIEW: '/v1/loan-applications/overview',
    ASSIGN_TO_CREDIT: '/v1/loan-applications/assign-to-credit',
    FINANCE_DETAILS: applicationId =>
      `/v1/loan-applications/financeDetails/${applicationId}`,
    FINANCE_DOCUMENTS: applicationId =>
      `/v1/loan-applications/financeDocuments/${applicationId}`,
    CUSTOMER_MORE_FINANCE_DETAILS: customerId =>
      `/v1/customers/getCustomerMoreFinanceDetails/${customerId}`,
    LENDER_DETAILS: applicationId => `/v1/loan-applications/${applicationId}`,
    ADD_REFERENCE: applicationId =>
      `/v1/loan-applications/add-reference/${applicationId}`,
    REFERENCE_DETAILS: applicationId =>
      `/v1/loan-applications/loan-references/${applicationId}`,
    DELETE: applicationId => `/v1/loan-applications/${applicationId}`,
    INITIATE: '/v1/loan-applications/initiate',
    CUSTOMER_LOAN_AMOUNT: applicationId =>
      `/v1/loan-applications/customerLoanAmount/${applicationId}`,
    SUBMIT: applicationId => `/v1/loan-applications/submit/${applicationId}`,
    SET_PARTNER_SALES: applicationId =>
      `/v1/loan-applications/set-partner-and-sales-executive/${applicationId}`,
    TRACKING: applicationId =>
      `/v1/loan-applications/tracking/${applicationId}`,
    EMI_PLAN: '/v1/loan-applications/emi/plan',
  },
  LOAN_DOCUMENTS: {
    BY_CATEGORY: (category, customerType) =>
      `/v1/loan-documents/documents/${category}/${customerType}`,
  },
  OCR: {
    AADHAAR: '/v1/customers/uploadAadhaarForOcr',
    PAN: '/v1/customers/uploadPanForOcr',
  },
  PARTNER: {
    DASHBOARD_STATS: '/v1/partners/dashboard-stats/',
    EMPLOYEE_BY_ID: employeeId =>
      `/v1/partners/partner-employees/${employeeId}`,
  },
  SALES_EXECUTIVE: {
    LIST: query => `/v1/sales-executives/?${query}`,
    BY_ID: id => `/v1/sales-executives/${id}`,
    CREATE: '/v1/sales-executives',
    DELETE: id => `/v1/sales-executives/${id}`,
  },
  USER: {
    LOGIN: type => `/v1/user/login?type=${encodeURIComponent(type)}`,
    UPDATE_PROFILE: '/v1/user/update-profile',
    CHANGE_PASSWORD: '/v1/user/change-password',
    PROFILE: '/v1/user/profile',
    COMPLETE_REGISTRATION: '/v1/user/complete-registration',
  },
  NOTIFICATIONS: {
    COUNTS: '/v1/notifications/counts',
    LIST: '/v1/notifications',
    READ_ALL: '/v1/notifications/read-all',
    READ_ONE: id => `/v1/notifications/${id}/read`,
  },
};
