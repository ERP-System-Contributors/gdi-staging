import React from 'react';

import { NavDropdown } from './menu-components';
import ServiceMenuItems from 'app/gdi/service/service-menu';

export const ServiceMenu = () => (
  <NavDropdown icon="book" name="Service" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <ServiceMenuItems />
  </NavDropdown>
);
