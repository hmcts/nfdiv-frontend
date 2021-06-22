export interface CaseAssignedUserRoles {
  roles: CaseAssignedUserRole[];
}

export interface CaseAssignedUserRole {
  caseDataId: string;
  userId: string;
  caseRole: string;
}
