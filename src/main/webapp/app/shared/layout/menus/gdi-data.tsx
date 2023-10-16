import React from 'react';

import { NavDropdown } from './menu-components';
import GDIDataMenuItems from 'app/gdi/data/gdi-data-menu';

export const GDIDataMenu = () => (
  <NavDropdown icon="books-alt" name="Data" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <GDIDataMenuItems />
  </NavDropdown>
);
