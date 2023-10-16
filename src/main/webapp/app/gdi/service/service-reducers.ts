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

import placeholder from './placeholder/placeholder.reducer';
import gdiMasterDataIndex from './gdi-master-data-index/gdi-master-data-index.reducer';
import gdiTransactionDataIndex from './gdi-transaction-data-index/gdi-transaction-data-index.reducer';
import universallyUniqueMapping from './universally-unique-mapping/universally-unique-mapping.reducer';

const serviceReducers = {
  placeholder,
  gdiMasterDataIndex,
  gdiTransactionDataIndex,
  universallyUniqueMapping,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default serviceReducers;
