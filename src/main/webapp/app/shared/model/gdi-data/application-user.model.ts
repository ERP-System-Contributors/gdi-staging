import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { ISecurityClearance } from 'app/shared/model/gdi-data/security-clearance.model';
import { IUser } from 'app/shared/model/user.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IApplicationUser {
  id?: number;
  designation?: string;
  applicationIdentity?: string;
  organization?: IDealer;
  department?: IDealer;
  securityClearance?: ISecurityClearance;
  systemIdentity?: IUser;
  userProperties?: IUniversallyUniqueMapping[] | null;
  dealerIdentity?: IDealer;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IApplicationUser> = {};
