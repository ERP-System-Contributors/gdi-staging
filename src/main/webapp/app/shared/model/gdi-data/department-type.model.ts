import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IDepartmentType {
  id?: number;
  departmentTypeCode?: string;
  departmentType?: string;
  departmentTypeDetails?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IDepartmentType> = {};
