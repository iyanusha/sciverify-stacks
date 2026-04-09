export type ProposalStatus = 'active' | 'passed' | 'failed' | 'pending' | 'executed';

export interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  quorumRequired: number;
  startBlock: number;
  endBlock: number;
  createdAt: number;
  executedAt?: number;
}

export interface Vote {
  proposalId: number;
  voter: string;
  support: boolean;
  weight: number;
  txHash: string;
  timestamp: number;
}

export interface ProposalAction {
  type: 'parameter-change' | 'contract-upgrade' | 'fund-allocation';
  payload: Record<string, unknown>;
}
