import dayjs from 'dayjs';
import { IReportTemplate } from 'app/shared/model/reports/report-template.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { ReportStatusTypes } from 'app/shared/model/enumerations/report-status-types.model';

export interface IPdfReportRequisition {
  id?: number;
  reportName?: string;
  reportDate?: string | null;
  userPassword?: string;
  ownerPassword?: string;
  reportFileChecksum?: string | null;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string;
  reportTemplate?: IReportTemplate;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IPdfReportRequisition> = {};
