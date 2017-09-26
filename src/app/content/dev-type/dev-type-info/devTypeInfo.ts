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
  typeName: string;
  devRoles: Array<DevRole>;
  devType: object;
  romType: object;
  devUsers: Array<object>;
  lastModify: object;
  reMarks: string;
  romTypeList: Array<RomType>;
  typeDesp: string;
}

export class BaseInfoObj {
  devTypeId: string;
  typeName: string;
  typeDesp: string;
}

