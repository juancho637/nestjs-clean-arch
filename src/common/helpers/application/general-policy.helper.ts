export const generalPolicyHelper = ({
  userPermissions,
  validPermissions,
}: {
  userPermissions: string[];
  validPermissions: string[];
}): boolean => {
  return validPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
};

export class GeneralPolicy {
  constructor() {}

  hasPermission(
    userPermissions: string[],
    validPermissions: string[] | string,
  ): boolean {
    if (typeof validPermissions === 'string') {
      return userPermissions.includes(validPermissions);
    }

    return validPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
