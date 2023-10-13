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
