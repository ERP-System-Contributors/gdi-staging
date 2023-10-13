import { IDealer } from 'app/shared/model/people/dealer.model';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { IUser } from 'app/shared/model/user.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';

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
}

export const defaultValue: Readonly<IApplicationUser> = {};
