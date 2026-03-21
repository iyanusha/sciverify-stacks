import { StacksTestnet, StacksMainnet } from "@stacks/network";

const isMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const network = isMainnet
  ? new StacksMainnet()
  : new StacksTestnet();

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

export const CONTRACTS = {
  publicationRegistry: "publication-registry",
  credentialVerification: "credential-verification",
  reviewProtocol: "review-protocol",
  governance: "governance",
  reputationToken: "reputation-token",
};

export const CLARITY_VERSION = 4;

export const EXPLORER_URL = isMainnet
  ? "https://explorer.hiro.so"
  : "https://explorer.hiro.so/?chain=testnet";

export const TYPESCRIPT_TYPES_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ERROR_HANDLING_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const LOADING_STATES_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const FORM_VALIDATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ACCESSIBILITY_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const RESPONSIVE_DESIGN_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const SEO_META_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ENV_VALIDATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CONTRACT_HOOKS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const WALLET_IMPROVEMENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const PUBLICATION_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const REVIEW_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const GOVERNANCE_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CREDENTIAL_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const DASHBOARD_PAGE_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const DARK_MODE_VARS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const DARK_MODE_TOGGLE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const DARK_MODE_APPLY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const STATE_MANAGEMENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const API_ROUTES_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const REPUTATION_DISPLAY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const SEARCH_FILTER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TOKEN_DISPLAY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const VOTING_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PROPOSAL_FORM_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const TEST_PUBLICATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_REVIEW_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_GOVERNANCE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_CREDENTIAL_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_REPUTATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;
