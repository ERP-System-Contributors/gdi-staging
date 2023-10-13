import { IWorkInProgressRegistration } from 'app/shared/model/assets/work-in-progress-registration.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';

export interface IWorkInProgressTransfer {
  id?: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  workInProgressRegistrations?: IWorkInProgressRegistration[] | null;
  placeholders?: IPlaceholder[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IWorkInProgressTransfer> = {};
