import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { ISecurityClearance } from 'app/shared/model/gdi-data/security-clearance.model';
import { IApplicationUser } from 'app/shared/model/gdi-data/application-user.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { ISystemModule } from 'app/shared/model/gdi-data/system-module.model';
import { IAlgorithm } from 'app/shared/model/gdi-data/algorithm.model';

export interface IReportDesign {
  id?: number;
  catalogueNumber?: string;
  designation?: string;
  description?: string | null;
  notesContentType?: string | null;
  notes?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  reportFileChecksum?: string | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  securityClearance?: ISecurityClearance;
  reportDesigner?: IApplicationUser;
  organization?: IDealer;
  department?: IDealer;
  placeholders?: IPlaceholder[] | null;
  systemModule?: ISystemModule;
  fileCheckSumAlgorithm?: IAlgorithm;
}

export const defaultValue: Readonly<IReportDesign> = {};
