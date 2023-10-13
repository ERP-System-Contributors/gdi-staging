import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IReportStatus } from 'app/shared/model/reports/report-status.model';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { ISystemModule } from 'app/shared/model/system/system-module.model';
import { IReportDesign } from 'app/shared/model/reports/report-design.model';
import { IAlgorithm } from 'app/shared/model/system/algorithm.model';

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
