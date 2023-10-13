import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/gdi-data/application-user.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IAlgorithm } from 'app/shared/model/gdi-data/algorithm.model';
import { ISecurityClearance } from 'app/shared/model/gdi-data/security-clearance.model';

export interface IBusinessDocument {
  id?: number;
  documentTitle?: string;
  description?: string | null;
  documentSerial?: string;
  lastModified?: string | null;
  attachmentFilePath?: string;
  documentFileContentType?: string;
  fileTampered?: boolean | null;
  documentFileChecksum?: string;
  createdBy?: IApplicationUser;
  lastModifiedBy?: IApplicationUser | null;
  originatingDepartment?: IDealer;
  applicationMappings?: IUniversallyUniqueMapping[] | null;
  placeholders?: IPlaceholder[] | null;
  fileChecksumAlgorithm?: IAlgorithm;
  securityClearance?: ISecurityClearance;
}

export const defaultValue: Readonly<IBusinessDocument> = {
  fileTampered: false,
};
