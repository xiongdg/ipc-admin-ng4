export class DevRole {
  editRow: boolean;
  roleAbility: string;
  roleDesp: string;
  roleStatus: string;
  role: number;
}

export class RomType {

}
export class DevTypeInfo {
  devTypeId: string;
  typename: string;
  devRoles: Array<DevRole>;
  devType: object;
  romType: object;
  devUsers: Array<object>;
  lastModify: object;
  reMarks: string;
  romTypeList: Array<RomType>;
}

