import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const GDIDataMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/account-attribute">
        Account Attribute
      </MenuItem>
      <MenuItem icon="asterisk" to="/account-attribute-metadata">
        Account Attribute Metadata
      </MenuItem>
      <MenuItem icon="asterisk" to="/exchange-rate">
        Exchange Rate
      </MenuItem>
      <MenuItem icon="asterisk" to="/particulars-of-outlet">
        Particulars Of Outlet
      </MenuItem>
      <MenuItem icon="asterisk" to="/weekly-counterfeit-holding">
        Weekly Counterfeit Holding
      </MenuItem>
      <MenuItem icon="asterisk" to="/weekly-cash-holding">
        Weekly Cash Holding
      </MenuItem>
      <MenuItem icon="asterisk" to="/county-sub-county-code">
        County Sub County Code
      </MenuItem>
      <MenuItem icon="asterisk" to="/related-party-relationship">
        Related Party Relationship
      </MenuItem>
      <MenuItem icon="asterisk" to="/terminals-and-pos">
        Terminals And POS
      </MenuItem>
      <MenuItem icon="asterisk" to="/performance-of-foreign-subsidiaries">
        Performance Of Foreign Subsidiaries
      </MenuItem>
      <MenuItem icon="asterisk" to="/account-balance">
        Account Balance
      </MenuItem>
      <MenuItem icon="asterisk" to="/agent-banking-activity">
        Agent Banking Activity
      </MenuItem>
      <MenuItem icon="asterisk" to="/card-acquiring-transaction">
        Card Acquiring Transaction
      </MenuItem>
      <MenuItem icon="asterisk" to="/card-issuer-charges">
        Card Issuer Charges
      </MenuItem>
      <MenuItem icon="asterisk" to="/card-fraud-information">
        Card Fraud Information
      </MenuItem>
      <MenuItem icon="asterisk" to="/card-usage-information">
        Card Usage Information
      </MenuItem>
      <MenuItem icon="asterisk" to="/collateral-information">
        Collateral Information
      </MenuItem>
      <MenuItem icon="asterisk" to="/credit-card-facility">
        Credit Card Facility
      </MenuItem>
      <MenuItem icon="asterisk" to="/card-state">
        Card State
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default GDIDataMenu;
