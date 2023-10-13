export interface ICountySubCountyCode {
  id?: number;
  subCountyCode?: string;
  subCountyName?: string;
  countyCode?: string;
  countyName?: string;
}

export const defaultValue: Readonly<ICountySubCountyCode> = {};
