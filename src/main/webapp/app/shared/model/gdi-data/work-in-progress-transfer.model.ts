import { IWorkInProgressRegistration } from 'app/shared/model/gdi-data/work-in-progress-registration.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IWorkInProgressTransfer {
  id?: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  workInProgressRegistrations?: IWorkInProgressRegistration[] | null;
  placeholders?: IPlaceholder[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IWorkInProgressTransfer> = {};
