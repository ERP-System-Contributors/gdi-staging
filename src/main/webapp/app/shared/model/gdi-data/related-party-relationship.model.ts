import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IPartyRelationType } from 'app/shared/model/gdi/party-relation-type.model';

export interface IRelatedPartyRelationship {
  id?: number;
  reportingDate?: string;
  customerId?: string;
  relatedPartyId?: string;
  bankCode?: IInstitutionCode;
  branchId?: IBankBranchCode;
  relationshipType?: IPartyRelationType;
}

export const defaultValue: Readonly<IRelatedPartyRelationship> = {};
