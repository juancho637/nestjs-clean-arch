export type PermissionFilterType = {
  id?: number;
  name?: string;
  module?: string;
};

export type PermissionPropertiesType = keyof PermissionFilterType;
