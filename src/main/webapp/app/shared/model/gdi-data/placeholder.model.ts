export interface IPlaceholder {
  id?: number;
  description?: string;
  token?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  containingPlaceholder?: IPlaceholder | null;
}

export const defaultValue: Readonly<IPlaceholder> = {};
