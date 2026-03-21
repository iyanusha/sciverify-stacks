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

export const FAVICON_BRANDING_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const MANIFEST_PWA_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const OG_TWITTER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ROBOTS_SITEMAP_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CANONICAL_URLS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const MOBILE_MENU_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const KEYBOARD_NAV_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const FOCUS_MANAGEMENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const SCREEN_READER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const HIGH_CONTRAST_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const CODE_ORGANIZE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CONSTANTS_CONFIG_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const BARREL_EXPORTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TYPE_GUARDS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const UTILITY_HELPERS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const LAZY_COMPONENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const MEMOIZATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PERFORMANCE_UTILS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const IMAGE_OPTIMIZE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const BUNDLE_CONFIG_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const NAV_IMPROVEMENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const FOOTER_LINKS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const LAYOUT_SYSTEM_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const GRID_COMPONENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CARD_VARIANTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const BADGE_TAGS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TOOLTIP_POPOVER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TABLE_COMPONENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PAGINATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const EMPTY_STATES_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const PUBLICATION_DASHBOARD_S9 = { pageSize: 20 } as const;

export const PUBLICATION_DASHBOARD_S19 = { pageSize: 20 } as const;

export const PUBLICATION_DASHBOARD_S29 = { pageSize: 20 } as const;

export const PUBLICATION_DASHBOARD_S39 = { pageSize: 20 } as const;

export const PUBLICATION_DASHBOARD_S49 = { pageSize: 20 } as const;

export const REVIEW_DASHBOARD_S9 = { pageSize: 20 } as const;

export const REVIEW_DASHBOARD_S19 = { pageSize: 20 } as const;

export const REVIEW_DASHBOARD_S29 = { pageSize: 20 } as const;

export const REVIEW_DASHBOARD_S39 = { pageSize: 20 } as const;

export const REVIEW_DASHBOARD_S49 = { pageSize: 20 } as const;

export const GOVERNANCE_HUB_S9 = { pageSize: 20 } as const;

export const GOVERNANCE_HUB_S19 = { pageSize: 20 } as const;

export const GOVERNANCE_HUB_S29 = { pageSize: 20 } as const;

export const GOVERNANCE_HUB_S39 = { pageSize: 20 } as const;

export const GOVERNANCE_HUB_S49 = { pageSize: 20 } as const;

export const CREDENTIAL_MANAGER_S9 = { pageSize: 20 } as const;

export const CREDENTIAL_MANAGER_S19 = { pageSize: 20 } as const;

export const CREDENTIAL_MANAGER_S29 = { pageSize: 20 } as const;

export const CREDENTIAL_MANAGER_S39 = { pageSize: 20 } as const;

export const CREDENTIAL_MANAGER_S49 = { pageSize: 20 } as const;

export const REPUTATION_ANALYTICS_S9 = { pageSize: 20 } as const;

export const REPUTATION_ANALYTICS_S19 = { pageSize: 20 } as const;

export const REPUTATION_ANALYTICS_S29 = { pageSize: 20 } as const;

export const REPUTATION_ANALYTICS_S39 = { pageSize: 20 } as const;

export const REPUTATION_ANALYTICS_S49 = { pageSize: 20 } as const;

export const SEARCH_ENGINE_S9 = { pageSize: 20 } as const;

export const SEARCH_ENGINE_S19 = { pageSize: 20 } as const;

export const SEARCH_ENGINE_S29 = { pageSize: 20 } as const;

export const SEARCH_ENGINE_S39 = { pageSize: 20 } as const;

export const SEARCH_ENGINE_S49 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S9 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S19 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S29 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S39 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S49 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S9 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S19 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S29 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S39 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S49 = { pageSize: 20 } as const;

export const HELP_DOCS_S9 = { pageSize: 20 } as const;

export const HELP_DOCS_S19 = { pageSize: 20 } as const;

export const HELP_DOCS_S29 = { pageSize: 20 } as const;

export const HELP_DOCS_S39 = { pageSize: 20 } as const;
