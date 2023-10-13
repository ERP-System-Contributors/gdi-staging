import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IReportStatus } from 'app/shared/model/gdi-data/report-status.model';
import { ISecurityClearance } from 'app/shared/model/gdi-data/security-clearance.model';
import { IApplicationUser } from 'app/shared/model/gdi-data/application-user.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { ISystemModule } from 'app/shared/model/gdi-data/system-module.model';
import { IReportDesign } from 'app/shared/model/gdi-data/report-design.model';
import { IAlgorithm } from 'app/shared/model/gdi-data/algorithm.model';

export interface IExcelReportExport {
  id?: number;
  reportName?: string;
  reportPassword?: string;
  reportNotesContentType?: string | null;
  reportNotes?: string | null;
  fileCheckSum?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  reportTimeStamp?: string;
  reportId?: string;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  reportStatus?: IReportStatus | null;
  securityClearance?: ISecurityClearance;
  reportCreator?: IApplicationUser;
  organization?: IDealer;
  department?: IDealer;
  systemModule?: ISystemModule;
  reportDesign?: IReportDesign;
  fileCheckSumAlgorithm?: IAlgorithm;
}

export const defaultValue: Readonly<IExcelReportExport> = {};
