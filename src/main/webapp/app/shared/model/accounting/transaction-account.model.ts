import { IPlaceholder } from 'app/shared/model/system/placeholder.model';

export interface ITransactionAccount {
  id?: number;
  accountNumber?: string;
  accountName?: string;
  notesContentType?: string | null;
  notes?: string | null;
  parentAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<ITransactionAccount> = {};
