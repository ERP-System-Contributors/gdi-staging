import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IReportTemplate } from 'app/shared/model/reports/report-template.model';
import { IReportContentType } from 'app/shared/model/reports/report-content-type.model';
import { ReportStatusTypes } from 'app/shared/model/enumerations/report-status-types.model';

export interface IReportRequisition {
  id?: number;
  reportName?: string;
  reportRequestTime?: string;
  reportPassword?: string;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string;
  reportFileAttachmentContentType?: string | null;
  reportFileAttachment?: string | null;
  reportFileCheckSum?: string | null;
  reportNotesContentType?: string | null;
  reportNotes?: string | null;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  reportTemplate?: IReportTemplate;
  reportContentType?: IReportContentType;
}

export const defaultValue: Readonly<IReportRequisition> = {};
