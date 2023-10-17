import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const MasterDataMenuItems = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="search" to="/placeholder">
        Placeholder
      </MenuItem>
      <MenuItem icon="search" to="/gdi-master-data-index">
        Gdi Master Data Index
      </MenuItem>
      <MenuItem icon="search" to="/gdi-transaction-data-index">
        Gdi Transaction Data Index
      </MenuItem>
      <MenuItem icon="search" to="/universally-unique-mapping">
        Mapping
      </MenuItem>
      <MenuItem icon="search" to="/business-team">
        Business Teams
      </MenuItem>
      <MenuItem icon="search" to="/business-document">
        Documents
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default MasterDataMenuItems;
