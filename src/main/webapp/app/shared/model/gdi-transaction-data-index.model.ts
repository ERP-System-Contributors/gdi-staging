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

import { IGdiMasterDataIndex } from 'app/shared/model/gdi/gdi-master-data-index.model';
import { IBusinessTeam } from 'app/shared/model/business-team.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { UpdateFrequencyTypes } from 'app/shared/model/enumerations/update-frequency-types.model';
import { DatasetBehaviorTypes } from 'app/shared/model/enumerations/dataset-behavior-types.model';

export interface IGdiTransactionDataIndex {
  id?: number;
  datasetName?: string;
  databaseName?: string;
  updateFrequency?: UpdateFrequencyTypes;
  datasetBehavior?: DatasetBehaviorTypes;
  minimumDataRowsPerRequest?: number | null;
  maximumDataRowsPerRequest?: number | null;
  datasetDescription?: string | null;
  dataPath?: string | null;
  masterDataItems?: IGdiMasterDataIndex[] | null;
  businessTeam?: IBusinessTeam | null;
  dataSetTemplate?: IBusinessDocument | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IGdiTransactionDataIndex> = {};
