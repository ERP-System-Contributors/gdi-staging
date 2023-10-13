import React from 'react';

import { NavDropdown } from './menu-components';
import GDIDataMenuItems from 'app/gdi/data/gdi-data-menu';

export const GDIDataMenu = () => (
  <NavDropdown icon="search" name="Master" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <GDIDataMenuItems />
  </NavDropdown>
);
