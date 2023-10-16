///
/// GDI Staging - Mark VI No 1 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import placeholder from 'app/entities/system/placeholder/placeholder.reducer';
import fixedAssetAcquisition from 'app/entities/assets/fixed-asset-acquisition/fixed-asset-acquisition.reducer';
import fixedAssetNetBookValue from 'app/entities/assets/fixed-asset-net-book-value/fixed-asset-net-book-value.reducer';
import fixedAssetDepreciation from 'app/entities/assets/fixed-asset-depreciation/fixed-asset-depreciation.reducer';
import fileType from 'app/entities/files/file-type/file-type.reducer';
import fileUpload from 'app/entities/files/file-upload/file-upload.reducer';
import messageToken from 'app/entities/system/message-token/message-token.reducer';
import invoice from 'app/entities/settlement/invoice/invoice.reducer';
import payment from 'app/entities/settlement/payment/payment.reducer';
import dealer from 'app/entities/people/dealer/dealer.reducer';
import paymentCalculation from 'app/entities/settlement/payment-calculation/payment-calculation.reducer';
import paymentRequisition from 'app/entities/settlement/payment-requisition/payment-requisition.reducer';
import taxReference from 'app/entities/tax/tax-reference/tax-reference.reducer';
import taxRule from 'app/entities/tax/tax-rule/tax-rule.reducer';
import paymentCategory from 'app/entities/settlement/payment-category/payment-category.reducer';
import paymentLabel from 'app/entities/settlement/payment-label/payment-label.reducer';
import signedPayment from 'app/entities/settlement/signed-payment/signed-payment.reducer';
import purchaseOrder from 'app/entities/settlement/purchase-order/purchase-order.reducer';
import paymentInvoice from 'app/entities/settlement/payment-invoice/payment-invoice.reducer';
import settlement from 'app/entities/settlement/settlement/settlement.reducer';
import agencyNotice from 'app/entities/tax/agency-notice/agency-notice.reducer';
import depreciationMethod from 'app/entities/assets/depreciation-method/depreciation-method.reducer';
import assetCategory from 'app/entities/assets/asset-category/asset-category.reducer';

import businessStamp from 'app/entities/settlement/business-stamp/business-stamp.reducer';
import deliveryNote from 'app/entities/settlement/delivery-note/delivery-note.reducer';
import jobSheet from 'app/entities/settlement/job-sheet/job-sheet.reducer';
import creditNote from 'app/entities/settlement/credit-note/credit-note.reducer';

import assetRegistration from 'app/entities/assets/asset-registration/asset-registration.reducer';
import workInProgressRegistration from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.reducer';
import workInProgressTransfer from 'app/entities/assets/work-in-progress-transfer/work-in-progress-transfer.reducer';
import workProjectRegister from 'app/entities/assets/work-project-register/work-project-register.reducer';
import transactionAccount from 'app/entities/accounting/transaction-account/transaction-account.reducer';
import prepaymentAccount from 'app/entities/prepayments/prepayment-account/prepayment-account.reducer';
import prepaymentMarshalling from 'app/entities/prepayments/prepayment-marshalling/prepayment-marshalling.reducer';
import prepaymentAmortization from 'app/entities/prepayments/prepayment-amortization/prepayment-amortization.reducer';
import reportTemplate from 'app/entities/reports/report-template/report-template.reducer';
import pdfReportRequisition from 'app/entities/reports/pdf-report-requisition/pdf-report-requisition.reducer';
import xlsxReportRequisition from 'app/entities/reports/xlsx-report-requisition/xlsx-report-requisition.reducer';

import reportRequisition from 'app/entities/reports/report-requisition/report-requisition.reducer';
import systemContentType from 'app/entities/system/system-content-type/system-content-type.reducer';
import reportContentType from 'app/entities/reports/report-content-type/report-content-type.reducer';
import excelReportExport from 'app/entities/reports/excel-report-export/excel-report-export.reducer';
import processStatus from 'app/entities/system/process-status/process-status.reducer';
import reportStatus from 'app/entities/reports/report-status/report-status.reducer';
import algorithm from 'app/entities/system/algorithm/algorithm.reducer';
import securityClearance from 'app/entities/people/security-clearance/security-clearance.reducer';
import applicationUser from 'app/entities/people/application-user/application-user.reducer';
import reportDesign from 'app/entities/reports/report-design/report-design.reducer';
import systemModule from 'app/entities/system/system-module/system-module.reducer';
import prepaymentMapping from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.reducer';
import amortizationRecurrence from 'app/entities/prepayments/amortization-recurrence/amortization-recurrence.reducer';
import amortizationSequence from 'app/entities/prepayments/amortization-sequence/amortization-sequence.reducer';
import questionBase from 'app/entities/system/question-base/question-base.reducer';
import businessDocument from 'app/entities/documentation/business-document/business-document.reducer';
import settlementRequisition from 'app/entities/settlement/settlement-requisition/settlement-requisition.reducer';
import stringQuestionBase from 'app/entities/system/string-question-base/string-question-base.reducer';
import leaseContract from 'app/entities/leases/lease-contract/lease-contract.reducer';
import contractMetadata from 'app/entities/contract/contract-metadata/contract-metadata.reducer';
import leaseModelMetadata from 'app/entities/leases/lease-model-metadata/lease-model-metadata.reducer';
import leaseLiabilityScheduleItem from 'app/entities/leases/lease-liability-schedule-item/lease-liability-schedule-item.reducer';
import assetAccessory from 'app/entities/assets/asset-accessory/asset-accessory.reducer';
import assetWarranty from 'app/entities/assets/asset-warranty/asset-warranty.reducer';
import depreciationPeriod from 'app/entities/assets/depreciation-period/depreciation-period.reducer';
import depreciationEntry from 'app/entities/assets/depreciation-entry/depreciation-entry.reducer';
import depreciationJob from 'app/entities/assets/depreciation-job/depreciation-job.reducer';
import depreciationBatchSequence from 'app/entities/assets/depreciation-batch-sequence/depreciation-batch-sequence.reducer';
import fiscalYear from 'app/entities/system/fiscal-year/fiscal-year.reducer';
import fiscalQuarter from 'app/entities/system/fiscal-quarter/fiscal-quarter.reducer';
import fiscalMonth from 'app/entities/system/fiscal-month/fiscal-month.reducer';
import depreciationJobNotice from 'app/entities/assets/depreciation-job-notice/depreciation-job-notice.reducer';
import universallyUniqueMapping from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import customerIDDocumentType from 'app/entities/gdi/customer-id-document-type/customer-id-document-type.reducer';
import institutionCode from 'app/entities/gdi/institution-code/institution-code.reducer';
import mfbBranchCode from 'app/entities/gdi/mfb-branch-code/mfb-branch-code.reducer';
import isoCountryCode from 'app/entities/gdi/iso-country-code/iso-country-code.reducer';
import subCountyCode from 'app/entities/gdi/sub-county-code/sub-county-code.reducer';
import bankBranchCode from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import outletStatus from 'app/entities/gdi/outlet-status/outlet-status.reducer';
import outletType from 'app/entities/gdi/outlet-type/outlet-type.reducer';
import countyCode from 'app/entities/gdi/county-code/county-code.reducer';
import serviceOutlet from 'app/entities/gdi/service-outlet/service-outlet.reducer';
import settlementCurrency from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';

import customerType from 'app/entities/gdi/customer-type/customer-type.reducer';
import legalStatus from 'app/entities/gdi/legal-status/legal-status.reducer';
import insiderCategoryTypes from 'app/entities/gdi/insider-category-types/insider-category-types.reducer';
import genderType from 'app/entities/gdi/gender-type/gender-type.reducer';
import institutionContactDetails from 'app/entities/gdi/institution-contact-details/institution-contact-details.reducer';
import isicEconomicActivity from 'app/entities/gdi/isic-economic-activity/isic-economic-activity.reducer';
import institutionStatusType from 'app/entities/gdi/institution-status-type/institution-status-type.reducer';
import snaSectorCode from 'app/entities/gdi/sna-sector-code/sna-sector-code.reducer';
import businessSegmentTypes from 'app/entities/gdi/business-segment-types/business-segment-types.reducer';
import isoCurrencyCode from 'app/entities/gdi/iso-currency-code/iso-currency-code.reducer';
import partyRelationType from 'app/entities/gdi/party-relation-type/party-relation-type.reducer';
import contractStatus from 'app/entities/gdi/contract-status/contract-status.reducer';
import accountType from 'app/entities/gdi/account-type/account-type.reducer';
import accountStatusType from 'app/entities/gdi/account-status-type/account-status-type.reducer';
import accountOwnershipType from 'app/entities/gdi/account-ownership-type/account-ownership-type.reducer';
import loanProductType from 'app/entities/gdi/loan-product-type/loan-product-type.reducer';
import loanPerformanceClassification from 'app/entities/gdi/loan-performance-classification/loan-performance-classification.reducer';
import chartOfAccountsCode from 'app/entities/gdi/chart-of-accounts-code/chart-of-accounts-code.reducer';
import loanRepaymentFrequency from 'app/entities/gdi/loan-repayment-frequency/loan-repayment-frequency.reducer';
import glMapping from 'app/entities/gdi/gl-mapping/gl-mapping.reducer';
import moratoriumItem from 'app/entities/gdi/moratorium-item/moratorium-item.reducer';
import collateralType from 'app/entities/gdi/collateral-type/collateral-type.reducer';
import loanApplicationType from 'app/entities/gdi/loan-application-type/loan-application-type.reducer';
import loanApplicationStatus from 'app/entities/gdi/loan-application-status/loan-application-status.reducer';
import loanRestructureItem from 'app/entities/gdi/loan-restructure-item/loan-restructure-item.reducer';
import loanDeclineReason from 'app/entities/gdi/loan-decline-reason/loan-decline-reason.reducer';
import loanRestructureFlag from 'app/entities/gdi/loan-restructure-flag/loan-restructure-flag.reducer';
import cardTypes from 'app/entities/gdi/card-types/card-types.reducer';
import cardBrandType from 'app/entities/gdi/card-brand-type/card-brand-type.reducer';
import cardStatusFlag from 'app/entities/gdi/card-status-flag/card-status-flag.reducer';
import cardCharges from 'app/entities/gdi/card-charges/card-charges.reducer';
import cardCategoryType from 'app/entities/gdi/card-category-type/card-category-type.reducer';
import cardClassType from 'app/entities/gdi/card-class-type/card-class-type.reducer';
import cardPerformanceFlag from 'app/entities/gdi/card-performance-flag/card-performance-flag.reducer';
import terminalFunctions from 'app/entities/gdi/terminal-functions/terminal-functions.reducer';
import terminalTypes from 'app/entities/gdi/terminal-types/terminal-types.reducer';
import customerComplaintStatusType from 'app/entities/gdi/customer-complaint-status-type/customer-complaint-status-type.reducer';
import channelType from 'app/entities/gdi/channel-type/channel-type.reducer';
import fxCustomerType from 'app/entities/gdi/fx-customer-type/fx-customer-type.reducer';
import fxTransactionType from 'app/entities/gdi/fx-transaction-type/fx-transaction-type.reducer';
import fxTransactionRateType from 'app/entities/gdi/fx-transaction-rate-type/fx-transaction-rate-type.reducer';
import fxRateType from 'app/entities/gdi/fx-rate-type/fx-rate-type.reducer';
import fxTransactionChannelType from 'app/entities/gdi/fx-transaction-channel-type/fx-transaction-channel-type.reducer';
import fxReceiptPurposeType from 'app/entities/gdi/fx-receipt-purpose-type/fx-receipt-purpose-type.reducer';
import fraudType from 'app/entities/gdi/fraud-type/fraud-type.reducer';
import fraudCategoryFlag from 'app/entities/gdi/fraud-category-flag/fraud-category-flag.reducer';
import shareholderType from 'app/entities/gdi/shareholder-type/shareholder-type.reducer';
import merchantType from 'app/entities/gdi/merchant-type/merchant-type.reducer';
import cardFraudIncidentCategory from 'app/entities/gdi/card-fraud-incident-category/card-fraud-incident-category.reducer';
import academicQualification from 'app/entities/gdi/academic-qualification/academic-qualification.reducer';
import professionalQualification from 'app/entities/gdi/professional-qualification/professional-qualification.reducer';
import employmentTerms from 'app/entities/gdi/employment-terms/employment-terms.reducer';
import committeeType from 'app/entities/gdi/committee-type/committee-type.reducer';
import executiveCategoryType from 'app/entities/gdi/executive-category-type/executive-category-type.reducer';
import departmentType from 'app/entities/gdi/department-type/department-type.reducer';
import shareHoldingFlag from 'app/entities/gdi/share-holding-flag/share-holding-flag.reducer';
import anticipatedMaturityPeriood from 'app/entities/gdi/anticipated-maturity-periood/anticipated-maturity-periood.reducer';
import interestCalcMethod from 'app/entities/gdi/interest-calc-method/interest-calc-method.reducer';
import securityType from 'app/entities/gdi/security-type/security-type.reducer';
import securityTenure from 'app/entities/gdi/security-tenure/security-tenure.reducer';
import financialDerivativeTypeCode from 'app/entities/gdi/financial-derivative-type-code/financial-derivative-type-code.reducer';
import securityClassificationType from 'app/entities/gdi/security-classification-type/security-classification-type.reducer';
import derivativeSubType from 'app/entities/gdi/derivative-sub-type/derivative-sub-type.reducer';
import derivativeUnderlyingAsset from 'app/entities/gdi/derivative-underlying-asset/derivative-underlying-asset.reducer';
import currencyAuthenticityFlag from 'app/entities/gdi/currency-authenticity-flag/currency-authenticity-flag.reducer';
import kenyanCurrencyDenomination from 'app/entities/gdi/kenyan-currency-denomination/kenyan-currency-denomination.reducer';
import currencyServiceabilityFlag from 'app/entities/gdi/currency-serviceability-flag/currency-serviceability-flag.reducer';
import remittanceFlag from 'app/entities/gdi/remittance-flag/remittance-flag.reducer';
import sourcesOfFundsTypeCode from 'app/entities/gdi/sources-of-funds-type-code/sources-of-funds-type-code.reducer';
import sourceRemittancePurposeType from 'app/entities/gdi/source-remittance-purpose-type/source-remittance-purpose-type.reducer';
import staffCurrentEmploymentStatus from 'app/entities/gdi/staff-current-employment-status/staff-current-employment-status.reducer';
import staffRoleType from 'app/entities/gdi/staff-role-type/staff-role-type.reducer';
import managementMemberType from 'app/entities/gdi/management-member-type/management-member-type.reducer';
import ultimateBeneficiaryTypes from 'app/entities/gdi/ultimate-beneficiary-types/ultimate-beneficiary-types.reducer';
import bouncedChequeCategories from 'app/entities/gdi/bounced-cheque-categories/bounced-cheque-categories.reducer';
import reasonsForBouncedCheque from 'app/entities/gdi/reasons-for-bounced-cheque/reasons-for-bounced-cheque.reducer';
import crbAccountHolderType from 'app/entities/gdi/crb-account-holder-type/crb-account-holder-type.reducer';
import crbAccountStatus from 'app/entities/gdi/crb-account-status/crb-account-status.reducer';
import crbSubmittingInstitutionCategory from 'app/entities/gdi/crb-submitting-institution-category/crb-submitting-institution-category.reducer';
import crbAmountCategoryBand from 'app/entities/gdi/crb-amount-category-band/crb-amount-category-band.reducer';
import crbReportRequestReasons from 'app/entities/gdi/crb-report-request-reasons/crb-report-request-reasons.reducer';
import crbComplaintType from 'app/entities/gdi/crb-complaint-type/crb-complaint-type.reducer';
import crbComplaintStatusType from 'app/entities/gdi/crb-complaint-status-type/crb-complaint-status-type.reducer';
import crbRecordFileType from 'app/entities/gdi/crb-record-file-type/crb-record-file-type.reducer';
import crbCreditApplicationStatus from 'app/entities/gdi/crb-credit-application-status/crb-credit-application-status.reducer';
import crbCustomerType from 'app/entities/gdi/crb-customer-type/crb-customer-type.reducer';
import crbSubscriptionStatusTypeCode from 'app/entities/gdi/crb-subscription-status-type-code/crb-subscription-status-type-code.reducer';
import crbNatureOfInformation from 'app/entities/gdi/crb-nature-of-information/crb-nature-of-information.reducer';
import crbSourceOfInformationType from 'app/entities/gdi/crb-source-of-information-type/crb-source-of-information-type.reducer';
import crbProductServiceFeeType from 'app/entities/gdi/crb-product-service-fee-type/crb-product-service-fee-type.reducer';
import crbFileTransmissionStatus from 'app/entities/gdi/crb-file-transmission-status/crb-file-transmission-status.reducer';
import crbAgentServiceType from 'app/entities/gdi/crb-agent-service-type/crb-agent-service-type.reducer';
import crbCreditFacilityType from 'app/entities/gdi/crb-credit-facility-type/crb-credit-facility-type.reducer';
import crbGlCode from 'app/entities/gdi/crb-gl-code/crb-gl-code.reducer';
import crbAgingBands from 'app/entities/gdi/crb-aging-bands/crb-aging-bands.reducer';
import crbReportViewBand from 'app/entities/gdi/crb-report-view-band/crb-report-view-band.reducer';
import crbDataSubmittingInstitutions from 'app/entities/gdi/crb-data-submitting-institutions/crb-data-submitting-institutions.reducer';
import bankTransactionType from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.reducer';
import agriculturalEnterpriseActivityType from 'app/entities/gdi/agricultural-enterprise-activity-type/agricultural-enterprise-activity-type.reducer';
import interbankSectorCode from 'app/entities/gdi/interbank-sector-code/interbank-sector-code.reducer';
import ultimateBeneficiaryCategory from 'app/entities/gdi/ultimate-beneficiary-category/ultimate-beneficiary-category.reducer';
import issuersOfSecurities from 'app/entities/gdi/issuers-of-securities/issuers-of-securities.reducer';
import loanAccountCategory from 'app/entities/gdi/loan-account-category/loan-account-category.reducer';
import counterpartyType from 'app/entities/gdi/counterparty-type/counterparty-type.reducer';
import counterPartyDealType from 'app/entities/gdi/counter-party-deal-type/counter-party-deal-type.reducer';
import counterPartyCategory from 'app/entities/gdi/counter-party-category/counter-party-category.reducer';
import acquiringIssuingFlag from 'app/entities/gdi/acquiring-issuing-flag/acquiring-issuing-flag.reducer';
import creditCardOwnership from 'app/entities/gdi/credit-card-ownership/credit-card-ownership.reducer';
import categoryOfSecurity from 'app/entities/gdi/category-of-security/category-of-security.reducer';
import natureOfCustomerComplaints from 'app/entities/gdi/nature-of-customer-complaints/nature-of-customer-complaints.reducer';
import gdiMasterDataIndex from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.reducer';
import gdiTransactionDataIndex from 'app/entities/gdi/gdi-transaction-data-index/gdi-transaction-data-index.reducer';
import productType from 'app/entities/gdi/product-type/product-type.reducer';
import accountAttribute from 'app/entities/gdi-data/account-attribute/account-attribute.reducer';
import accountAttributeMetadata from 'app/entities/gdi-data/account-attribute-metadata/account-attribute-metadata.reducer';
import exchangeRate from 'app/entities/gdi-data/exchange-rate/exchange-rate.reducer';
import particularsOfOutlet from 'app/entities/gdi-data/particulars-of-outlet/particulars-of-outlet.reducer';
import weeklyCounterfeitHolding from 'app/entities/gdi-data/weekly-counterfeit-holding/weekly-counterfeit-holding.reducer';
import weeklyCashHolding from 'app/entities/gdi-data/weekly-cash-holding/weekly-cash-holding.reducer';
import countySubCountyCode from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.reducer';
import relatedPartyRelationship from 'app/entities/gdi-data/related-party-relationship/related-party-relationship.reducer';
import terminalsAndPOS from 'app/entities/gdi-data/terminals-and-pos/terminals-and-pos.reducer';
import performanceOfForeignSubsidiaries from 'app/entities/gdi-data/performance-of-foreign-subsidiaries/performance-of-foreign-subsidiaries.reducer';
import accountBalance from 'app/entities/gdi-data/account-balance/account-balance.reducer';
import agentBankingActivity from 'app/entities/gdi-data/agent-banking-activity/agent-banking-activity.reducer';
import cardAcquiringTransaction from 'app/entities/gdi-data/card-acquiring-transaction/card-acquiring-transaction.reducer';
import cardIssuerCharges from 'app/entities/gdi-data/card-issuer-charges/card-issuer-charges.reducer';
import cardFraudInformation from 'app/entities/gdi-data/card-fraud-information/card-fraud-information.reducer';
import cardUsageInformation from 'app/entities/gdi-data/card-usage-information/card-usage-information.reducer';
import collateralInformation from 'app/entities/gdi-data/collateral-information/collateral-information.reducer';
import creditCardFacility from 'app/entities/gdi-data/credit-card-facility/credit-card-facility.reducer';
import cardState from 'app/entities/gdi-data/card-state/card-state.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  placeholder,
  fixedAssetAcquisition,
  fixedAssetNetBookValue,
  fixedAssetDepreciation,
  fileType,
  fileUpload,
  messageToken,
  invoice,
  payment,
  dealer,
  paymentCalculation,
  paymentRequisition,
  taxReference,
  taxRule,
  paymentCategory,
  paymentLabel,
  signedPayment,
  settlementCurrency,
  purchaseOrder,
  paymentInvoice,
  settlement,
  agencyNotice,
  depreciationMethod,
  assetCategory,
  bankBranchCode,
  outletStatus,
  outletType,
  countyCode,
  serviceOutlet,
  businessStamp,
  deliveryNote,
  jobSheet,
  creditNote,
  customerIDDocumentType,
  institutionCode,
  mfbBranchCode,
  isoCountryCode,
  subCountyCode,
  assetRegistration,
  workInProgressRegistration,
  workInProgressTransfer,
  workProjectRegister,
  transactionAccount,
  prepaymentAccount,
  prepaymentMarshalling,
  prepaymentAmortization,
  reportTemplate,
  pdfReportRequisition,
  xlsxReportRequisition,
  universallyUniqueMapping,
  reportRequisition,
  systemContentType,
  reportContentType,
  excelReportExport,
  processStatus,
  reportStatus,
  algorithm,
  securityClearance,
  applicationUser,
  reportDesign,
  systemModule,
  prepaymentMapping,
  amortizationRecurrence,
  amortizationSequence,
  questionBase,
  businessDocument,
  settlementRequisition,
  stringQuestionBase,
  leaseContract,
  contractMetadata,
  leaseModelMetadata,
  leaseLiabilityScheduleItem,
  assetAccessory,
  assetWarranty,
  depreciationPeriod,
  depreciationEntry,
  depreciationJob,
  depreciationBatchSequence,
  fiscalYear,
  fiscalQuarter,
  fiscalMonth,
  depreciationJobNotice,
  customerType,
  legalStatus,
  insiderCategoryTypes,
  genderType,
  institutionContactDetails,
  isicEconomicActivity,
  institutionStatusType,
  snaSectorCode,
  businessSegmentTypes,
  isoCurrencyCode,
  partyRelationType,
  contractStatus,
  accountType,
  accountStatusType,
  accountOwnershipType,
  loanProductType,
  loanPerformanceClassification,
  chartOfAccountsCode,
  loanRepaymentFrequency,
  glMapping,
  moratoriumItem,
  collateralType,
  loanApplicationType,
  loanApplicationStatus,
  loanRestructureItem,
  loanDeclineReason,
  loanRestructureFlag,
  cardTypes,
  cardBrandType,
  cardStatusFlag,
  cardCharges,
  cardCategoryType,
  cardClassType,
  cardPerformanceFlag,
  terminalFunctions,
  terminalTypes,
  customerComplaintStatusType,
  channelType,
  fxCustomerType,
  fxTransactionType,
  fxTransactionRateType,
  fxRateType,
  fxTransactionChannelType,
  fxReceiptPurposeType,
  fraudType,
  fraudCategoryFlag,
  shareholderType,
  merchantType,
  cardFraudIncidentCategory,
  academicQualification,
  professionalQualification,
  employmentTerms,
  committeeType,
  executiveCategoryType,
  departmentType,
  shareHoldingFlag,
  anticipatedMaturityPeriood,
  interestCalcMethod,
  securityType,
  securityTenure,
  financialDerivativeTypeCode,
  securityClassificationType,
  derivativeSubType,
  derivativeUnderlyingAsset,
  currencyAuthenticityFlag,
  kenyanCurrencyDenomination,
  currencyServiceabilityFlag,
  remittanceFlag,
  sourcesOfFundsTypeCode,
  sourceRemittancePurposeType,
  staffCurrentEmploymentStatus,
  staffRoleType,
  managementMemberType,
  ultimateBeneficiaryTypes,
  bouncedChequeCategories,
  reasonsForBouncedCheque,
  crbAccountHolderType,
  crbAccountStatus,
  crbSubmittingInstitutionCategory,
  crbAmountCategoryBand,
  crbReportRequestReasons,
  crbComplaintType,
  crbComplaintStatusType,
  crbRecordFileType,
  crbCreditApplicationStatus,
  crbCustomerType,
  crbSubscriptionStatusTypeCode,
  crbNatureOfInformation,
  crbSourceOfInformationType,
  crbProductServiceFeeType,
  crbFileTransmissionStatus,
  crbAgentServiceType,
  crbCreditFacilityType,
  crbGlCode,
  crbAgingBands,
  crbReportViewBand,
  crbDataSubmittingInstitutions,
  bankTransactionType,
  agriculturalEnterpriseActivityType,
  interbankSectorCode,
  ultimateBeneficiaryCategory,
  issuersOfSecurities,
  loanAccountCategory,
  counterpartyType,
  counterPartyDealType,
  counterPartyCategory,
  acquiringIssuingFlag,
  creditCardOwnership,
  categoryOfSecurity,
  natureOfCustomerComplaints,
  gdiMasterDataIndex,
  gdiTransactionDataIndex,
  productType,
  accountAttribute,
  accountAttributeMetadata,
  exchangeRate,
  particularsOfOutlet,
  weeklyCounterfeitHolding,
  weeklyCashHolding,
  countySubCountyCode,
  relatedPartyRelationship,
  terminalsAndPOS,
  performanceOfForeignSubsidiaries,
  accountBalance,
  agentBankingActivity,
  cardAcquiringTransaction,
  cardIssuerCharges,
  cardFraudInformation,
  cardUsageInformation,
  collateralInformation,
  creditCardFacility,
  cardState,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
