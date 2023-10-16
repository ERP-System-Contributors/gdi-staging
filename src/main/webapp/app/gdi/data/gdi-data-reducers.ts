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

import accountAttribute from './account-attribute/account-attribute.reducer';
import accountAttributeMetadata from './account-attribute-metadata/account-attribute-metadata.reducer';
import exchangeRate from './exchange-rate/exchange-rate.reducer';
import particularsOfOutlet from './particulars-of-outlet/particulars-of-outlet.reducer';
import weeklyCounterfeitHolding from './weekly-counterfeit-holding/weekly-counterfeit-holding.reducer';
import weeklyCashHolding from './weekly-cash-holding/weekly-cash-holding.reducer';
import countySubCountyCode from './county-sub-county-code/county-sub-county-code.reducer';
import relatedPartyRelationship from './related-party-relationship/related-party-relationship.reducer';
import terminalsAndPOS from './terminals-and-pos/terminals-and-pos.reducer';
import performanceOfForeignSubsidiaries from './performance-of-foreign-subsidiaries/performance-of-foreign-subsidiaries.reducer';
import accountBalance from './account-balance/account-balance.reducer';
import agentBankingActivity from './agent-banking-activity/agent-banking-activity.reducer';
import cardAcquiringTransaction from './card-acquiring-transaction/card-acquiring-transaction.reducer';
import cardIssuerCharges from './card-issuer-charges/card-issuer-charges.reducer';
import cardFraudInformation from './card-fraud-information/card-fraud-information.reducer';
import cardUsageInformation from './card-usage-information/card-usage-information.reducer';
import collateralInformation from './collateral-information/collateral-information.reducer';
import creditCardFacility from './credit-card-facility/credit-card-facility.reducer';
import cardState from './card-state/card-state.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const gdiDataReducers = {
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

export default gdiDataReducers;
