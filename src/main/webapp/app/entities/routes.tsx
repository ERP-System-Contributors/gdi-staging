import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Placeholder from './system/placeholder';
import FixedAssetAcquisition from './assets/fixed-asset-acquisition';
import FixedAssetNetBookValue from './assets/fixed-asset-net-book-value';
import FixedAssetDepreciation from './assets/fixed-asset-depreciation';
import FileType from './files/file-type';
import FileUpload from './files/file-upload';
import MessageToken from './system/message-token';
import Invoice from './settlement/invoice';
import Payment from './settlement/payment';
import Dealer from './people/dealer';
import PaymentCalculation from './settlement/payment-calculation';
import PaymentRequisition from './settlement/payment-requisition';
import TaxReference from './tax/tax-reference';
import TaxRule from './tax/tax-rule';
import PaymentCategory from './settlement/payment-category';
import PaymentLabel from './settlement/payment-label';
import SignedPayment from './settlement/signed-payment';
import SettlementCurrency from './gdi/settlement-currency';
import PurchaseOrder from './settlement/purchase-order';
import PaymentInvoice from './settlement/payment-invoice';
import Settlement from './settlement/settlement';
import AgencyNotice from './tax/agency-notice';
import DepreciationMethod from './assets/depreciation-method';
import AssetCategory from './assets/asset-category';
import BankBranchCode from './gdi/bank-branch-code';
import OutletStatus from './gdi/outlet-status';
import OutletType from './gdi/outlet-type';
import CountyCode from './gdi/county-code';
import ServiceOutlet from './gdi/service-outlet';
import BusinessStamp from './settlement/business-stamp';
import DeliveryNote from './settlement/delivery-note';
import JobSheet from './settlement/job-sheet';
import CreditNote from './settlement/credit-note';
import CustomerIDDocumentType from './gdi/customer-id-document-type';
import InstitutionCode from './gdi/institution-code';
import MfbBranchCode from './gdi/mfb-branch-code';
import IsoCountryCode from './gdi/iso-country-code';
import SubCountyCode from './gdi/sub-county-code';
import AssetRegistration from './assets/asset-registration';
import WorkInProgressRegistration from './assets/work-in-progress-registration';
import WorkInProgressTransfer from './assets/work-in-progress-transfer';
import WorkProjectRegister from './assets/work-project-register';
import TransactionAccount from './accounting/transaction-account';
import PrepaymentAccount from './prepayments/prepayment-account';
import PrepaymentMarshalling from './prepayments/prepayment-marshalling';
import PrepaymentAmortization from './prepayments/prepayment-amortization';
import ReportTemplate from './reports/report-template';
import PdfReportRequisition from './reports/pdf-report-requisition';
import XlsxReportRequisition from './reports/xlsx-report-requisition';
import UniversallyUniqueMapping from './gdi/universally-unique-mapping';
import ReportRequisition from './reports/report-requisition';
import SystemContentType from './system/system-content-type';
import ReportContentType from './reports/report-content-type';
import ExcelReportExport from './reports/excel-report-export';
import ProcessStatus from './system/process-status';
import ReportStatus from './reports/report-status';
import Algorithm from './system/algorithm';
import SecurityClearance from './people/security-clearance';
import ApplicationUser from './people/application-user';
import ReportDesign from './reports/report-design';
import SystemModule from './system/system-module';
import PrepaymentMapping from './prepayments/prepayment-mapping';
import AmortizationRecurrence from './prepayments/amortization-recurrence';
import AmortizationSequence from './prepayments/amortization-sequence';
import QuestionBase from './system/question-base';
import BusinessDocument from './documentation/business-document';
import SettlementRequisition from './settlement/settlement-requisition';
import StringQuestionBase from './system/string-question-base';
import LeaseContract from './leases/lease-contract';
import ContractMetadata from './contract/contract-metadata';
import LeaseModelMetadata from './leases/lease-model-metadata';
import LeaseLiabilityScheduleItem from './leases/lease-liability-schedule-item';
import AssetAccessory from './assets/asset-accessory';
import AssetWarranty from './assets/asset-warranty';
import DepreciationPeriod from './assets/depreciation-period';
import DepreciationEntry from './assets/depreciation-entry';
import DepreciationJob from './assets/depreciation-job';
import DepreciationBatchSequence from './assets/depreciation-batch-sequence';
import FiscalYear from './system/fiscal-year';
import FiscalQuarter from './system/fiscal-quarter';
import FiscalMonth from './system/fiscal-month';
import DepreciationJobNotice from './assets/depreciation-job-notice';
import CustomerType from './gdi/customer-type';
import LegalStatus from './gdi/legal-status';
import InsiderCategoryTypes from './gdi/insider-category-types';
import GenderType from './gdi/gender-type';
import InstitutionContactDetails from './gdi/institution-contact-details';
import IsicEconomicActivity from './gdi/isic-economic-activity';
import InstitutionStatusType from './gdi/institution-status-type';
import SnaSectorCode from './gdi/sna-sector-code';
import BusinessSegmentTypes from './gdi/business-segment-types';
import IsoCurrencyCode from './gdi/iso-currency-code';
import PartyRelationType from './gdi/party-relation-type';
import ContractStatus from './gdi/contract-status';
import AccountType from './gdi/account-type';
import AccountStatusType from './gdi/account-status-type';
import AccountOwnershipType from './gdi/account-ownership-type';
import LoanProductType from './gdi/loan-product-type';
import LoanPerformanceClassification from './gdi/loan-performance-classification';
import ChartOfAccountsCode from './gdi/chart-of-accounts-code';
import LoanRepaymentFrequency from './gdi/loan-repayment-frequency';
import GlMapping from './gdi/gl-mapping';
import MoratoriumItem from './gdi/moratorium-item';
import CollateralType from './gdi/collateral-type';
import LoanApplicationType from './gdi/loan-application-type';
import LoanApplicationStatus from './gdi/loan-application-status';
import LoanRestructureItem from './gdi/loan-restructure-item';
import LoanDeclineReason from './gdi/loan-decline-reason';
import LoanRestructureFlag from './gdi/loan-restructure-flag';
import CardTypes from './gdi/card-types';
import CardBrandType from './gdi/card-brand-type';
import CardStatusFlag from './gdi/card-status-flag';
import CardCharges from './gdi/card-charges';
import CardCategoryType from './gdi/card-category-type';
import CardClassType from './gdi/card-class-type';
import CardPerformanceFlag from './gdi/card-performance-flag';
import TerminalFunctions from './gdi/terminal-functions';
import TerminalTypes from './gdi/terminal-types';
import CustomerComplaintStatusType from './gdi/customer-complaint-status-type';
import ChannelType from './gdi/channel-type';
import FxCustomerType from './gdi/fx-customer-type';
import FxTransactionType from './gdi/fx-transaction-type';
import FxTransactionRateType from './gdi/fx-transaction-rate-type';
import FxRateType from './gdi/fx-rate-type';
import FxTransactionChannelType from './gdi/fx-transaction-channel-type';
import FxReceiptPurposeType from './gdi/fx-receipt-purpose-type';
import FraudType from './gdi/fraud-type';
import FraudCategoryFlag from './gdi/fraud-category-flag';
import ShareholderType from './gdi/shareholder-type';
import MerchantType from './gdi/merchant-type';
import CardFraudIncidentCategory from './gdi/card-fraud-incident-category';
import AcademicQualification from './gdi/academic-qualification';
import ProfessionalQualification from './gdi/professional-qualification';
import EmploymentTerms from './gdi/employment-terms';
import CommitteeType from './gdi/committee-type';
import ExecutiveCategoryType from './gdi/executive-category-type';
import DepartmentType from './gdi/department-type';
import ShareHoldingFlag from './gdi/share-holding-flag';
import AnticipatedMaturityPeriood from './gdi/anticipated-maturity-periood';
import InterestCalcMethod from './gdi/interest-calc-method';
import SecurityType from './gdi/security-type';
import SecurityTenure from './gdi/security-tenure';
import FinancialDerivativeTypeCode from './gdi/financial-derivative-type-code';
import SecurityClassificationType from './gdi/security-classification-type';
import DerivativeSubType from './gdi/derivative-sub-type';
import DerivativeUnderlyingAsset from './gdi/derivative-underlying-asset';
import CurrencyAuthenticityFlag from './gdi/currency-authenticity-flag';
import KenyanCurrencyDenomination from './gdi/kenyan-currency-denomination';
import CurrencyServiceabilityFlag from './gdi/currency-serviceability-flag';
import RemittanceFlag from './gdi/remittance-flag';
import SourcesOfFundsTypeCode from './gdi/sources-of-funds-type-code';
import SourceRemittancePurposeType from './gdi/source-remittance-purpose-type';
import StaffCurrentEmploymentStatus from './gdi/staff-current-employment-status';
import StaffRoleType from './gdi/staff-role-type';
import ManagementMemberType from './gdi/management-member-type';
import UltimateBeneficiaryTypes from './gdi/ultimate-beneficiary-types';
import BouncedChequeCategories from './gdi/bounced-cheque-categories';
import ReasonsForBouncedCheque from './gdi/reasons-for-bounced-cheque';
import CrbAccountHolderType from './gdi/crb-account-holder-type';
import CrbAccountStatus from './gdi/crb-account-status';
import CrbSubmittingInstitutionCategory from './gdi/crb-submitting-institution-category';
import CrbAmountCategoryBand from './gdi/crb-amount-category-band';
import CrbReportRequestReasons from './gdi/crb-report-request-reasons';
import CrbComplaintType from './gdi/crb-complaint-type';
import CrbComplaintStatusType from './gdi/crb-complaint-status-type';
import CrbRecordFileType from './gdi/crb-record-file-type';
import CrbCreditApplicationStatus from './gdi/crb-credit-application-status';
import CrbCustomerType from './gdi/crb-customer-type';
import CrbSubscriptionStatusTypeCode from './gdi/crb-subscription-status-type-code';
import CrbNatureOfInformation from './gdi/crb-nature-of-information';
import CrbSourceOfInformationType from './gdi/crb-source-of-information-type';
import CrbProductServiceFeeType from './gdi/crb-product-service-fee-type';
import CrbFileTransmissionStatus from './gdi/crb-file-transmission-status';
import CrbAgentServiceType from './gdi/crb-agent-service-type';
import CrbCreditFacilityType from './gdi/crb-credit-facility-type';
import CrbGlCode from './gdi/crb-gl-code';
import CrbAgingBands from './gdi/crb-aging-bands';
import CrbReportViewBand from './gdi/crb-report-view-band';
import CrbDataSubmittingInstitutions from './gdi/crb-data-submitting-institutions';
import BankTransactionType from './gdi/bank-transaction-type';
import AgriculturalEnterpriseActivityType from './gdi/agricultural-enterprise-activity-type';
import InterbankSectorCode from './gdi/interbank-sector-code';
import UltimateBeneficiaryCategory from './gdi/ultimate-beneficiary-category';
import IssuersOfSecurities from './gdi/issuers-of-securities';
import LoanAccountCategory from './gdi/loan-account-category';
import CounterpartyType from './gdi/counterparty-type';
import CounterPartyDealType from './gdi/counter-party-deal-type';
import CounterPartyCategory from './gdi/counter-party-category';
import AcquiringIssuingFlag from './gdi/acquiring-issuing-flag';
import CreditCardOwnership from './gdi/credit-card-ownership';
import CategoryOfSecurity from './gdi/category-of-security';
import NatureOfCustomerComplaints from './gdi/nature-of-customer-complaints';
import GdiMasterDataIndex from './gdi/gdi-master-data-index';
import GdiTransactionDataIndex from './gdi/gdi-transaction-data-index';
import ProductType from './gdi/product-type';
import AccountAttribute from './gdi-data/account-attribute';
import AccountAttributeMetadata from './gdi-data/account-attribute-metadata';
import ExchangeRate from './gdi-data/exchange-rate';
import ParticularsOfOutlet from './gdi-data/particulars-of-outlet';
import WeeklyCounterfeitHolding from './gdi-data/weekly-counterfeit-holding';
import WeeklyCashHolding from './gdi-data/weekly-cash-holding';
import CountySubCountyCode from './gdi-data/county-sub-county-code';
import RelatedPartyRelationship from './gdi-data/related-party-relationship';
import TerminalsAndPOS from './gdi-data/terminals-and-pos';
import PerformanceOfForeignSubsidiaries from './gdi-data/performance-of-foreign-subsidiaries';
import AccountBalance from './gdi-data/account-balance';
import AgentBankingActivity from './gdi-data/agent-banking-activity';
import CardAcquiringTransaction from './gdi-data/card-acquiring-transaction';
import CardIssuerCharges from './gdi-data/card-issuer-charges';
import CardFraudInformation from './gdi-data/card-fraud-information';
import CardUsageInformation from './gdi-data/card-usage-information';
import CollateralInformation from './gdi-data/collateral-information';
import CreditCardFacility from './gdi-data/credit-card-facility';
import CardState from './gdi-data/card-state';
import BusinessTeam from './people/business-team';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="placeholder/*" element={<Placeholder />} />
        <Route path="fixed-asset-acquisition/*" element={<FixedAssetAcquisition />} />
        <Route path="fixed-asset-net-book-value/*" element={<FixedAssetNetBookValue />} />
        <Route path="fixed-asset-depreciation/*" element={<FixedAssetDepreciation />} />
        <Route path="file-type/*" element={<FileType />} />
        <Route path="file-upload/*" element={<FileUpload />} />
        <Route path="message-token/*" element={<MessageToken />} />
        <Route path="invoice/*" element={<Invoice />} />
        <Route path="payment/*" element={<Payment />} />
        <Route path="dealer/*" element={<Dealer />} />
        <Route path="payment-calculation/*" element={<PaymentCalculation />} />
        <Route path="payment-requisition/*" element={<PaymentRequisition />} />
        <Route path="tax-reference/*" element={<TaxReference />} />
        <Route path="tax-rule/*" element={<TaxRule />} />
        <Route path="payment-category/*" element={<PaymentCategory />} />
        <Route path="payment-label/*" element={<PaymentLabel />} />
        <Route path="signed-payment/*" element={<SignedPayment />} />
        <Route path="settlement-currency/*" element={<SettlementCurrency />} />
        <Route path="purchase-order/*" element={<PurchaseOrder />} />
        <Route path="payment-invoice/*" element={<PaymentInvoice />} />
        <Route path="settlement/*" element={<Settlement />} />
        <Route path="agency-notice/*" element={<AgencyNotice />} />
        <Route path="depreciation-method/*" element={<DepreciationMethod />} />
        <Route path="asset-category/*" element={<AssetCategory />} />
        <Route path="bank-branch-code/*" element={<BankBranchCode />} />
        <Route path="outlet-status/*" element={<OutletStatus />} />
        <Route path="outlet-type/*" element={<OutletType />} />
        <Route path="county-code/*" element={<CountyCode />} />
        <Route path="service-outlet/*" element={<ServiceOutlet />} />
        <Route path="business-stamp/*" element={<BusinessStamp />} />
        <Route path="delivery-note/*" element={<DeliveryNote />} />
        <Route path="job-sheet/*" element={<JobSheet />} />
        <Route path="credit-note/*" element={<CreditNote />} />
        <Route path="customer-id-document-type/*" element={<CustomerIDDocumentType />} />
        <Route path="institution-code/*" element={<InstitutionCode />} />
        <Route path="mfb-branch-code/*" element={<MfbBranchCode />} />
        <Route path="iso-country-code/*" element={<IsoCountryCode />} />
        <Route path="sub-county-code/*" element={<SubCountyCode />} />
        <Route path="asset-registration/*" element={<AssetRegistration />} />
        <Route path="work-in-progress-registration/*" element={<WorkInProgressRegistration />} />
        <Route path="work-in-progress-transfer/*" element={<WorkInProgressTransfer />} />
        <Route path="work-project-register/*" element={<WorkProjectRegister />} />
        <Route path="transaction-account/*" element={<TransactionAccount />} />
        <Route path="prepayment-account/*" element={<PrepaymentAccount />} />
        <Route path="prepayment-marshalling/*" element={<PrepaymentMarshalling />} />
        <Route path="prepayment-amortization/*" element={<PrepaymentAmortization />} />
        <Route path="report-template/*" element={<ReportTemplate />} />
        <Route path="pdf-report-requisition/*" element={<PdfReportRequisition />} />
        <Route path="xlsx-report-requisition/*" element={<XlsxReportRequisition />} />
        <Route path="universally-unique-mapping/*" element={<UniversallyUniqueMapping />} />
        <Route path="report-requisition/*" element={<ReportRequisition />} />
        <Route path="system-content-type/*" element={<SystemContentType />} />
        <Route path="report-content-type/*" element={<ReportContentType />} />
        <Route path="excel-report-export/*" element={<ExcelReportExport />} />
        <Route path="process-status/*" element={<ProcessStatus />} />
        <Route path="report-status/*" element={<ReportStatus />} />
        <Route path="algorithm/*" element={<Algorithm />} />
        <Route path="security-clearance/*" element={<SecurityClearance />} />
        <Route path="application-user/*" element={<ApplicationUser />} />
        <Route path="report-design/*" element={<ReportDesign />} />
        <Route path="system-module/*" element={<SystemModule />} />
        <Route path="prepayment-mapping/*" element={<PrepaymentMapping />} />
        <Route path="amortization-recurrence/*" element={<AmortizationRecurrence />} />
        <Route path="amortization-sequence/*" element={<AmortizationSequence />} />
        <Route path="question-base/*" element={<QuestionBase />} />
        <Route path="business-document/*" element={<BusinessDocument />} />
        <Route path="settlement-requisition/*" element={<SettlementRequisition />} />
        <Route path="string-question-base/*" element={<StringQuestionBase />} />
        <Route path="lease-contract/*" element={<LeaseContract />} />
        <Route path="contract-metadata/*" element={<ContractMetadata />} />
        <Route path="lease-model-metadata/*" element={<LeaseModelMetadata />} />
        <Route path="lease-liability-schedule-item/*" element={<LeaseLiabilityScheduleItem />} />
        <Route path="asset-accessory/*" element={<AssetAccessory />} />
        <Route path="asset-warranty/*" element={<AssetWarranty />} />
        <Route path="depreciation-period/*" element={<DepreciationPeriod />} />
        <Route path="depreciation-entry/*" element={<DepreciationEntry />} />
        <Route path="depreciation-job/*" element={<DepreciationJob />} />
        <Route path="depreciation-batch-sequence/*" element={<DepreciationBatchSequence />} />
        <Route path="fiscal-year/*" element={<FiscalYear />} />
        <Route path="fiscal-quarter/*" element={<FiscalQuarter />} />
        <Route path="fiscal-month/*" element={<FiscalMonth />} />
        <Route path="depreciation-job-notice/*" element={<DepreciationJobNotice />} />
        <Route path="customer-type/*" element={<CustomerType />} />
        <Route path="legal-status/*" element={<LegalStatus />} />
        <Route path="insider-category-types/*" element={<InsiderCategoryTypes />} />
        <Route path="gender-type/*" element={<GenderType />} />
        <Route path="institution-contact-details/*" element={<InstitutionContactDetails />} />
        <Route path="isic-economic-activity/*" element={<IsicEconomicActivity />} />
        <Route path="institution-status-type/*" element={<InstitutionStatusType />} />
        <Route path="sna-sector-code/*" element={<SnaSectorCode />} />
        <Route path="business-segment-types/*" element={<BusinessSegmentTypes />} />
        <Route path="iso-currency-code/*" element={<IsoCurrencyCode />} />
        <Route path="party-relation-type/*" element={<PartyRelationType />} />
        <Route path="contract-status/*" element={<ContractStatus />} />
        <Route path="account-type/*" element={<AccountType />} />
        <Route path="account-status-type/*" element={<AccountStatusType />} />
        <Route path="account-ownership-type/*" element={<AccountOwnershipType />} />
        <Route path="loan-product-type/*" element={<LoanProductType />} />
        <Route path="loan-performance-classification/*" element={<LoanPerformanceClassification />} />
        <Route path="chart-of-accounts-code/*" element={<ChartOfAccountsCode />} />
        <Route path="loan-repayment-frequency/*" element={<LoanRepaymentFrequency />} />
        <Route path="gl-mapping/*" element={<GlMapping />} />
        <Route path="moratorium-item/*" element={<MoratoriumItem />} />
        <Route path="collateral-type/*" element={<CollateralType />} />
        <Route path="loan-application-type/*" element={<LoanApplicationType />} />
        <Route path="loan-application-status/*" element={<LoanApplicationStatus />} />
        <Route path="loan-restructure-item/*" element={<LoanRestructureItem />} />
        <Route path="loan-decline-reason/*" element={<LoanDeclineReason />} />
        <Route path="loan-restructure-flag/*" element={<LoanRestructureFlag />} />
        <Route path="card-types/*" element={<CardTypes />} />
        <Route path="card-brand-type/*" element={<CardBrandType />} />
        <Route path="card-status-flag/*" element={<CardStatusFlag />} />
        <Route path="card-charges/*" element={<CardCharges />} />
        <Route path="card-category-type/*" element={<CardCategoryType />} />
        <Route path="card-class-type/*" element={<CardClassType />} />
        <Route path="card-performance-flag/*" element={<CardPerformanceFlag />} />
        <Route path="terminal-functions/*" element={<TerminalFunctions />} />
        <Route path="terminal-types/*" element={<TerminalTypes />} />
        <Route path="customer-complaint-status-type/*" element={<CustomerComplaintStatusType />} />
        <Route path="channel-type/*" element={<ChannelType />} />
        <Route path="fx-customer-type/*" element={<FxCustomerType />} />
        <Route path="fx-transaction-type/*" element={<FxTransactionType />} />
        <Route path="fx-transaction-rate-type/*" element={<FxTransactionRateType />} />
        <Route path="fx-rate-type/*" element={<FxRateType />} />
        <Route path="fx-transaction-channel-type/*" element={<FxTransactionChannelType />} />
        <Route path="fx-receipt-purpose-type/*" element={<FxReceiptPurposeType />} />
        <Route path="fraud-type/*" element={<FraudType />} />
        <Route path="fraud-category-flag/*" element={<FraudCategoryFlag />} />
        <Route path="shareholder-type/*" element={<ShareholderType />} />
        <Route path="merchant-type/*" element={<MerchantType />} />
        <Route path="card-fraud-incident-category/*" element={<CardFraudIncidentCategory />} />
        <Route path="academic-qualification/*" element={<AcademicQualification />} />
        <Route path="professional-qualification/*" element={<ProfessionalQualification />} />
        <Route path="employment-terms/*" element={<EmploymentTerms />} />
        <Route path="committee-type/*" element={<CommitteeType />} />
        <Route path="executive-category-type/*" element={<ExecutiveCategoryType />} />
        <Route path="department-type/*" element={<DepartmentType />} />
        <Route path="share-holding-flag/*" element={<ShareHoldingFlag />} />
        <Route path="anticipated-maturity-periood/*" element={<AnticipatedMaturityPeriood />} />
        <Route path="interest-calc-method/*" element={<InterestCalcMethod />} />
        <Route path="security-type/*" element={<SecurityType />} />
        <Route path="security-tenure/*" element={<SecurityTenure />} />
        <Route path="financial-derivative-type-code/*" element={<FinancialDerivativeTypeCode />} />
        <Route path="security-classification-type/*" element={<SecurityClassificationType />} />
        <Route path="derivative-sub-type/*" element={<DerivativeSubType />} />
        <Route path="derivative-underlying-asset/*" element={<DerivativeUnderlyingAsset />} />
        <Route path="currency-authenticity-flag/*" element={<CurrencyAuthenticityFlag />} />
        <Route path="kenyan-currency-denomination/*" element={<KenyanCurrencyDenomination />} />
        <Route path="currency-serviceability-flag/*" element={<CurrencyServiceabilityFlag />} />
        <Route path="remittance-flag/*" element={<RemittanceFlag />} />
        <Route path="sources-of-funds-type-code/*" element={<SourcesOfFundsTypeCode />} />
        <Route path="source-remittance-purpose-type/*" element={<SourceRemittancePurposeType />} />
        <Route path="staff-current-employment-status/*" element={<StaffCurrentEmploymentStatus />} />
        <Route path="staff-role-type/*" element={<StaffRoleType />} />
        <Route path="management-member-type/*" element={<ManagementMemberType />} />
        <Route path="ultimate-beneficiary-types/*" element={<UltimateBeneficiaryTypes />} />
        <Route path="bounced-cheque-categories/*" element={<BouncedChequeCategories />} />
        <Route path="reasons-for-bounced-cheque/*" element={<ReasonsForBouncedCheque />} />
        <Route path="crb-account-holder-type/*" element={<CrbAccountHolderType />} />
        <Route path="crb-account-status/*" element={<CrbAccountStatus />} />
        <Route path="crb-submitting-institution-category/*" element={<CrbSubmittingInstitutionCategory />} />
        <Route path="crb-amount-category-band/*" element={<CrbAmountCategoryBand />} />
        <Route path="crb-report-request-reasons/*" element={<CrbReportRequestReasons />} />
        <Route path="crb-complaint-type/*" element={<CrbComplaintType />} />
        <Route path="crb-complaint-status-type/*" element={<CrbComplaintStatusType />} />
        <Route path="crb-record-file-type/*" element={<CrbRecordFileType />} />
        <Route path="crb-credit-application-status/*" element={<CrbCreditApplicationStatus />} />
        <Route path="crb-customer-type/*" element={<CrbCustomerType />} />
        <Route path="crb-subscription-status-type-code/*" element={<CrbSubscriptionStatusTypeCode />} />
        <Route path="crb-nature-of-information/*" element={<CrbNatureOfInformation />} />
        <Route path="crb-source-of-information-type/*" element={<CrbSourceOfInformationType />} />
        <Route path="crb-product-service-fee-type/*" element={<CrbProductServiceFeeType />} />
        <Route path="crb-file-transmission-status/*" element={<CrbFileTransmissionStatus />} />
        <Route path="crb-agent-service-type/*" element={<CrbAgentServiceType />} />
        <Route path="crb-credit-facility-type/*" element={<CrbCreditFacilityType />} />
        <Route path="crb-gl-code/*" element={<CrbGlCode />} />
        <Route path="crb-aging-bands/*" element={<CrbAgingBands />} />
        <Route path="crb-report-view-band/*" element={<CrbReportViewBand />} />
        <Route path="crb-data-submitting-institutions/*" element={<CrbDataSubmittingInstitutions />} />
        <Route path="bank-transaction-type/*" element={<BankTransactionType />} />
        <Route path="agricultural-enterprise-activity-type/*" element={<AgriculturalEnterpriseActivityType />} />
        <Route path="interbank-sector-code/*" element={<InterbankSectorCode />} />
        <Route path="ultimate-beneficiary-category/*" element={<UltimateBeneficiaryCategory />} />
        <Route path="issuers-of-securities/*" element={<IssuersOfSecurities />} />
        <Route path="loan-account-category/*" element={<LoanAccountCategory />} />
        <Route path="counterparty-type/*" element={<CounterpartyType />} />
        <Route path="counter-party-deal-type/*" element={<CounterPartyDealType />} />
        <Route path="counter-party-category/*" element={<CounterPartyCategory />} />
        <Route path="acquiring-issuing-flag/*" element={<AcquiringIssuingFlag />} />
        <Route path="credit-card-ownership/*" element={<CreditCardOwnership />} />
        <Route path="category-of-security/*" element={<CategoryOfSecurity />} />
        <Route path="nature-of-customer-complaints/*" element={<NatureOfCustomerComplaints />} />
        <Route path="gdi-master-data-index/*" element={<GdiMasterDataIndex />} />
        <Route path="gdi-transaction-data-index/*" element={<GdiTransactionDataIndex />} />
        <Route path="product-type/*" element={<ProductType />} />
        <Route path="account-attribute/*" element={<AccountAttribute />} />
        <Route path="account-attribute-metadata/*" element={<AccountAttributeMetadata />} />
        <Route path="exchange-rate/*" element={<ExchangeRate />} />
        <Route path="particulars-of-outlet/*" element={<ParticularsOfOutlet />} />
        <Route path="weekly-counterfeit-holding/*" element={<WeeklyCounterfeitHolding />} />
        <Route path="weekly-cash-holding/*" element={<WeeklyCashHolding />} />
        <Route path="county-sub-county-code/*" element={<CountySubCountyCode />} />
        <Route path="related-party-relationship/*" element={<RelatedPartyRelationship />} />
        <Route path="terminals-and-pos/*" element={<TerminalsAndPOS />} />
        <Route path="performance-of-foreign-subsidiaries/*" element={<PerformanceOfForeignSubsidiaries />} />
        <Route path="account-balance/*" element={<AccountBalance />} />
        <Route path="agent-banking-activity/*" element={<AgentBankingActivity />} />
        <Route path="card-acquiring-transaction/*" element={<CardAcquiringTransaction />} />
        <Route path="card-issuer-charges/*" element={<CardIssuerCharges />} />
        <Route path="card-fraud-information/*" element={<CardFraudInformation />} />
        <Route path="card-usage-information/*" element={<CardUsageInformation />} />
        <Route path="collateral-information/*" element={<CollateralInformation />} />
        <Route path="credit-card-facility/*" element={<CreditCardFacility />} />
        <Route path="card-state/*" element={<CardState />} />
        <Route path="business-team/*" element={<BusinessTeam />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
