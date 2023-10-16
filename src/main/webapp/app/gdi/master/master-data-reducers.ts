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

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

import customerIDDocumentType from './customer-id-document-type/customer-id-document-type.reducer';
import institutionCode from './institution-code/institution-code.reducer';
import mfbBranchCode from './mfb-branch-code/mfb-branch-code.reducer';
import isoCountryCode from './iso-country-code/iso-country-code.reducer';
import subCountyCode from './sub-county-code/sub-county-code.reducer';
import bankBranchCode from './bank-branch-code/bank-branch-code.reducer';
import outletStatus from './outlet-status/outlet-status.reducer';
import outletType from './outlet-type/outlet-type.reducer';
import countyCode from './county-code/county-code.reducer';
import settlementCurrency from './settlement-currency/settlement-currency.reducer';
import customerType from './customer-type/customer-type.reducer';
import legalStatus from './legal-status/legal-status.reducer';
import insiderCategoryTypes from './insider-category-types/insider-category-types.reducer';
import genderType from './gender-type/gender-type.reducer';
import institutionContactDetails from './institution-contact-details/institution-contact-details.reducer';
import isicEconomicActivity from './isic-economic-activity/isic-economic-activity.reducer';
import institutionStatusType from './institution-status-type/institution-status-type.reducer';
import snaSectorCode from './sna-sector-code/sna-sector-code.reducer';
import businessSegmentTypes from './business-segment-types/business-segment-types.reducer';
import isoCurrencyCode from './iso-currency-code/iso-currency-code.reducer';
import partyRelationType from './party-relation-type/party-relation-type.reducer';
import contractStatus from './contract-status/contract-status.reducer';
import accountType from './account-type/account-type.reducer';
import accountStatusType from './account-status-type/account-status-type.reducer';
import accountOwnershipType from './account-ownership-type/account-ownership-type.reducer';
import loanProductType from './loan-product-type/loan-product-type.reducer';
import loanPerformanceClassification from './loan-performance-classification/loan-performance-classification.reducer';
import chartOfAccountsCode from './chart-of-accounts-code/chart-of-accounts-code.reducer';
import loanRepaymentFrequency from './loan-repayment-frequency/loan-repayment-frequency.reducer';
import glMapping from './gl-mapping/gl-mapping.reducer';
import moratoriumItem from './moratorium-item/moratorium-item.reducer';
import collateralType from './collateral-type/collateral-type.reducer';
import loanApplicationType from './loan-application-type/loan-application-type.reducer';
import loanApplicationStatus from './loan-application-status/loan-application-status.reducer';
import loanRestructureItem from './loan-restructure-item/loan-restructure-item.reducer';
import loanDeclineReason from './loan-decline-reason/loan-decline-reason.reducer';
import loanRestructureFlag from './loan-restructure-flag/loan-restructure-flag.reducer';
import cardTypes from './card-types/card-types.reducer';
import cardBrandType from './card-brand-type/card-brand-type.reducer';
import cardStatusFlag from './card-status-flag/card-status-flag.reducer';
import cardCharges from './card-charges/card-charges.reducer';
import cardCategoryType from './card-category-type/card-category-type.reducer';
import cardClassType from './card-class-type/card-class-type.reducer';
import cardPerformanceFlag from './card-performance-flag/card-performance-flag.reducer';
import terminalFunctions from './terminal-functions/terminal-functions.reducer';
import terminalTypes from './terminal-types/terminal-types.reducer';
import customerComplaintStatusType from './customer-complaint-status-type/customer-complaint-status-type.reducer';
import channelType from './channel-type/channel-type.reducer';
import fxCustomerType from './fx-customer-type/fx-customer-type.reducer';
import fxTransactionType from './fx-transaction-type/fx-transaction-type.reducer';
import fxTransactionRateType from './fx-transaction-rate-type/fx-transaction-rate-type.reducer';
import fxRateType from './fx-rate-type/fx-rate-type.reducer';
import fxTransactionChannelType from './fx-transaction-channel-type/fx-transaction-channel-type.reducer';
import fxReceiptPurposeType from './fx-receipt-purpose-type/fx-receipt-purpose-type.reducer';
import fraudType from './fraud-type/fraud-type.reducer';
import fraudCategoryFlag from './fraud-category-flag/fraud-category-flag.reducer';
import shareholderType from './shareholder-type/shareholder-type.reducer';
import merchantType from './merchant-type/merchant-type.reducer';
import cardFraudIncidentCategory from './card-fraud-incident-category/card-fraud-incident-category.reducer';
import academicQualification from './academic-qualification/academic-qualification.reducer';
import professionalQualification from './professional-qualification/professional-qualification.reducer';
import employmentTerms from './employment-terms/employment-terms.reducer';
import committeeType from './committee-type/committee-type.reducer';
import executiveCategoryType from './executive-category-type/executive-category-type.reducer';
import departmentType from './department-type/department-type.reducer';
import shareHoldingFlag from './share-holding-flag/share-holding-flag.reducer';
import anticipatedMaturityPeriood from './anticipated-maturity-periood/anticipated-maturity-periood.reducer';
import interestCalcMethod from './interest-calc-method/interest-calc-method.reducer';
import securityType from './security-type/security-type.reducer';
import securityTenure from './security-tenure/security-tenure.reducer';
import financialDerivativeTypeCode from './financial-derivative-type-code/financial-derivative-type-code.reducer';
import securityClassificationType from './security-classification-type/security-classification-type.reducer';
import derivativeSubType from './derivative-sub-type/derivative-sub-type.reducer';
import derivativeUnderlyingAsset from './derivative-underlying-asset/derivative-underlying-asset.reducer';
import currencyAuthenticityFlag from './currency-authenticity-flag/currency-authenticity-flag.reducer';
import kenyanCurrencyDenomination from './kenyan-currency-denomination/kenyan-currency-denomination.reducer';
import currencyServiceabilityFlag from './currency-serviceability-flag/currency-serviceability-flag.reducer';
import remittanceFlag from './remittance-flag/remittance-flag.reducer';
import sourcesOfFundsTypeCode from './sources-of-funds-type-code/sources-of-funds-type-code.reducer';
import sourceRemittancePurposeType from './source-remittance-purpose-type/source-remittance-purpose-type.reducer';
import staffCurrentEmploymentStatus from './staff-current-employment-status/staff-current-employment-status.reducer';
import staffRoleType from './staff-role-type/staff-role-type.reducer';
import managementMemberType from './management-member-type/management-member-type.reducer';
import ultimateBeneficiaryTypes from './ultimate-beneficiary-types/ultimate-beneficiary-types.reducer';
import bouncedChequeCategories from './bounced-cheque-categories/bounced-cheque-categories.reducer';
import reasonsForBouncedCheque from './reasons-for-bounced-cheque/reasons-for-bounced-cheque.reducer';
import crbAccountHolderType from './crb-account-holder-type/crb-account-holder-type.reducer';
import crbAccountStatus from './crb-account-status/crb-account-status.reducer';
import crbSubmittingInstitutionCategory from './crb-submitting-institution-category/crb-submitting-institution-category.reducer';
import crbAmountCategoryBand from './crb-amount-category-band/crb-amount-category-band.reducer';
import crbReportRequestReasons from './crb-report-request-reasons/crb-report-request-reasons.reducer';
import crbComplaintType from './crb-complaint-type/crb-complaint-type.reducer';
import crbComplaintStatusType from './crb-complaint-status-type/crb-complaint-status-type.reducer';
import crbRecordFileType from './crb-record-file-type/crb-record-file-type.reducer';
import crbCreditApplicationStatus from './crb-credit-application-status/crb-credit-application-status.reducer';
import crbCustomerType from './crb-customer-type/crb-customer-type.reducer';
import crbSubscriptionStatusTypeCode from './crb-subscription-status-type-code/crb-subscription-status-type-code.reducer';
import crbNatureOfInformation from './crb-nature-of-information/crb-nature-of-information.reducer';
import crbSourceOfInformationType from './crb-source-of-information-type/crb-source-of-information-type.reducer';
import crbProductServiceFeeType from './crb-product-service-fee-type/crb-product-service-fee-type.reducer';
import crbFileTransmissionStatus from './crb-file-transmission-status/crb-file-transmission-status.reducer';
import crbAgentServiceType from './crb-agent-service-type/crb-agent-service-type.reducer';
import crbCreditFacilityType from './crb-credit-facility-type/crb-credit-facility-type.reducer';
import crbGlCode from './crb-gl-code/crb-gl-code.reducer';
import crbAgingBands from './crb-aging-bands/crb-aging-bands.reducer';
import crbReportViewBand from './crb-report-view-band/crb-report-view-band.reducer';
import crbDataSubmittingInstitutions from './crb-data-submitting-institutions/crb-data-submitting-institutions.reducer';
import bankTransactionType from './bank-transaction-type/bank-transaction-type.reducer';
import agriculturalEnterpriseActivityType from './agricultural-enterprise-activity-type/agricultural-enterprise-activity-type.reducer';
import interbankSectorCode from './interbank-sector-code/interbank-sector-code.reducer';
import ultimateBeneficiaryCategory from './ultimate-beneficiary-category/ultimate-beneficiary-category.reducer';
import issuersOfSecurities from './issuers-of-securities/issuers-of-securities.reducer';
import loanAccountCategory from './loan-account-category/loan-account-category.reducer';
import counterpartyType from './counterparty-type/counterparty-type.reducer';
import counterPartyDealType from './counter-party-deal-type/counter-party-deal-type.reducer';
import counterPartyCategory from './counter-party-category/counter-party-category.reducer';
import acquiringIssuingFlag from './acquiring-issuing-flag/acquiring-issuing-flag.reducer';
import creditCardOwnership from './credit-card-ownership/credit-card-ownership.reducer';
import categoryOfSecurity from './category-of-security/category-of-security.reducer';
import natureOfCustomerComplaints from './nature-of-customer-complaints/nature-of-customer-complaints.reducer';
import productType from './product-type/product-type.reducer';

const masterDataReducers = {
  bankBranchCode,
  outletStatus,
  outletType,
  countyCode,
  customerIDDocumentType,
  institutionCode,
  mfbBranchCode,
  isoCountryCode,
  subCountyCode,
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
  settlementCurrency,
  customerType,
  productType,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default masterDataReducers;
