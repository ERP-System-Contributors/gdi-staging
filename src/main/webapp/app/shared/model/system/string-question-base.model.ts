import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { ControlTypes } from 'app/shared/model/enumerations/control-types.model';

export interface IStringQuestionBase {
  id?: number;
  value?: string | null;
  key?: string;
  label?: string;
  required?: boolean | null;
  order?: number;
  controlType?: ControlTypes;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  placeholderItems?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IStringQuestionBase> = {
  required: false,
  iterable: false,
};
