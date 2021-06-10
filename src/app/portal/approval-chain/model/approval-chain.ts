export class ApprovalChain {
  id: string;
  approvalActivities: string[];
  approvalLevels: ApprovalLevel[];
  unanimousApproval: boolean;

  constructor() {
    this.approvalLevels = [];
  }
}

export class ApprovalLevel {
  approvalLevel: number;
  approvalRole: number;

  constructor() {
    this.approvalLevel = 1;
    this.approvalRole = 0;
  }
}
