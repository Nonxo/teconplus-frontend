export class ApprovalChain {
  approvalActivities: string[];
  approvalLevels: ApprovalLevel[];
  unanimousApproval: boolean;

  constructor() {
    this.approvalLevels = [];
    this.approvalActivities = [];
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
