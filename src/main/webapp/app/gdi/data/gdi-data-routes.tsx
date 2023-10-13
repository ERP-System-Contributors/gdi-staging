import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccountAttribute from './account-attribute';
import AccountAttributeMetadata from './account-attribute-metadata';
import ExchangeRate from './exchange-rate';
import ParticularsOfOutlet from './particulars-of-outlet';
import WeeklyCounterfeitHolding from './weekly-counterfeit-holding';
import WeeklyCashHolding from './weekly-cash-holding';
import CountySubCountyCode from './county-sub-county-code';
import RelatedPartyRelationship from './related-party-relationship';
import TerminalsAndPOS from './terminals-and-pos';
import PerformanceOfForeignSubsidiaries from './performance-of-foreign-subsidiaries';
import AccountBalance from './account-balance';
import AgentBankingActivity from './agent-banking-activity';
import CardAcquiringTransaction from './card-acquiring-transaction';
import CardIssuerCharges from './card-issuer-charges';
import CardFraudInformation from './card-fraud-information';
import CardUsageInformation from './card-usage-information';
import CollateralInformation from './collateral-information';
import CreditCardFacility from './credit-card-facility';
import CardState from './card-state';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
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
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
